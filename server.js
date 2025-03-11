delete require.cache[require.resolve("./middleware/authMiddleware")];
console.log("Cache di authMiddleware.js cancellata!");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
console.log("Tipo di authenticate in server.js:", typeof authenticate); // <--- LOG DI DEBUG

const sequelize = require("./config/database");

const playerRoutes = require("./routes/playerRoutes");
const authRoute = require("./routes/authRoute");
const gameRoutes = require("./routes/gameRoutes");
const gameMovesRoutes = require("./routes/gameMovesRoute");

const app = express();
app.use(express.json());
app.use(cors());

// **Collega le route ai rispettivi percorsi**
app.use("/players", playerRoutes);
app.use("/games", gameRoutes);
app.use("/gamemoves", gameMovesRoutes);
app.use("/auth", authRoute);

//  **Stato del Backend**
app.get("/status", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "Backend is running", database: "Connected", timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ status: "Backend running", database: "Connection failed", error: error.message });
  }
});

//  **Avvio server**
const PORT = process.env.PORT || 8080;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Server in esecuzione su porta ${PORT})"));
});