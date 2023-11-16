const Todo = require("../schema/todo");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({idUser: req.user.id})
    if(todos){
      res.json(todos)
    }else{
      res.status(404).json({error:"No todos found"})
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/", async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ error: "Title is require" });
  }

  try {
    const todo = new Todo({
      title: req.body.title,
      completed: false,
      idUser: req.user.id,
    });

    const newTodo = await todo.save()
    res.json(newTodo)
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "TODO not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating TODO:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { todoIds } = req.body;
    const deletedTodos = await Todo.deleteMany({ _id: { $in: todoIds } });
    if (deletedTodos.deletedCount === 0) {
      return res.status(404).json({ error: "No se encontraron tareas para eliminar" });
    }
    res.json({ message: "Tareas completadas eliminadas correctamente" });
  } catch (error) {
    console.error("Error al eliminar las tareas completadas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router; 
