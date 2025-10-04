const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const juegosRoutes = require("./routes/juegos");
const reseñasRoutes = require("./routes/reseñas");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/juegos", juegosRoutes);
app.use("/reseñas", reseñasRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
