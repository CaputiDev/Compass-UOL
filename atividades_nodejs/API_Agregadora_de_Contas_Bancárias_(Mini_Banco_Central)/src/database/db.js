import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mini_banco_central', 'postgres', '9256', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
