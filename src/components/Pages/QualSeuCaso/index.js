import React from 'react';

import classes from './QualSeuCaso.module.css';
import ButtonBuy from '../../UI/Buttons/ButtonBuy';

export default function QualSeuCaso() {
  return (
    <section
      className={[classes.CenterAligned, classes.SectionGreyDark].join(' ')}
    >
      <div className={classes.AppContainer}>
        <div className={classes.Flexbox}>
          <div className={classes.QualSeuCaso}>
            <br />
            <h1>Não sabe qual é o seu caso?</h1>
            <h2>Entre em contato conosco e converse com um especialista.</h2>
          </div>
          <div className={classes.QualSeuCasoB}>
            <ButtonBuy pathProp="/contato">Entrar em contato</ButtonBuy>
          </div>
        </div>
        <br /> <br /> <br />
      </div>
    </section>
  );
}
