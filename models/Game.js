const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const GameMoves = require("./GameMoves");
const Player = require("./Player");

const Game = sequelize.define("Game", {
    id: { type: DataTypes.INTEGER, primaryKey:true, allowNull: false },
    room: {type: DataTypes.STRING, allowNull: false}
});

Game.belongsToMany(Player, { through: GameMoves });


module.exports = Game;
