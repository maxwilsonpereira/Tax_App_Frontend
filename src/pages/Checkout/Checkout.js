import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionsIndex';

import iconImg from '../../assets/checkoutIcon.png';
import ButtonFunc from '../../components/UI/Buttons/ButtonFunc';
import Selector from '../../components/UI/Selector/Selector';
import classes from './styles.module.scss';
import PageTitle from '../../components/Pages/PageTitle/PageTitle';
import Products from '../../components/Pages/Servicos/productAll';
import Login from '../../components/Pages/Login/Login';
import Register from '../../components/Pages/Cadastro/register';
import CartaoCredito from '../../components/Pages/CartaoCredito';

function Sobre(props) {
  const [loggedInOrNot, setLoggedInOrNot] = useState(null);

  const [selectorBoletoColor, setSelectorBoletoColor] = useState(null);
  const [selectorCartaoColor, setSelectorCartaoColor] = useState(null);
  const [logInComponent, setLogInComponent] = useState(null);
  const [cadastroComponent, setCadastroComponent] = useState(null);
  const [cartaoCreditoComponent, setCartaoCreditoComponent] = useState(null);
  const [btnFinalizarCompra, setBtnFinalizarCompra] = useState(null);
  const [patBoletoBancario, setPayBoletoBancario] = useState(false);
  const [avisoLogIn, setAvisoLogIn] = useState(null);

  const [productId, setProductId] = useState(0);

  const currentUsername = localStorage.getItem('username');
  const currentUserEmail = localStorage.getItem('userEmail');

  const auxProdId = localStorage.getItem('currentProduct') - 1;

  // TOTAL PRODUCTS AVAILABLE: 9
  useEffect(() => {
    props.onHideSideDrawer();
  }, []);

  useEffect(() => {
    if (auxProdId < 0 || auxProdId > Products[productId].props.totalProducts) {
      setProductId(0);
    } else if (!auxProdId) {
      setProductId(0);
    } else {
      setProductId(auxProdId);
    }
  }, [auxProdId, productId]);

  let history = useHistory();
  useEffect(() => {
    // REDIRECTING TO HOME IF USER NOT LOGGED:
    // if (props.userIsLogged !== "true") {
    //   history.push("/");
    // }

    if (props.userIsLogged === 'true') {
      setLoggedInOrNot(
        <>
          <div className={classes.CenterAligned}>
            <div className={classes.UsuarioDadosStyle}>
              <h2>Resumo da Compra</h2> <br />
              <div className={classes.LeftAlignment}>
                <img className={classes.ImgResumoCompra} src={iconImg} alt="" />

                <h2
                  className={[classes.FontBlue, classes.InlineBlock].join(' ')}
                >
                  {Products[productId].props.title}
                  <br />
                  {Products[productId].props.subTitle}
                </h2>
              </div>
              <br />
              <h3>
                Usuário
                <br />
                <span className={classes.fontBlue}>
                  {currentUsername}
                  <br />
                  {currentUserEmail}
                </span>
                <br />
                <br />
                Valor da Compra:
                <br />
                <span className={classes.fontBlue}>
                  R$ {Products[productId].props.price}
                </span>
              </h3>
              <br className={classes.MobileOnly} />
            </div>
          </div>
          <br className={classes.MobileOnly} />
          {/* FORMA DE PAGAMENTO */}
          <div className={classes.CenterAligned}>
            {/* <br className={classes.MobileOnly} /> */}
            <h2>Forma de Pagamento</h2>
            <br />
            <Selector
              btnColor={selectorBoletoColor}
              function={boletoBancarioHandler}
            >
              Boleto Bancário
            </Selector>
            <br />
            <br />
            <Selector
              btnColor={selectorCartaoColor}
              function={cartaoDeCreditoHandler}
            >
              Cartão de Crédito
            </Selector>
            <br />
            <br />
            {cartaoCreditoComponent}
            <br />
            {btnFinalizarCompra}
            <br />
            <br />
          </div>
        </>
      );
    } else {
      setAvisoLogIn(
        <h2 className={classes.AvisoParaLogar}>
          Favor Fazer o Login ou Cadastrar-se no Sistema
          <br /> <br />
        </h2>
      );
      setLoggedInOrNot(
        <>
          <div className={classes.CenterAligned}>
            {/* <div className={classes.CenterAligned}> */}
            <div className={classes.UsuarioDadosStyle}>
              <h2>Resumo da Compra</h2> <br />
              <div className={classes.LeftAlignment}>
                <img className={classes.ImgResumoCompra} src={iconImg} alt="" />

                <h2
                  className={[classes.FontBlue, classes.InlineBlock].join(' ')}
                >
                  {Products[productId].props.title}
                  <br />
                  {Products[productId].props.subTitle}
                </h2>
              </div>
              <br />
              <h3>
                Valor da Compra:
                <br />
                R$ {Products[productId].props.price}
              </h3>
              <br className={classes.MobileOnly} />
            </div>
            {/* </div> */}
          </div>
          <br className={classes.MobileOnly} />
          <br className={classes.MobileOnly} />
          <div className={classes.CenterAligned}>
            <h2>Já é cadastrado?</h2> <br />
            <ButtonFunc btnColor="BlueBtn" function={loginHandler}>
              Log In
            </ButtonFunc>
            <br />
            {logInComponent}
            <br />
            <h2>Não tem cadastro?</h2> <br />
            <ButtonFunc btnColor="BtnGreen" function={cadastroNovoHandler}>
              Cadastro
            </ButtonFunc>
            <br />
            {cadastroComponent}
            {/* <br /> */}
          </div>
        </>
      );
    }
  }, [
    logInComponent,
    cadastroComponent,
    selectorBoletoColor,
    selectorCartaoColor,
    productId,
    props.userIsLogged,
  ]);

  function loginHandler(e) {
    e.preventDefault();
    setCadastroComponent(null);
    // TOGGLE LOG IN:
    if (logInComponent === null) {
      setLogInComponent(
        // userLoggedInHandler will be executed ONLY IF user
        // successfully log in:
        <Login function={userLoggedInHandler} showTitle="noTitle" />
      );
    } else {
      setLogInComponent(null);
    }
  }
  function userLoggedInHandler(e) {
    // e.preventDefault();
    props.onLogIn();
  }
  function cadastroNovoHandler(e) {
    e.preventDefault();
    setLogInComponent(null);
    // TOGGLE CADASTRO:
    if (cadastroComponent === null) {
      setCadastroComponent(<Register showTitle="noTitle">Cadastrar</Register>);
    } else {
      setCadastroComponent(null);
    }
  }
  function boletoBancarioHandler(e) {
    e.preventDefault();
    setBtnFinalizarCompra(
      <ButtonFunc
        // className={classes.BtnFinalizar}
        btnColor="BtnGreenPagar"
        function={finalizarCompraHandler}
      >
        Confirmar
      </ButtonFunc>
    );
    setCartaoCreditoComponent(null);
    setPayBoletoBancario(true);
    setSelectorCartaoColor('SelectorBlue');
    setSelectorBoletoColor('SelectorBlueOpposite');
  }
  function cartaoDeCreditoHandler(e) {
    e.preventDefault();
    setCartaoCreditoComponent(<CartaoCredito />);
    setBtnFinalizarCompra(null);
    setPayBoletoBancario(false);
    setSelectorBoletoColor('SelectorBlue');
    setSelectorCartaoColor('SelectorBlueOpposite');
  }
  function finalizarCompraHandler(e) {
    e.preventDefault(e);
    alert('Confirmar');
  }

  return (
    <>
      <div id="start" style={{ position: 'absolute', top: '500px' }} />
      <section className={classes.CenterAligned}>
        <PageTitle title="Finalizar Pedido" />
      </section>
      <section className={classes.CenterAligned}>
        <div className={classes.AppContainer}>
          <h1 className={classes.SectionTitle}>
            Finalize sua compra com segurança
          </h1>
          {avisoLogIn}
          <div className={classes.GridCheckout}>{loggedInOrNot}</div>
          <br />
          <br />
          <br />
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userIsLogged: state.login.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (email) => dispatch(actionTypes.login(email)),
    onHideSideDrawer: () => dispatch(actionTypes.hideSideDrawer()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sobre);
