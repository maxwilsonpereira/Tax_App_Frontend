import React from "react";

import duvidasObj from "./Duvidas";
import classes from "./Duvidas.module.css";

export default function Duvidas(props) {
  let listToPrint = [];
  duvidasObj.map((duvida) => {
    if (duvida.list) {
      duvida.list.map((item, index) => {
        return (listToPrint[index] = <>{item.item}</>);
      });
    }
    return null;
  });

  return (
    <section
      id="duvidas"
      className={[classes.CenterAligned, classes[props.backCollor]].join(" ")}
    >
      <br /> <br />
      <h1 className={classes.SectionTitle}>Dúvidas Frequentes</h1>
      <br />
      <div className={classes.AppContainer}>
        <div className={classes.Flexbox}>
          {duvidasObj.map((duvida, index) => {
            if (duvida.list) {
              return (
                <div key={index}>
                  <div>
                    <h1>{duvida.title}</h1>
                    <ul>
                      <p>
                        {listToPrint.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </p>
                    </ul>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <div>
                    <h1>{duvida.title}</h1>
                  </div>
                  <p>{duvida.body}</p>
                </div>
              );
            }
          })}
        </div>
      </div>
      <br /> <br />
    </section>
  );
}
