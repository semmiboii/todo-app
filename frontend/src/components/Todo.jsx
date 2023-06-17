import { useState } from "react";
import classes from "./Todo.module.css";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../redux/services/Task";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

const Todo = ({ id, title, desc, due_date, status }) => {
  const [statusTodo, setStatusTodo] = useState(status);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const formattedDate = due_date.split("T")[0];
  const [editedInput, setEditedInput] = useState({
    id,
    title,
    desc,
    due_date: formattedDate,
    status,
  });

  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleChange = async (e) => {
    const { name, value } = await e.target;

    setEditedInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleStatus = () => {
    setStatusTodo((prevStatus) => !prevStatus);

    if (statusTodo) {
      deleteTodo(id);
    }
  };

  const handleEdit = () => {
    console.log(editedInput);

    editTodo({ id: id, body: editedInput });

    setIsEditing(false);
  };

  return (
    <div className={classes.todo}>
      <div className={classes.basic}>
        {!isEditing && (
          <h1 onClick={() => setIsExpanded(!isExpanded)}>{title}</h1>
        )}
        {isEditing && (
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={editedInput.title}
            className={classes.edit_title}
            onChange={handleChange}
          />
        )}
        <div className={classes.basic_ops}>
          <div className={classes.status}>
            <input
              type="checkbox"
              name="status"
              id="status"
              defaultValue={statusTodo}
              onClick={handleStatus}
            />
          </div>
          <div className={classes.edit}>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className={classes.edit_btn}
              >
                <EditIcon />
              </button>
            ) : (
              <button onClick={handleEdit} className={classes.edit_btn}>
                <DoneIcon />
              </button>
            )}
          </div>

          <div className={classes.time}>
            {!isEditing && <strong>{formattedDate}</strong>}
            {isEditing && (
              <input
                name="due_date"
                type="date"
                defaultValue={editedInput.due_date}
                onChange={handleChange}
                className={classes.edit_date}
              />
            )}
          </div>
        </div>
      </div>
      <div className={classes.description}>
        {isExpanded && !isEditing && <p className={classes.desc}>{desc}</p>}
        {isEditing && (
          <textarea
            tabIndex={1}
            name="desc"
            className={classes.edit_desc}
            defaultValue={editedInput.desc}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default Todo;
