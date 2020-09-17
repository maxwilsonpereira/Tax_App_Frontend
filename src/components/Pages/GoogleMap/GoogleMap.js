// GOOGLE MAPS EMBED:
// Find the address on Google Maps / SHARE / EMBED

import React from "react";
import classes from "./GoogleMap.module.css";

export default function SimpleMap() {
  return (
    <iframe
      title="Maps"
      className={classes.mapFooter}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0295861087066!2d-46.72891828449892!3d-23.531438266374295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef8979110aa37%3A0x204a9d4e087d6ae5!2sR.%20Carlos%20Weber%2C%201379%20-%20Vila%20Leopoldina%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005303-000%2C%20Brazil!5e0!3m2!1sen!2sat!4v1591114099560!5m2!1sen!2sat"
    />
  );
}
