const uuid = require("uuid");
const fs = require("fs");
const todosFile = "./data/todos.json";

const saveTodos = (todos) => {
  fs.writeFileSync(todosFile, JSON.stringify(todos, undefined, 2));
};

// Gets all todos
exports.getTodos = () => {
  try {
    const data = fs.readFileSync(todosFile);

    return JSON.parse(data);
  } catch {
    saveTodos([]);
    return this.getTodos();
  }
};

// Adds a todo item
exports.addTodo = (todo) => {
  const now = new Date();
  const newTodo = {
    done: false,
    ...todo,
    id: uuid.v4(),
    createdAt: now.toISOString(),
    updatedDate: now.toISOString(),
  };
  const todos = this.getTodos();
  todos.push(newTodo);
  saveTodos(todos);
  return newTodo;
};

exports.deleteTodo = (todoId) => {
  const todos = this.getTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex === -1) {
    return null;
  }
  const deletedTodo = todos[todoIndex];
  todos.splice(todoIndex, 1);
  saveTodos(todos);
  return deletedTodo;
};

exports.updateTodo = (todoId, todo) => {
  const todos = this.getTodos();
  const now = new Date();

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex === -1) {
    return null;
  }
  const existingTodo = todos[todoIndex];
  const updatedTodo = {
    ...existingTodo,
    ...todo,
    id: existingTodo.id,
    createdAt: existingTodo.createdAt,
    updatedDate: now.toISOString(),
  };
  todos.splice(todoIndex, 1, updatedTodo);
  saveTodos(todos);
  return updatedTodo;
};
