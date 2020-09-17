import React from "react";

import classes from "./PageTitle.module.css";
import backImg from "../../../assets/pageTitle.jpg";

export default function PageTitle(props) {
  const BackGroundStyle = {
    backgroundImage: `url(${backImg})`,
  };
  return (
    <section className={classes.PageTitle} style={BackGroundStyle}>
      <div className={classes.SectionDescription}>
        <br className={classes.MobileDontShow} />
        <h1>Declaração de IR</h1>
        <br />
        <h3 className={classes.titleSecond}>{props.title}</h3>
      </div>
    </section>
  );
}
