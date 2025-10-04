const express = require("express");
const Juego = require("../models/Juego");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los juegos" });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    const guardado = await nuevoJuego.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: "Error al crear el juego", detalle: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!juegoActualizado) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    res.json(juegoActualizado);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar el juego", detalle: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const juegoEliminado = await Juego.findByIdAndDelete(req.params.id);

    if (!juegoEliminado) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    res.json({ mensaje: "Juego eliminado correctamente", juego: juegoEliminado });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar el juego", detalle: err.message });
  }
});

module.exports = router;