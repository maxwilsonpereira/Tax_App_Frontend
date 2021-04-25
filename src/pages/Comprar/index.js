import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionsIndex';

import ButtonBuy from '../../components/UI/Buttons/ButtonBuy';
import { FaLock } from 'react-icons/fa';
import FormasDePagamento from '../../assets/formasDePagamento.png';
import MercadoPagoImg from '../../assets/mercadoPago.png';

import classes from './styles.module.scss';
import PageTitle from '../../components/Pages/PageTitle/PageTitle';
import Products from '../../components/Pages/Servicos';
import FaleConosco from '../../components/Pages/Contato';
import GoogleMap from '../../components/Pages/GoogleMap/GoogleMap';
import Duvidas from '../../components/Pages/Duvidas';

import ProductsAll from '../../components/Pages/Servicos/productAll';

function Comprar(props) {
  const [productId, setProductId] = useState(0);

  const auxProdId = localStorage.getItem('currentProduct') - 1;
  // TOTAL PRODUCTS AVAILABLE: 9
  useEffect(() => {
    if (
      auxProdId < 0 ||
      auxProdId > ProductsAll[productId].props.totalProducts
    ) {
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
        className={[classes.CenterAligned, classes.AppContainer].join(' ')}
      >
        <h1 className={classes.SectionTitle}>
          {ProductsAll[productId].props.titleMain}
        </h1>
        <h2 className={classes.SectionSutittle}>
          Conheça o nosso serviço e declare seu IR conosco
        </h2>
        <div className={classes.GridComprar}>
          <div className={classes.textContainer}>
            <div className={classes.Description}>
              <p className={classes.SectionDescriptionPartA}>
                &#42; {ProductsAll[productId].props.descriptionA}
                <br />
                &#42; {ProductsAll[productId].props.descriptionB}
                <br />
                {ProductsAll[productId].props.descriptionC && (
                  <>
                    &#42; {ProductsAll[productId].props.descriptionC}
                    <br />
                  </>
                )}
                {ProductsAll[productId].props.descriptionD && (
                  <>&#42; {ProductsAll[productId].props.descriptionD}</>
                )}
              </p>
            </div>
            <br />
            <p className={classes.SectionDescriptionPartB}>
              {ProductsAll[productId].props.descriptionMainA}
              <br /> <br />
            </p>
            <p className={classes.SectionDescriptionPartC}>
              {ProductsAll[productId].props.descriptionMainB}
              <br /> <br />
              {ProductsAll[productId].props.descriptionMainC}
              <br /> <br />
              {ProductsAll[productId].props.descriptionMainD ? (
                <>
                  {ProductsAll[productId].props.descriptionMainD}
                  <br /> <br />
                </>
              ) : null}
              {ProductsAll[productId].props.descriptionMainE ? (
                <>
                  {ProductsAll[productId].props.descriptionMainE}
                  <br /> <br />
                </>
              ) : null}
              {ProductsAll[productId].props.descriptionMainF ? (
                <>
                  {ProductsAll[productId].props.descriptionMainF}
                  <br /> <br />
                </>
              ) : null}
            </p>
          </div>
          <div className={classes.verticalLine} />
          <div className={classes.PagamentoContainer}>
            <div className={classes.TarjaComprar}>
              <FaLock size={20} color="#8f2c31" />
              <h3>COMPRA 100% SEGURA</h3>
            </div>
            <div className={classes.CompraCondicoes}>
              {ProductsAll[productId].props.discount === 0 ? (
                <>
                  <br />
                </>
              ) : (
                <>
                  <h3 className={classes.LineThrough}>
                    de R$ {ProductsAll[productId].props.oldPrice}
                  </h3>
                  <h3>por</h3>
                </>
              )}

              <h1>R$ {ProductsAll[productId].props.price}</h1>
              <h4 className={classes.Parcelas}>
                ou em <b>4x</b> de
                <br className={classes.MobileDontShow} />
                <b>R$ {ProductsAll[productId].props.parcela}</b> no cartão de
                crédito.
              </h4>
              {ProductsAll[productId].props.discount === 0 ? (
                <>
                  <br />
                </>
              ) : (
                <>
                  <br />
                  <h2 className={classes.FontOrange}>
                    {ProductsAll[productId].props.discount}% DE DESCONTO
                  </h2>
                </>
              )}

              <br />
              <br />
              <div className={classes.btnComprar}>
                <ButtonBuy BtnColor="BlueBtn" pathProp="/checkout#start">
                  COMPRAR
                </ButtonBuy>
              </div>
              <br />
              <div className={classes.FormasDePagamentoContainer}>
                <h5>Formas de pagamento:</h5>
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
        </div>
      </section>
      {/* DECLARE SEU IMPOSTO / SERVIÇOS */}
      <Products showHowMany={9} />
      {/* DÚVIDAS FREQUENTES */}
      <Duvidas backCollor="backWhite" />
      {/* FALE CONOSCO */}
      <FaleConosco
        IconColor="white"
        backColor="SectionBlueDark"
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
