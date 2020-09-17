import React from "react";

import classes from "./Selector.module.css";
import clickSound from "../../../assets/sounds/click.mp3";

export default function ButtonBuy(props) {
  const playAudioHandler = (event) => {
    let audio = new Audio(clickSound);
    // PLAY CLICK, THEN EXECUTE FUNCTION:
    setTimeout(() => {
      props.function(event);
    }, 200);
    audio.play();
  };
  return (
    <button
      onClick={playAudioHandler}
      className={[classes.SelectorBlue, classes[props.btnColor]].join(" ")}
    >
      {props.children}
    </button>
  );
}
