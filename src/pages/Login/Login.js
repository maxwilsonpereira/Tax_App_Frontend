import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionsIndex';

import classes from './Login.module.css';
import PageTitle from '../../components/Pages/PageTitle/PageTitle';

import Contato from '../../components/Pages/Contato';
import Duvidas from '../../components/Pages/Duvidas';
import LoginComponent from '../../components/Pages/Login/Login';
import RegisterUpdate from '../../components/Pages/Cadastro/registerUpdate';
import UserData from '../../components/Pages/Cadastro/userData';
import GoogleMap from '../../components/Pages/GoogleMap/GoogleMap';
import BtnAreaCliente from '../../components/UI/Buttons/BtnAreaCliente';
import SenhaAlterar from '../../components/Pages/SenhaAlterar';
// import BtnFunction from "../../components/UI/Buttons/ButtonFunc";

function Login(props) {
  const [userLoggedShow, setUserLoggedShow] = useState(null);
  const [alterarSenhaShow, setAlterarSenhaShow] = useState(null);
  const [alterarInfosToggle, setAlterarInfosToggle] = useState(false);

  const currentUsername = localStorage.getItem('currentUsername');
  const [messageToUser, setMessageToUser] = useState(null);

  useEffect(() => {
    props.onHideSideDrawer();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageToUser(null);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [messageToUser]);

  useEffect(() => {
    // userLogged beggins with FALSE!
    if (props.userIsLogged === 'true') {
      // USER IS LOGGED:
      setUserLoggedShow(
        <div className={classes.AppContainerLogin}>
          <div className={classes.GridAreaCliente}>
            <div className={classes.TitleAreaCliente}>
              <h1>Área do Cliente</h1>
              <br />
              <h2>Olá {currentUsername}</h2>
              <br />
              <br />
              <BtnAreaCliente BtnColor="RedBtn" function={alterarSenhaHandler}>
                Alterar Senha
              </BtnAreaCliente>
              <br />
              <br />
              <BtnAreaCliente BtnColor="GreenBtn" function={declaracoesHandler}>
                Declarações
              </BtnAreaCliente>
              <br /> <br />
              {messageToUser}
              <br />
              {alterarSenhaShow}
              <br />
            </div>
            <div>
              {alterarInfosToggle ? (
                <>
                  <RegisterUpdate
                    title="Meus Dados"
                    dontShowPasswordInputs="DontShow"
                    alterarInfosToggleFunc={alterarInfosToggleFunc}
                  >
                    Confirmar
                  </RegisterUpdate>
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
      );
    } else {
      setUserLoggedShow(
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
              <RegisterUpdate dontShowCancelBtn="DontShow" title="Cadastro">
                CADASTRAR
              </RegisterUpdate>
            </div>
          </div>
        </div>
      );
    }
  }, [
    alterarSenhaShow,
    props.userIsLogged,
    props.userName,
    props.userEmail,
    props.userTelephone,
    messageToUser,
    alterarInfosToggle,
  ]);

  function alterarInfosToggleFunc(e) {
    // e.preventDefault();
    setAlterarInfosToggle(!alterarInfosToggle);
  }

  function alterarSenhaHandler(e) {
    e.preventDefault();
    if (alterarSenhaShow === null) {
      setAlterarSenhaShow(<SenhaAlterar newPassSuccess={newPassSuccess} />);
    } else {
      setAlterarSenhaShow(null);
    }
  }

  function newPassSuccess(e) {
    // e.preventDefault();
    // alert("HERE");
    setAlterarSenhaShow(null);
    setMessageToUser(
      <div className={classes.MessageToUser}>Senha alterada com sucesso!</div>
    );
  }

  function declaracoesHandler(e) {
    e.preventDefault();
    setAlterarSenhaShow(null);
    setMessageToUser(
      <div className={classes.MessageToUser}>
        Nenhuma declaração disponível.
      </div>
    );
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
      {userLoggedShow}
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
          btnColor="OrangeBtn"
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
    userName: state.login.nameCurrentUser,
    userEmail: state.login.emailCurrentUser,
    userTelephone: state.login.phoneCurrentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (email) => dispatch(actionTypes.login(email)),
    onHideSideDrawer: () => dispatch(actionTypes.hideSideDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
