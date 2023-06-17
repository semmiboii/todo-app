import classes from "./Nav.module.css";
import User from "./User";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <User />
    </nav>
  );
};

export default Nav;
