var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var fs = require("fs");
var uuid = require("uuid");

var app = express();

// Use bodyParser and cors middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//file-path

const todosFilePath = __dirname +"/"+"data/todos.json";

//REST APIs
app.get("/todo", async (req, res) => {
  try {
    const todosData = fs.readFileSync(todosFilePath);
    const allTodos = JSON.parse(todosData);
    res.send(allTodos);
  } catch (error) {
    console.error("Error reading todos from the file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/todo/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todosData = fs.readFileSync(todosFilePath);
    const allTodos = JSON.parse(todosData);
    const editTodo = allTodos.find((todo) => todo.id === id);
    res.send(editTodo);
  } catch (error) {
    console.error("Error reading todos from the file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/todo/new", async (req, res) => {
  const { title, due_date, status } = req.body;

  try {
    const todosData = fs.readFileSync(todosFilePath);
    const allTodos = JSON.parse(todosData);
    const newTodo = {
      id: uuid.v4(), // Generate a unique ID using uuidv4
      title,
      due_date,
      status,
    };
    allTodos.push(newTodo);
    fs.writeFileSync(todosFilePath, JSON.stringify(allTodos, null, 2));
    res.send("New Todo Created Successfully");
  } catch (error) {
    console.error("Error writing todo to the file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/todo/edit/:id", async (req, res) => {
  const id = req.params.id;
  const editTodo = req.body;

  try {
    const todosData = fs.readFileSync(todosFilePath);
    const allTodos = JSON.parse(todosData);
    const index = allTodos.findIndex((todo) => todo.id === id);

    if (index !== -1) {
      allTodos[index] = {
        ...allTodos[index],
        ...editTodo,
      };
      fs.writeFileSync(todosFilePath, JSON.stringify(allTodos, null, 2));
      res.send("Edited Successfully");
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    console.error("Error updating todo in the file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/todo/:id/delete", async (req, res) => {
  const id = req.params.id;

  try {
    const todosData = fs.readFileSync(todosFilePath);
    const allTodos = JSON.parse(todosData);
    const updatedTodos = allTodos.filter((todo) => todo.id !== id);
    fs.writeFileSync(todosFilePath, JSON.stringify(updatedTodos, null, 2));
    res.send("Task Deleted Successfully");
  } catch (error) {
    console.error("Error deleting todo from the file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(4000, () => {
  console.log("Server Started On Port: " + 4000);
});
