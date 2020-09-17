import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import BtnRedirect from "../../UI/Buttons/BtnRedirect";

import Icon from "../../../assets/icon_comprar.png";
import classes from "./Comprar.module.css";

export default function Compra(props) {
  const [noDiscountPrice, setNoDiscountPrice] = useState(null);
  const [noDiscountShow, setNoDiscountShow] = useState(null);

  // let history = useHistory();

  // SAVING CURRENT PRODUCT'S ID:

  useEffect(() => {
    if (props.discount < 1) {
      setNoDiscountPrice(null);
      setNoDiscountShow(null);
    } else {
      setNoDiscountPrice(
        <h2 className={classes.OldPrice}>De R$ {props.oldPrice.toFixed(2)}</h2>
      );
      setNoDiscountShow(<h3>{props.discount}% OFF</h3>);
    }
  }, [props.oldPrice, props.discount]);

  return (
    <div className={classes.ContainerCompra}>
      <img src={Icon} alt="" />
      <br />
      <br />
      <h1>{props.title}</h1>
      <h2 className={[classes.TextShadow, classes.SubTitle].join(" ")}>
        {props.subTitle}
      </h2>
      <br />
      <div className={classes.Description}>
        <p>
          {props.descriptionA}
          <br />
          {props.descriptionB}
          <br />
          {props.descriptionC}
          <br />
          {props.descriptionD}
        </p>
      </div>
      <br />
      <div className={classes.Discount}>
        {noDiscountShow}
        {noDiscountPrice}
      </div>
      <br />
      <br />
      <h1 className={classes.NewPrice}>Por R$ {props.price}</h1>
      <p>4x de R$ {props.parcela}</p>
      <br />
      <br />
      <BtnRedirect
        btnColor="ButtonBuy"
        pathProp={props.pathProps}
        curProd={props.id}
      >
        COMPRAR
      </BtnRedirect>
    </div>
  );
}
