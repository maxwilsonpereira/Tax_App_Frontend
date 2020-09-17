import React from "react";
import { Link } from "react-router-dom";

import classes from "./ButtonMaxA.module.css";

export default function ButtonBuy(props) {
  return (
    <Link className={classes.ButtonMaxA} to={props.pathProp}>
      {props.children}
    </Link>
  );
}
