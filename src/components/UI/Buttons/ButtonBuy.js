import React from "react";
// import { Link } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

import classes from "./ButtonBuy.module.css";
import clickSound from "../../../assets/sounds/click.mp3";

export default function ButtonBuy(props) {
  const playAudioHandler = () => {
    let audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <Link
      onClick={playAudioHandler}
      className={[classes.ButtonBuy, classes[props.BtnColor]].join(" ")}
      to={props.pathProp}
    >
      {props.children}
    </Link>
  );
}
