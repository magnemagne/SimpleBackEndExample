const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
const GameMoves = require("./GameMoves");
const Game = require("./Game");

const Player = sequelize.define("Player", {
  id: { type: DataTypes.INTEGER, primaryKey:true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false, unique:true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  playerInfo: { type: DataTypes.STRING, allowNull: true } }, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
});

Player.belongsToMany(Game, { through: GameMoves });


module.exports = Player;
