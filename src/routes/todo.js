const express = require("express");
const bodyParser = require("body-parser");
const todosController = require("../controllers/todos");

const router = express.Router();
router.use(bodyParser.json());

const { getTodo, createTodo, deleteTodo, updateTodo } = todosController;

router.get("/", getTodo);

router.post("/", createTodo);

router.delete("/:todoId", deleteTodo);

router.put("/:todoId", updateTodo);

module.exports = router;
