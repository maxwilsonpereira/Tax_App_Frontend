import React, { useState, useEffect } from 'react';
// import { useHistory } from "react-router-dom";
// import { HashLink as Link } from "react-router-hash-link";

import classes from './ButtonBuy.module.css';
// import clickSound from '../../../assets/sounds/click.mp3';

export default function ButtonBuy(props) {
  const [btnColorAux, setBtnColorAux] = useState('BlueBtn');
  useEffect(() => {
    if (props.btnColor) {
      setBtnColorAux(props.btnColor);
    }
  }, []);
  // let history = useHistory();
  // const playAudioHandler = (event) => {
  //   let audio = new Audio(clickSound);
  //   // PLAY CLICK, THEN EXECUTE FUNCTION:
  //   setTimeout(() => {
  //     props.function(event);
  //   }, 200);
  //   audio.play();
  // };
  return (
    <button
      // onClick={playAudioHandler}
      onClick={props.function}
      className={[classes.ButtonBuy, classes[btnColorAux]].join(' ')}
    >
      {props.children}
    </button>
  );
}
