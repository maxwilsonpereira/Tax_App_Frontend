import React from 'react';

import classes from './styles.module.scss';
// CAROUSEL:
// https://www.npmjs.com/package/react-multi-carousel
// npm install react-multi-carousel --save
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import testimonialsImg from '../../../assets/testimonials.jpg';
import TestimoniaslsObj from './TestimonialsObj';
const responsive = {
  breakpointA: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1500 },
    items: 3,
  },
  breakpointB: {
    breakpoint: { max: 1500, min: 700 },
    items: 2,
    // slidesToSlide: 3, optional, default to 1.
    //   slidesToSlide: 3,
  },
  breakpointC: {
    breakpoint: { max: 700, min: 300 },
    items: 1,
    //   slidesToSlide: 2,
  },
};
export default function Testimonials() {
  const testimonialsStyle = {
    backgroundImage: `url(${testimonialsImg})`,
  };

  return (
    <section className={classes.root} style={testimonialsStyle}>
      <div className={classes.container}>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={responsive}
          // ssr={true} means to render carousel on server-side.
          // ssr={true}
          infinite={true}
          autoPlay={false}
          // autoPlaySpeed={1000}
          keyBoardControl={true}
          // customTransition="all .5"
          // customTransition="0.5s ease-in-out"
          // transitionDuration={500}
          containerClass="carousel-container"
          // focusOnSelect={true}
          // removeArrowOnDeviceType={["tablet", "mobile"]}
          removeArrowOnDeviceType="breakpointA, breakpointB, breakpointC"
          // removeArrowOnDeviceType={["breakpointA", "mobile"]}
          // deviceType={this.props.deviceType}
          // dotListClass="custom-dot-list-style"
          // itemClass="carousel-item-padding-40-px"
        >
          {TestimoniaslsObj.map((testimonial, index) => (
            <div key={index} className={classes.frame}>
              <img
                className={classes.TestimonialImg}
                src={testimonial.image}
                alt=""
              />
              <h2>{testimonial.name}</h2>
              <h3>{testimonial.body}</h3>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
