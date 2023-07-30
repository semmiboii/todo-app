import Form from "./Form";
import TodoList from "./TodoList";
import classes from "./Homepage.module.css";

const Homepage = ({todos}) => {

  return (
    <div className={classes.home}>
      <div className={classes.nav}>
          <h1 className={classes.title}>Todo</h1>
      </div>
      <div className={classes.todo}>
        <TodoList todos={todos}/>
      </div>
      <div className={classes.form}>
        <Form />
      </div>
    </div>
  );
};

export default Homepage;
