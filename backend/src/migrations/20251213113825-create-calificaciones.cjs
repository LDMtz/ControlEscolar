'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('calificaciones', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      alumno_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'alumnos',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      materia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'materias',
          key: 'id'
        },
        onDelete: 'RESTRICT',
      },
      maestro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onDelete: 'RESTRICT',
      },
      nota: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      fecha_registro: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      observaciones: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    //Un alumno NO puede: Ser calificado en la misma materia por el mismo maestro el mismo día
    await queryInterface.addConstraint('calificaciones', {
      fields: ['alumno_id', 'materia_id', 'maestro_id', 'fecha_registro'],
      type: 'unique',
      name: 'unique_calificacion_por_fecha'
    });

    // No se permiten calificaciones menores a 0 ni mayores a 100
    await queryInterface.addConstraint('calificaciones', {
      fields: ['nota'],
      type: 'check',
      where: {
        nota: {
          [Sequelize.Op.gte]: 0, // (>=)
          [Sequelize.Op.lte]: 100 // (<=)
        }
      },
      name: 'checar_rango_de_nota'
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeConstraint(
      'calificaciones',
      'unique_calificacion_por_fecha'
    );

    await queryInterface.removeConstraint(
      'calificaciones',
      'checar_rango_de_nota'
    );

    await queryInterface.dropTable('calificaciones');
  }
};
