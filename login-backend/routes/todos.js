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

module.exports = router; 
