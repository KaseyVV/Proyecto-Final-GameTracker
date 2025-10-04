const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const Juego = require("./src/models/Juego");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Conectado a MongoDB");
  insertarJuegos();
})
.catch(err => console.error("❌ Error al conectar:", err));

async function insertarJuegos() {
  try {
    const data = fs.readFileSync("./data/juegos.json", "utf-8");
    const juegos = JSON.parse(data);

    await Juego.deleteMany({});
    console.log("🧹 Base de datos limpia antes de insertar nuevos juegos");

    await Juego.insertMany(juegos);

    console.log("🎮 Juegos insertados correctamente en la base de datos!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error al insertar juegos:", err);
  }
}