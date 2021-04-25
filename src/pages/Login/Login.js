import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionsIndex';

import classes from './styles.module.scss';
import PageTitle from '../../components/Pages/PageTitle/PageTitle';

import Contato from '../../components/Pages/Contato';
import Duvidas from '../../components/Pages/Duvidas';
import LoginComponent from '../../components/Pages/Login/Login';
import Register from '../../components/Pages/Cadastro/register';
import UserData from '../../components/Pages/Cadastro/userData';
import GoogleMap from '../../components/Pages/GoogleMap/GoogleMap';
import BtnAreaCliente from '../../components/UI/Buttons/BtnAreaCliente';
import SenhaAlterar from '../../components/Pages/SenhaAlterar';

function Login(props) {
  const [alterarSenhaShow, setAlterarSenhaShow] = useState(null);
  const [alterarInfosToggle, setAlterarInfosToggle] = useState(false);
  const [currentUsername, setCurrentUsername] = useState(
    localStorage.getItem('username')
  );

  useEffect(() => {
    setCurrentUsername(props.username);
  }, [props.username]);

  useEffect(() => {
    props.onSetMessageAreaCliente('');
    setCurrentUsername(props.username);
    props.onHideSideDrawer();
  }, []);

  function alterarInfosToggleFunc() {
    props.onEraseAllMessages();
    setAlterarInfosToggle(!alterarInfosToggle);
  }

  function alterarSenhaHandler(e) {
    e.preventDefault();
    props.onSetMessageAreaCliente('');
    if (alterarSenhaShow === null) {
      setAlterarSenhaShow(
        <SenhaAlterar
          newPassSuccess={newPassSuccess}
          cancelar={cancelarHandler}
        />
      );
    } else {
      setAlterarSenhaShow(null);
    }
  }
  function cancelarHandler() {
    props.onSetMessageAreaCliente('');
    setAlterarSenhaShow(null);
  }

  function newPassSuccess(e) {
    // e.preventDefault();
    setAlterarSenhaShow(null);
    props.onSetMessageAreaCliente('Senha alterada com sucesso!');
  }

  function declaracoesHandler(e) {
    e.preventDefault();
    setAlterarSenhaShow(null);
    props.onSetMessageAreaCliente('Nenhuma declaração disponível.');
  }
  function userLoggedInHandler(e) {
    // e.preventDefault();
    props.onLogIn();
  }

  return (
    <>
      <div id="start" style={{ position: 'absolute', top: '0px' }} />
      <section className={classes.CenterAligned}>
        <PageTitle title="Login" />
      </section>
      {props.userIsLogged === 'true' ? (
        <>
          <div className={classes.AppContainerLogin}>
            <div className={classes.GridAreaCliente}>
              <div className={classes.TitleAreaCliente}>
                <h1>Área do Cliente</h1>
                <br />
                <h2>Olá {currentUsername}</h2>
                <br />
                <br />
                <BtnAreaCliente
                  BtnColor="RedBtn"
                  function={alterarSenhaHandler}
                >
                  Alterar Senha
                </BtnAreaCliente>
                <br />
                <br />
                <BtnAreaCliente
                  BtnColor="GreenBtn"
                  function={declaracoesHandler}
                >
                  Declarações
                </BtnAreaCliente>
                <br /> <br />
                <div className={classes.MessageToUser}>
                  {props.messageAreaCliente}
                </div>
                {alterarSenhaShow}
                <br />
              </div>
              <div>
                {alterarInfosToggle ? (
                  <>
                    <Register
                      title="Meus Dados"
                      dontShowPasswordInputs="DontShow"
                      alterarInfosToggleFunc={alterarInfosToggleFunc}
                    >
                      Confirmar
                    </Register>
                  </>
                ) : (
                  <UserData
                    title="Meus Dados"
                    function={alterarInfosToggle}
                    alterarInfosToggleFunc={alterarInfosToggleFunc}
                  >
                    Alterar Informações
                  </UserData>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={classes.AppContainerLogin}>
            <div className={classes.Flexbox}>
              <div>
                {/* LOGIN COMPONENT */}
                <LoginComponent
                  btnColor="BlueBtn"
                  function={userLoggedInHandler}
                />
              </div>
              <div>
                <Register
                  dontShowCancelBtn="DontShow"
                  title="Cadastro"
                  alterarInfosToggleFunc={alterarInfosToggleFunc}
                >
                  Cadastrar
                </Register>
              </div>
            </div>
          </div>
        </>
      )}
      <br />
      <br />
      {/* DÚVIDAS FREQUENTES */}
      <Duvidas backCollor="SectionGrey" />
      {/* FALE CONOSCO */}
      <div className={classes.FaleConosco}>
        <Contato
          IconColor="white"
          title="Fale Conosco"
          backColor="SectionBlueDark"
          btnColor="ButtonBuy"
          description="Entre em contato pelo nosso telefone, e-mail ou preencha o
            formulário e fale com um dos nossos especialistas."
        />
      </div>
      {/* GOOGLE MAPS */}
      <GoogleMap />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userIsLogged: state.login.isLogged,
    username: state.login.username,
    userEmail: state.login.userEmail,
    userTelephone: state.login.userPhone,
    messageAreaCliente: state.login.messageAreaCliente,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (email) => dispatch(actionTypes.login(email)),
    onHideSideDrawer: () => dispatch(actionTypes.hideSideDrawer()),
    onSetMessageAreaCliente: (message) =>
      dispatch(actionTypes.setMessageAreaCliente(message)),
    onEraseAllMessages: () => dispatch(actionTypes.eraseAllMessages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
