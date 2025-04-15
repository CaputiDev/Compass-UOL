import { DataTypes } from 'sequelize';
import database from '../database/db.js';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Sao_Paulo');

const Transacao = database.define('transacoes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  conta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('deposito', 'saque'),
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: () => dayjs().tz().toDate(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: () => dayjs().tz().toDate(),
  }
}, {
  tableName: 'transacoes',
  timestamps: true,
});

export default Transacao;
