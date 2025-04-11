// src/models/User.js

import { DataTypes } from 'sequelize';
import database from '../database/db.js';

const User = database.define(
    'usuarios',
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cpf: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false,
        validate: {
        len: [11, 11],
    },
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
},
{
    tableName: 'usuarios',
    timestamps: false, // opcional, se tu não tiver colunas createdAt/updatedAt
}
);

export default User;
