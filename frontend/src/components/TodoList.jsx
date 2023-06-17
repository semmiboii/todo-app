import classes from "./TodoList.module.css";
import Todo from "./Todo";
import { useGetTodoQuery } from "../redux/services/Task";

const TodoList = () => {
  const { data: todos, isSuccess, isLoading } = useGetTodoQuery();
  const allTodos =
    isSuccess &&
    todos.map(({ _id, title, desc, due_date, status }) => (
      <li key={_id}>
        <Todo
          id={_id}
          title={title}
          desc={desc}
          due_date={due_date}
          status={status}
        />
      </li>
    ));

  return (
    <ul className={classes.list}>
      {!isSuccess && <p>Failed To Fetch Todos</p>}
      {isSuccess && allTodos}
    </ul>
  );
};

export default TodoList;
