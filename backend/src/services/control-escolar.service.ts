import { Sequelize, type WhereOptions } from 'sequelize';
import { Calificacion } from '../models/calificacion.model.js';
import { Alumno } from '../models/alumno.model.js';
import { Materia } from '../models/materia.model.js';
import { Usuario } from '../models/usuario.model.js';
import { AppError } from '../utils/AppError.js';

export const getReporteService = async (query: any) => {
    const tipo = query.tipo as string | undefined;

    //Validar queries extra no permitidos
    const QUERIES_PERMITIDAS = ['tipo', 'id', 'matricula', 'grupo', 'codigo'];
    const filtrosInvalidos = Object.keys(query).filter(key => !QUERIES_PERMITIDAS.includes(key));

    if (filtrosInvalidos.length > 0) {
        throw new AppError(`Parámetros no permitidos: ${filtrosInvalidos.join(', ')}`, 400);
    }

    //Si hay filtros sin tipo
    if (!tipo && Object.keys(query).length > 0) {
        throw new AppError('Se debe especificar el tipo de reporte para usar filtros', 400);
    }

    //Default a general solo si no hay filtros
    const tipoFinal = tipo ?? 'general';

    switch (tipoFinal) {
        case 'alumnos':
            return reporteAlumnos(query);
        case 'materias':
            return reporteMaterias(query);
        case 'general':
            return reporteGeneral(query);
        default:
            throw new AppError('Tipo de reporte no válido', 400);
    }
};

export const deleteCalificacionService = async (id: number) => {
    const calificacion = await Calificacion.findByPk(id);

    if (!calificacion) {
        throw new AppError('La calificación no existe', 404);
    }

    // Soft delete (paranoid)
    await calificacion.destroy();

    return calificacion;
};

export const patchCalificacionService = async (id: number, data: PatchCalificacionData) => {
    const calificacion = await Calificacion.findByPk(id, { paranoid: false });

    if (!calificacion) {
        throw new AppError('La calificación no existe', 404);
    }

    const CAMPOS_PERMITIDOS = ['nota', 'observaciones', 'restore'];

    const campoInvalidos = Object.keys(data).filter(
        key => !CAMPOS_PERMITIDOS.includes(key)
    );

    if (campoInvalidos.length > 0) {
        throw new AppError(
        `Campos no permitidos: ${campoInvalidos.join(', ')}`,
        400
        );
    }

    // Restaurar primero si viene
    if (data.restore) {
        await calificacion.restore();
    }

    //Separamos el restore de el contenido a actualizar
    const { restore, ...datosValidados } = data;

    // Actualizar datos
    await calificacion.update(datosValidados);

    return calificacion;
};

interface PatchCalificacionData {
    nota?: number;
    observaciones?: string;
    restore?: boolean;
}

// Funciones auxiliares
const reporteAlumnos = async (query: any) => {
    if (query.codigo) {
        throw new AppError('Filtro "codigo" no permitido para tipo alumnos', 400);
    }

    const filtrosAlumno: WhereOptions = {};
    if (query.id) filtrosAlumno.id = query.id;
    if (query.matricula) filtrosAlumno.matricula = query.matricula;
    if (query.grupo) filtrosAlumno.grupo = query.grupo;

    return Calificacion.findAll({
        attributes: [
            'alumno_id',
            [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('nota')), 2), 'promedio'],
            [Sequelize.fn('COUNT', Sequelize.col('Calificacion.id')), 'total_calificaciones'],
        ],
        include: [
            {
                model: Alumno,
                attributes: ['id', 'nombre', 'matricula', 'grupo'],
                where: filtrosAlumno,
            },
        ],
        where: { deleted_at: null },
        group: ['alumno_id', 'Alumno.id'],
    });
};

const reporteMaterias = async (query: any) => {
    if (query.matricula || query.grupo) {
        throw new AppError('Filtros de alumno no permitidos para tipo materias', 400);
    }

    const filtrosMateria: WhereOptions = {};
    if (query.id) filtrosMateria.id = query.id;
    if (query.codigo) filtrosMateria.codigo = query.codigo;

    return Calificacion.findAll({
        attributes: [
            'materia_id',
            [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('nota')), 2), 'promedio'],
            [Sequelize.fn('COUNT', Sequelize.col('Calificacion.id')), 'total_calificaciones'],
        ],
        include: [
            {
                model: Materia,
                as: 'materia',
                attributes: ['id', 'codigo', 'nombre'],
                where: filtrosMateria,
            },
        ],
        where: { deleted_at: null },
        group: ['Calificacion.materia_id', 'materia.id'],
    });
};

const reporteGeneral = async (query: any) => {
    if (Object.keys(query).length > 1) {
        throw new AppError('El reporte general no acepta filtros', 400);
    }

    return Calificacion.findOne({
        attributes: [
            [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('nota')), 2), 'promedio_general'],
            [Sequelize.fn('COUNT', Sequelize.col('Calificacion.id')), 'total_calificaciones'],
        ],
        where: { deleted_at: null },
        raw: true,
    });
};