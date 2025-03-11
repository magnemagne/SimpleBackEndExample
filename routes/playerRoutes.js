const express = require("express");
const Player = require("../models/Player");

const router = express.Router();
const internalServerError = "Internal server error";
const playerNotFound = "Player not found";


router.get("/", async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
  }
});

router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      return res.status(404).json({ error: playerNotFound });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});



router.post("/", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!name 
      || !email 
      || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const existingPlayer = await Player.findOne({ where: { name } });
    if (existingPlayer) {
      return res.status(400).json({ error: "Name already in use" });
    }
    const existingEmail = await Player.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const player = await Player.create({ name, email, password });
    res.status(201).json({ message: "Succesfully created player", player });
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

router.patch("/", async (req, res) => {
  try {
    const{playerId, name, email, password, playerInfo} = req.body;

    if (!playerId 
      || !name 
      || !email 
      || !password 
      || !playerInfo) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const player = await Player.findByPk(playerId);
    if (!existingPlayer) {
      return res.status(404).json({ error: playerNotFound });
    }

    const existingPlayer = await Player.findOne({ where: { name } });
    if (existingPlayer) {
      return res.status(400).json({ error: "Name already in use" });
    }
    player.name = name;

    const existingEmail = await Player.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }
    player.email = email;

    player.playerInfo = playerInfo;

    await player.save();
    res.status(201).json({ message: "Succesfully created player", player });
    
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Player.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: playerNotFound });
    }
    res.json({ message: "Player deleted" });
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

module.exports = router;
