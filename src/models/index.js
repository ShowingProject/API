import fs from 'fs'
import path from 'path'
import sequelize from '../db'

const models = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    let model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

module.exports = models;