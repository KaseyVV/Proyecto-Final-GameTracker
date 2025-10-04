const express = require("express");
const Reseña = require("../models/Reseña");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reseñas = await Reseña.find().populate("juegoId", "titulo genero plataforma");
    res.json(reseñas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las reseñas" });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevaReseña = new Reseña(req.body);
    const guardado = await nuevaReseña.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: "Error al crear la reseña", detalle: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const reseñaActualizada = await Reseña.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!reseñaActualizada) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    res.json(reseñaActualizada);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar la reseña", detalle: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reseñaEliminada = await Reseña.findByIdAndDelete(req.params.id);

    if (!reseñaEliminada) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    res.json({ mensaje: "Reseña eliminada correctamente", reseña: reseñaEliminada });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar la reseña", detalle: err.message });
  }
});

module.exports = router;