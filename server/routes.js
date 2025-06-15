const express = require("express");
const router = express.Router();
const verifyToken = require("./middleware/verifyToken");

const Todo = require("./models/Todo");

// GET /todos → tareas del usuario autenticado
router.get("/todos", verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }); //  solo las suyas
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener tareas" });
  }
});

// POST /todos → crear tarea asociada al usuario
router.post("/todos", verifyToken, async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    return res.status(400).json({ message: "Falta la tarea" });
  }

  try {
    const newTodo = await Todo.create({
      todo,
      user: req.userId, //  se asocia al usuario
    });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Error al crear tarea" });
  }
});

// DELETE /todos/:id → solo si es suya
router.delete("/todos/:id", verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId, //  debe ser suya
    });

    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json({ acknowledged: true });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
});

// PUT /todos/:id → cambiar estado solo si es suya
router.put("/todos/:id", verifyToken, async (req, res) => {
  const { status } = req.body;

  if (typeof status !== "boolean") {
    return res.status(400).json({ message: "Estado inválido" });
  }

  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, //  debe ser suya
      { status: !status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
});

module.exports = router;
