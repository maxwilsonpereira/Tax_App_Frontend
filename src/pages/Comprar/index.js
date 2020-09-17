import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionsIndex";

import ButtonBuy from "../../components/UI/Buttons/ButtonBuy";
import { FaLock } from "react-icons/fa";
import FormasDePagamento from "../../assets/formasDePagamento.png";
import MercadoPagoImg from "../../assets/mercadoPago.png";

import classes from "./Comprar.module.css";
import PageTitle from "../../components/Pages/PageTitle/PageTitle";
import Servicos from "../../components/Pages/Servicos";
import FaleConosco from "../../components/Pages/Contato";
import GoogleMap from "../../components/Pages/GoogleMap/GoogleMap";
import Duvidas from "../../components/Pages/Duvidas";

import Products from "../../components/Pages/Servicos/Products";

function Comprar(props) {
  const [productId, setProductId] = useState(0);

  const auxProdId = localStorage.getItem("currentProduct") - 1;
  // TOTAL PRODUCTS AVAILABLE: 9
  useEffect(() => {
    if (auxProdId < 0 || auxProdId > Products[productId].props.totalProducts) {
      setProductId(0);
    } else if (!auxProdId) {
      setProductId(0);
    } else {
      setProductId(auxProdId);
    }
    // setTimeout(() => {}, 1000);
    props.onHideSideDrawer();
  }, [auxProdId, productId]);

  return (
    <>
      <section className={classes.CenterAligned}>
        <PageTitle title="Comprar" />
      </section>
      <section
        id="start"
        className={[classes.CenterAligned, classes.AppContainer].join(" ")}
      >
        <h1 className={classes.SectionTitle}>
          {Products[productId].props.titleMain}
        </h1>
        <h2 className={classes.SectionSutittle}>
          Conheça o nosso serviço e declare seu IR conosco
        </h2>
        <div className={classes.GridComprar}>
          <div>
            <p className={classes.SectionDescriptionMain}>
              {/* {curProduct.descriptionMainA} */}
              <br /> <br />
              {Products[productId].props.descriptionMainB}
              <br /> <br />
              {Products[productId].props.descriptionMainC}
              <br /> <br />
              {Products[productId].props.descriptionMainD ? (
                <>
                  {Products[productId].props.descriptionMainD}
                  <br /> <br />
                </>
              ) : null}
              {Products[productId].props.descriptionMainE ? (
                <>
                  {Products[productId].props.descriptionMainE}
                  <br /> <br />
                </>
              ) : null}
              {Products[productId].props.descriptionMainF ? (
                <>
                  {Products[productId].props.descriptionMainF}
                  <br /> <br />
                </>
              ) : null}
            </p>
          </div>
          <div className={classes.PagamentoContainer}>
            <div className={classes.TarjaComprar}>
              <FaLock size={20} color="white" />
              <h3>COMPRA 100% SEGURA</h3>
            </div>
            <div className={classes.CompraCondicoes}>
              <h3 className={classes.LineThrough}>
                De R$ {Products[productId].props.oldPrice}
              </h3>
              <h3>Por</h3>
              <h1>R$ {Products[productId].props.price}</h1>
              <h4 className={classes.Parcelas}>
                ou em <b>4x</b> de
                <br className={classes.MobileDontShow} />
                <b>R$ {Products[productId].props.parcela}</b> no cartão de
                crédito.
              </h4>
              <br />
              <h2 className={classes.FontOrange}>
                {Products[productId].props.discount}% DE DESCONTO
              </h2>
              <br />
              <br />
              <ButtonBuy BtnColor="BlueBtn" pathProp="/checkout#start">
                COMPRAR
              </ButtonBuy>
              <br /> <br /> <br />
              <h5>Formas de Pagamento:</h5>
              <img
                className={classes.FormasPagamento}
                src={FormasDePagamento}
                alt=""
              />
              <img
                className={classes.MercadoPago}
                src={MercadoPagoImg}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      {/* DECLARE SEU IMPOSTO / SERVIÇOS */}
      <Servicos showHowMany={9} />
      {/* DÚVIDAS FREQUENTES */}
      <Duvidas backCollor="backWhite" />
      {/* FALE CONOSCO */}
      <FaleConosco
        IconColor="white"
        backCollor="SectionBlueDark"
        title="Fale Conosco"
        description="Entre em contato pelo nosso telefone, e-mail ou preencha o
            formulário e fale com um dos nossos especialistas."
      />
      {/* GOOGLE MAPS */}
      <GoogleMap />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHideSideDrawer: () => dispatch(actionTypes.hideSideDrawer()),
  };
};

export default connect(null, mapDispatchToProps)(Comprar);
