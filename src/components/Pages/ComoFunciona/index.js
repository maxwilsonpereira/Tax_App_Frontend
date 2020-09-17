import React from "react";

// VIMEO:
// https://github.com/u-wave/react-vimeo
// npm install --save @u-wave/react-vimeo
import Vimeo from "@u-wave/react-vimeo";

import classes from "./ComoFunciona.module.css";

export default function ComoFunciona() {
  return (
    <section className={classes.CenterAligned}>
      <br />
      <h1 className={classes.SectionTitle}>Como Funciona</h1>
      <p className={classes.SectionDescription}>
        Nós somos a Declaração de IR, assista esse vídeo e veja como funciona
        uma parte do nosso trabalho. Estamos disponíveis no chat para atendê-lo
        e esclarecer todas as dúvidas que você tenha. Nós fazemos a sua
        declaração de Imposto de Renda deixar de ser uma dor de cabeça pra você.
      </p>
      <div className={classes.VideoContainer}>
        <Vimeo
          className={classes.VideoClass}
          video="323484351"
          responsive={true}
        />
      </div>
      <br />
      <br />
    </section>
  );
}
