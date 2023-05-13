import React from "react";
import classes from "./Title.module.css";

function Title() {
  return (
    <div className={classes.group}>
      <h1 className={classes.h1}>LOGO</h1>
      <p>A place to share your knowledge.</p>
    </div>
  );
}

export default Title;
