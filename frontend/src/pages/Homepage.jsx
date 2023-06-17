import Form from "../components/Form";
import TodoList from "../components/TodoList";
import classes from "./Homepage.module.css";

const Homepage = () => {
  return (
    <div className={classes.home}>
      <h1 className={classes.title}>Todo</h1>
      <TodoList />
      <Form />
    </div>
  );
};

export default Homepage;
