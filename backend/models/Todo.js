import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  title: {
    type: String,
    require: [true, "Title Required"],
  },
  desc: {
    type: String,
    require: [true, "Description Required"],
  },
  due_date: {
    type: Date,
    require: [true, "Date Required"],
  },
  status: {
    type: Boolean,
  },
});

export const Todo = model("todo", TodoSchema);
