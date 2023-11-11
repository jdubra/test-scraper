const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Event = sequelize.define(
  'events',
  {
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    dates: DataTypes.ARRAY(DataTypes.DATE),
    prices: DataTypes.STRING,
    category: DataTypes.STRING,
    pageUrl: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {},
);

module.exports = Event;
