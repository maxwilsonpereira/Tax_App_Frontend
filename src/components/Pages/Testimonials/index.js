import React from "react";

import classes from "./Testimonials.module.css";

import testimonialsImg from "../../../assets/testimonials.jpg";
import TestimoniaslsObj from "./TestimonialsObj";

export default function Testimonials() {
  const testimonialsStyle = {
    backgroundImage: `url(${testimonialsImg})`,
  };
  // console.log(TestimoniaslsObj);
  return (
    <section
      className={classes.TestimonialsImageContainer}
      style={testimonialsStyle}
    >
      <br />
      <div className={classes.AppContainer}>
        <div className={classes.Flexbox}>
          {TestimoniaslsObj.map((testimonial, index) => (
            <div key={index}>
              <img
                className={classes.TestimonialImg}
                src={testimonial.image}
                alt=""
              />
              <h2>{testimonial.name}</h2>
              <h3>{testimonial.body}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
