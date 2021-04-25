import React, { useState, useEffect } from 'react';
// import { useHistory } from "react-router-dom";

import BtnRedirect from '../../UI/Buttons/BtnRedirect';

// import Icon from '../../../assets/icon_comprar.png';
import classes from './styles.module.css';

export default function ProductOne(props) {
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
      <div className={classes.flexInner}>
        <div className={classes.upPart}>
          {/* <img className={classes.image} src={Icon} alt="" /> */}
          <h1>{props.title}</h1>
          <h2 className={[classes.TextShadow, classes.SubTitle].join(' ')}>
            {props.subTitle}
          </h2>
          <br />
          {/* <div className={classes.Description}>
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
      <br /> */}
          {noDiscountShow}
        </div>
        <div className={classes.downPart}>
          {noDiscountPrice}
          <h1 className={classes.NewPrice}>Por R$ {props.price}</h1>
          <p>4x de R$ {props.parcela}</p>
          <br />
          <br />
          <BtnRedirect
            btnColor="ButtonBuy"
            pathProp={props.pathProps}
            curProd={props.id}
          >
            Saiba Mais
          </BtnRedirect>
        </div>
      </div>
    </div>
  );
}
