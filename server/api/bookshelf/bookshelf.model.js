'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Bookshelf', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    books: DataTypes.ARRAY(DataTypes.INTEGER)
  },{
    timestamps: true, 
    underscored: true,
    freezeTableName: true,
    tableName: 'bookshelves'
  });
};
