'use strict';

const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const passwordHash = await bcryptjs.hash('123456', 10);

    await queryInterface.bulkInsert('usuarios', [
      //Maestros
      { nombre: 'Juan', email: 'juan@school.com', password_hash: passwordHash, rol_id: 1 },
      { nombre: 'Ana', email: 'ana@school.com', password_hash: passwordHash, rol_id: 1 },
      //Admin
      { nombre: 'Admin', email: 'admin@school.com', password_hash: passwordHash, rol_id: 2 },

    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', {});
  }
};
