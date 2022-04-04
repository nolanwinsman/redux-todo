import React from "react";
import classes from "./Button.module.css";

const Button = ({ text, type }) => {
  return (
    <button
      data-testid="add-todo-button"
      className={classes.button}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
