import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionsIndex';
import classes from './styles.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonFunc from '../../UI/Buttons/ButtonFunc';

function FaleConosco(props) {
  const [email, setEmail] = useState('E-mail');
  const [senha, setSenha] = useState('Senha');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.messageLogin.length > 1) {
      setIsLoading(false);
    }
  }, [props.messageLogin]);

  if (email === '') {
    setEmail('E-mail');
  }
  if (senha === '') {
    setSenha('Senha');
  }

  function loginHandler(e) {
    e.preventDefault();
    props.onSetMessageLogin('');
    // VALIDATION:
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!pattern.test(email)) {
      props.onSetMessageLogin('Favor preencher os campos corretamente!');
    } else {
      setIsLoading(true);
      props.onLogIn(email, senha);
    }
  }

  function enterKeyPressedHandler(event) {
    // event.preventDefault();
    var code = event.keyCode || event.which;
    if (code === 13) {
      loginHandler(event);
    }
  }

  return (
    <div className={classes.LoginStyle}>
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
        {isLoading ? (
          <div className={classes.progressCircle}>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <>
            <ButtonFunc btnColor={props.btnColor} function={loginHandler}>
              Entrar
            </ButtonFunc>
          </>
        )}
      </div>
      <div className={classes.ErrorMessage}>{props.messageLogin}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userIsLogged: state.login.isLogged,
    messageLogin: state.login.messageLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (email, senha) => dispatch(actionTypes.login(email, senha)),
    onSetMessageLogin: (message) =>
      dispatch(actionTypes.setMessageLogin(message)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FaleConosco);
