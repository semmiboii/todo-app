import classes from "./User.module.css";

const User = ({ img, name }) => {
  return (
    <div className={classes.user}>
      <img
        src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
        alt="user_img"
      />
      <span>
        John Doe
        <select>
          <option>My Todos</option>
          <option>Logout</option>
        </select>
      </span>
    </div>
  );
};

export default User;
