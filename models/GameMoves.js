const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const Player = require("./Player");
const Game = require("./Game");

const GameMoves = sequelize.define("GameMoves", {
  game_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Game, key: "id" }, primaryKey:true },
  player_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Player, key: "id" }, primaryKey:true },
  date_time: { type: DataTypes.DATE, allowNull: false, unique:true, defaultValue:Sequelize.NOW, primaryKey:true},
  tile: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = GameMoves;
