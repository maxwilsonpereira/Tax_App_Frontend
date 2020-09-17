import React, { useState } from "react";

import classes from "./Style.module.css";

export default function NumeroDeVendas() {
  const [clientes, setClientes] = useState(null);
  const [declaracoes, setDeclaracoes] = useState(null);
  const [suportes, setSuportes] = useState(null);
  const [assessoria, setAssessorias] = useState(null);

  let timerId = setTimeout(() => {
    setClientes(clientes + 7);
  }, 0.1);
  if (clientes > 3430) {
    clearTimeout(timerId);
  }
  let timerIdB = setTimeout(() => {
    setDeclaracoes(declaracoes + 8);
  }, 0.1);
  if (declaracoes > 2650) {
    clearTimeout(timerIdB);
  }
  let timerIdC = setTimeout(() => {
    setSuportes(suportes + 9);
  }, 0.1);
  if (suportes > 4580) {
    clearTimeout(timerIdC);
  }
  let timerIdD = setTimeout(() => {
    setAssessorias(assessoria + 8);
  }, 0.1);
  if (assessoria > 6430) {
    clearTimeout(timerIdD);
  }

  return (
    <section className={classes.CenterAligned}>
      <div className={classes.AppContainer}>
        <div className={classes.FlexboxNumbers}>
          <div className={classes.Numbers}>
            <br />
            <br />
            <br />
            <h1>{clientes}</h1>
            <h3>
              Clientes
              <br />
              Felizes
            </h3>
          </div>
          <div className={classes.Numbers}>
            <br />
            <br />
            <br />
            <h1>{declaracoes}</h1>
            <h3>
              Declarações
              <br />
              Preparadas
            </h3>
          </div>
          <div className={classes.Numbers}>
            <br />
            <br />
            <br />
            <h1>{suportes}</h1>
            <h3>
              Suportes
              <br />
              Prestados
            </h3>
          </div>
          <div className={classes.Numbers}>
            <br />
            <br />
            <br />
            <h1>{assessoria}</h1>
            <h3>
              Assessorias
              <br />
              Especializadas
            </h3>
          </div>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
}
