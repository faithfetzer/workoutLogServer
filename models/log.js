const {DataTypes} = require('sequelize');
const db = require('../db');

const Log = db.define('log', {
    desciption: {
        type: DataTypes.STRING,
        allowNull: false,
    }, defiinition: {
        type: DataTypes.STRING,
        allowNull: false,
    }, result: {
        type: DataTypes.STRING,
        allowNull: false,
    }, owner_id: {
        type: DataTypes.INTEGER
    }
})