'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('materias', [
        { codigo: 'MAT101', nombre: 'Matemáticas Básicas', descripcion: 'Curso de matemáticas básicas' },
        { codigo: 'FIS101', nombre: 'Física I', descripcion: 'Curso de física general' },
        { codigo: 'QUI101', nombre: 'Química I', descripcion: 'Curso de química general' },
        { codigo: 'HIS101', nombre: 'Historia I', descripcion: 'Historia universal' },
        { codigo: 'ESP101', nombre: 'Español I', descripcion: 'Lengua y redacción' },
      ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('materias', {});
  }
};
