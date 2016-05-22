'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    title: DataTypes.STRING,
    authors: DataTypes.ARRAY(DataTypes.STRING)
  },{
    timestamps: true, 
    underscored: true,
    freezeTableName: true,
    tableName: 'books'
  });
};
