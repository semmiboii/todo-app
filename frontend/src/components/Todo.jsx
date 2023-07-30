import { useState } from "react";
import classes from "./Todo.module.css";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../redux/services/Task";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Todo = ({ id, title, due_date }) => {

  let copied = false;

  //States
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editedInput, setEditedInput] = useState({
    id,
    title,
    due_date
  });
  

  //Mutations
  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  //Handlers
  const handleChange = async (e) => {
    const { name, value } = await e.target;

    setEditedInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    editTodo({ id: id, body: editedInput });

    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(title).then(() => {
      copied = true;
    })
    .catch((err) => {
      console.log("Failed To Copy The Title ", err);
    })
  }


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
          <div className={classes.copy}>
            <button className={classes.copy_btn} onClick={handleCopy} style={{backgroundColor:  copied ? 'green': null}}><ContentCopyIcon/></button>
          </div>
          <div className={classes.delete}>
            <button className={classes.delete_btn} onClick={() => deleteTodo(id)}><DeleteIcon/></button>
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
            {!isEditing && <strong>{due_date}</strong>}
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
    </div>
  );
};

export default Todo;
