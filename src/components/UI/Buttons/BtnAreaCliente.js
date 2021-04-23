import React from 'react';

import classes from './BtnAreaCliente.module.css';
// import clickSound from '../../../assets/sounds/click.mp3';

export default function ButtonBuy(props) {
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
      className={[classes.ButtonBuy, classes[props.BtnColor]].join(' ')}
    >
      {props.children}
    </button>
  );
}
