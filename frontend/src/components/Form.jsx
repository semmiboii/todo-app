import { useRef, useState } from "react";
import classes from "./Form.module.css";
import { useAddTodoMutation } from "../redux/services/Task";

const Form = () => {
  let initialFormData = {
    title: "",
    desc: "",
    due_date: "",
    status: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const title = useRef();
  const desc = useRef();
  const due_date = useRef();

  const [addTodo] = useAddTodoMutation();

  const handleChange = () => {
    setFormData({
      title: title.current.value,
      desc: desc.current.value,
      due_date: due_date.current.value,
      status: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo(formData);

    setFormData(initialFormData);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.title}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          ref={title}
          onChange={handleChange}
          value={formData.title}
          required
        />
      </div>
      <div className={classes.desc}>
        <label htmlFor="desc">Description</label>
        <textarea
          name="desc"
          onChange={handleChange}
          id="desc"
          cols="30"
          rows="10"
          ref={desc}
        />
      </div>
      <div className={classes.due_date}>
        <label htmlFor="due_date">Due Date</label>
        <input
          type="date"
          name="due_date"
          id="due_date"
          onChange={handleChange}
          ref={due_date}
          required
        />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default Form;
