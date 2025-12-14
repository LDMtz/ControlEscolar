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
      await queryInterface.createTable('roles', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        nombre: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true
        },
        descripcion: {
          type: Sequelize.STRING(255),
          allowNull: true
        }
      });

      /* 
          Insertar roles necesarios.

          NOTA: Se insertan los roles en la migración porque son datos esenciales para
          el funcionamiento de la aplicación, por lo tanto considero que no es buena idea
          crear un seeder para esto ya que los seeders son para datos de prueba.
       */
      await queryInterface.bulkInsert('roles', [
        {
          nombre: 'MAESTRO',
          descripcion: 'Profesor que imparte materias y califica alumnos',
        },
        {
          nombre: 'CONTROL_ESCOLAR',
          descripcion: 'Administrador del sistema',
        }
      ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('roles');
  }
};
