const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

class Node extends Model {}
Node.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    topic:{ 
      type: DataTypes.STRING},
    isroot: {
     type: DataTypes.BOOLEAN},
    direction: {
      type: DataTypes.ENUM,
      values: ['left', 'center', 'right'],
    },
    expanded: DataTypes.BOOLEAN,
    data: DataTypes.JSON,
  },
  { sequelize, modelName: 'Node' }
);


module.exports = Node