// Wrapper para Sequelize CLI, para que sequelize-cli lo pueda leer

require('ts-node/register');
const config = require('./database.ts').default;
module.exports = config;