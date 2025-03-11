const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Player = require("../models/Player");

const router = express.Router();
const internalServerError = "Internal server error";
const playerNotFound = "Player not found";

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    const existingUser = await Player.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const user = await Player.create({ name, email, password });
    res.json({ message: "Player registered", customer });
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });

    if (!customer || !(await bcrypt.compare(password, customer.password))) return res.status(401).json({ error: "Wrong credentials" });

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: internalServerError });
  }
});

module.exports = router;
