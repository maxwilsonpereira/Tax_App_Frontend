import React from 'react';
// import { useHistory } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

import classes from './ButtonBuy.module.css';
// import clickSound from '../../../assets/sounds/click.mp3';

export default function ButtonBuy(props) {
  // let history = useHistory();
  const playAudioHandler = (event) => {
    // let audio = new Audio(clickSound);
    // audio.play();
    localStorage.setItem('currentProduct', props.curProd);
  };
  return (
    <Link
      style={{ width: '100px' }}
      onClick={playAudioHandler}
      // className={[classes.ButtonBuy, classes[props.btnColor]].join(' ')}
      to="comprar#start"
    >
      <button
        className={[classes.ButtonBuy, classes[props.btnColor]].join(' ')}
      >
        {props.children}
      </button>
    </Link>
  );
}
