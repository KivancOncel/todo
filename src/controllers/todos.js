const todoModel = require("../models/todos");

exports.getTodo = (req, res) => {
  console.log("Getting TODOS");
  res.header("Content-Type", "application/json");
  res.json(todoModel.getTodos());
};

exports.createTodo = (req, res) => {
  const todo = req.body;
  const newTodo = todoModel.addTodo(todo);
  console.log("Creating TODO:", newTodo);
  res.header("Content-Type", "application/json");
  res.status(201).json(newTodo);
};

exports.deleteTodo = (req, res) => {
  const { todoId } = req.params;
  const deletedTodo = todoModel.deleteTodo(todoId);
  res.header("Content-Type", "application/json");
  if (deletedTodo === null) {
    console.log("TODO Not Found!:", todoId);
    res.status(404).send();
  } else {
    console.log("Deleting TODO:", deletedTodo);
    res.status(201).json(deletedTodo);
  }
};

exports.updateTodo = (req, res) => {
  const todo = req.body;
  const { todoId } = req.params;
  const updatedTodo = todoModel.updateTodo(todoId, todo);
  res.header("Content-Type", "application/json");
  if (updatedTodo === null) {
    console.log("TODO Not Found!:", todoId);
    res.status(404).send();
  } else {
    console.log("Updating TODO:", updatedTodo);
    res.status(201).json(updatedTodo);
  }
};
