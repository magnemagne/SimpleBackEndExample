const express = require("express");
const GameMoves = require("../models/GameMoves");
const Game = require("../models/Game");
const Player = require("../models/Player");

const router = express.Router();
const internalServerError = "Internal server error";
const gameMoveNotFound = "GameMove not found";
const gameNotFound = "Game not found";
const playerNotFound = "Player not found";

router.get("/", async (req, res) => {
  try {
    const allGameMoves = await GameMoves.findAll();
    res.json(allGameMoves);
  } catch (error) {
  }
});

router.get("/:id", async (req, res) => {
  try {
    const {game_id, user_id, date}= req.body;
    const gameMove = await GameMoves.findByPk(game_id, user_id, date);
    if (!gameMove) {
      return res.status(404).json({ error: gameMoveNotFound });
    }
    res.json(gameMove);
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

router.get("/getByGame/:id", async (req, res) => {
    try {
      const {game_id}= req.body;
      const gameMoves = await GameMoves.find({where: {game_id}});
      if (!gameMoves) {
        return res.status(404).json({ error: gameMoveNotFound });
      }
      res.json(gameMoves);
    } catch (error) {
      res.status(500).json({ error: internalServerError });
    }
  });

router.post("/", async (req, res) => {
  try {
    const{game_id, player_id, date_time, tile} = req.body;

    const player = await Player.findByPk(player_id);
    if (!player) {
      return res.status(404).json({ error: playerNotFound });
    }

    const game = await Game.findByPk(game_id);
    if (!player) {
      return res.status(404).json({ error: gameNotFound });
    }

    const gameMove = await GameMoves.create({game_id, player_id, date_time, tile});
    res.status(201).json({ message: "Succesfully created game", gameMove });
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

router.patch("/", async (req, res) => {
    try {
        const {game_id, user_id, date_time, tile}= req.body;
        const gameMove = await GameMoves.findByPk(game_id, user_id, date_time);

        const player = await Player.findByPk(player_id);
        if (!player) {
          return res.status(404).json({ error: playerNotFound });
        }
    
        const game = await Game.findByPk(game_id);
        if (!player) {
          return res.status(404).json({ error: gameNotFound });
        }
    
        gameMove.tile = tile;

        await gameMove.save();
        res.status(201).json({ message: "Succesfully created game", gameMove });
      } catch (error) {
        res.status(500).json({ error: internalServerError });
      }
});

router.delete("/:id", async (req, res) => {
  try {
    const {game_id, user_id, date}= req.body;
    const deleted = await GameMoves.destroy({ where: { id: game_id, user_id, date } });
    if (!deleted) {
      return res.status(404).json({ error: gameMoveNotFound });
    }
    res.json({ message: "GameMove deleted" });
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

module.exports = router;
