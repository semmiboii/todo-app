import Todo from "./Todo";
import classes from "./TodoList.module.css";

const TodoList = ({todos}) => {
  return (
    <ul className={classes.list}>
      {todos ?
      todos.map(({id,title,due_date,status}) => (
      <li key={id}>
        <Todo 
          id={id} 
          title={title} 
          due_date={due_date} 
          status={status}/>
      </li>
      )) :
      <p>"Loading..."</p>
      }
    </ul>
  );
};

export default TodoList;
