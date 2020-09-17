import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionsIndex";

import classes from "./Login.module.css";
import ButtonFunc from "../../UI/Buttons/ButtonFunc";

function FaleConosco(props) {
  const [email, setEmail] = useState("E-mail");
  const [senha, setSenha] = useState("Senha");
  const [errMessageAux, setErrMessageAux] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrMessageAux(null);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [errMessageAux]);

  useEffect(() => {
    if (!props.errMessage) {
      setErrMessageAux(null);
    } else {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>{props.errMessage}</div>
      );
    }
  }, [props.errMessage]);

  if (email === "") {
    setEmail("E-mail");
  }
  if (senha === "") {
    setSenha("Senha");
  }

  function loginHandler(e) {
    e.preventDefault();
    // VALIDATION:
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!pattern.test(email)) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Favor preencher os campos corretamente!
        </div>
      );
    } else {
      props.onLogIn(email, senha);
    }
  }

  function enterKeyPressedHandler(event) {
    // event.preventDefault();
    var code = event.keyCode || event.which;
    if (code === 13) {
      // alert("ENTER KEY PRESSED!");
      loginHandler(event);
    }
  }

  return (
    <div className={classes.LoginStyle}>
      <div>
        <div className={classes[props.showTitle]}>
          <h1>Login</h1>
          <br />
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={enterKeyPressedHandler}
          type="email"
          required
          placeholder={email}
          name={email}
        />
        <br />
        <input
          onChange={(e) => setSenha(e.target.value)}
          onKeyPress={enterKeyPressedHandler}
          type="password"
          required
          placeholder={senha}
          name={senha}
        />
        <br />
        <br />
        <div className={classes.SubmitBtn}>
          <ButtonFunc btnColor={props.btnColor} function={loginHandler}>
            ENTRAR
          </ButtonFunc>
        </div>
      </div>
      <br />
      <br />
      {errMessageAux}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userIsLogged: state.login.isLogged,
    errMessage: state.login.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (email, senha) => dispatch(actionTypes.login(email, senha)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FaleConosco);
