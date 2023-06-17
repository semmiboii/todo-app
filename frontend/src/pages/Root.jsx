import { Outlet } from "react-router-dom";
// import Nav from "../components/Nav";
import classes from "./Root.module.css";

const Root = () => {
  return (
    <>
      {/* <Nav /> */}
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
