import React from "react";

import classes from "./Comprar.module.css";
import Products from "./Products";

export default function Comprar(props) {
  const productsToShow = [];
  if (props.showOnlyHighlight) {
    for (let i = 0; i < Products[0].props.totalProducts; i++) {
      if (Products[i].props.highlight) {
        productsToShow[i] = Products[i];
      }
    }
  } else {
    for (let i = 0; i < Products[0].props.totalProducts; i++) {
      productsToShow[i] = Products[i];
    }
  }
  return (
    <section className={[classes.CenterAligned, classes.SectionGrey].join(" ")}>
      <br />
      <h1 className={classes.SectionTitle}>Declare seu Imposto de Renda</h1>
      <p className={classes.SectionDescription}>
        Equipe especializada e suporte completo para você! Faça agora a sua
        declaração.
      </p>
      <div className={classes.AppContainer}>
        <div className={classes.FlexboxComprar}>{productsToShow}</div>
      </div>
      <br />
      <br />
    </section>
  );
}
