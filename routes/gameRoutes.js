const express = require("express");
const Game = require("../models/Game");

const router = express.Router();
const internalServerError = "Internal server error";
const gameNotFound = "Game not found";

router.get("/", async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
  }
});

router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) {
      return res.status(404).json({ error: gameNotFound });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

router.post("/", async (req, res) => {
  try {
    const{room} = req.body;
    const game = await Game.create({room});
    res.status(201).json({ message: "Succesfully created game", game });
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

router.patch("/", async (req, res) => {
  try {
    const{gameId, room} = req.body;
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: gameNotFound });
    }
    game.room(room);
    await game.save();
    res.status(201).json({ message: "Succesfully updated game", game });
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Game.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: gameNotFound });
    }
    res.json({ message: "Game deleted" });
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

module.exports = router;
