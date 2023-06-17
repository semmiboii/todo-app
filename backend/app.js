import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./utils/database.js";
import { Todo } from "./models/Todo.js";

dotenv.config();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cors());

connectToDB();

app.get("/todo", async (req, res) => {
  const allTodos = await Todo.find({}).exec();
  res.send(allTodos);
});

app.get("/todo/edit/:id", async (req, res) => {
  const id = req.params.id;
  const editTodo = await Todo.findById(id);
  res.send(editTodo);
});

app.post("/todo/new", async (req, res) => {
  const { title, desc, due_date, status } = req.body;

  const newTodo = new Todo({
    title,
    desc,
    due_date,
    status,
  });

  await newTodo.save();
});

app.put("/todo/edit/:id", async (req, res) => {
  const id = req.params.id;
  const editTodo = req.body;

  const edit = await Todo.findByIdAndUpdate(id, editTodo).exec();

  if (edit) {
    res.send("Edited Succesfully");
  } else {
    res.send("error occured");
  }
});

app.delete("/todo/:id/delete", async (req, res) => {
  const id = req.params.id;
  const deleteTodo = await Todo.findByIdAndDelete(id).exec();
  if (deleteTodo) {
    res.send("Task Deleted Succesfully");
  } else {
    res.send("Task Was Not Deleted");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server Started On Port: " + process.env.PORT);
});
