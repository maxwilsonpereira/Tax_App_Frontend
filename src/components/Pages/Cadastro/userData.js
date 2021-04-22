import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionsIndex';
import classes from './styles.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonFunc from '../../UI/Buttons/ButtonFunc';

import serverURL from '../../../serverURL';

function Cadastro(props) {
  const [name, setName] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [telephone, setTelephone] = useState('Telefone');
  const [errMessageAux, setErrMessageAux] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrMessageAux(null);
    }, 6000);
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

  useEffect(() => {
    setName(props.username);
    setEmailCadastro(props.userEmail);
    setTelephone(props.userPhone);
  }, [props.userIsLogged, props.username, props.userEmail, props.userPhone]);

  // if (name === "") {
  //   setName("Nome");
  // }
  // if (emailCadastro === "") {
  //   setEmailCadastro("E-mail");
  // }
  // if (telephone === "") {
  //   setTelephone("Telefone");
  // }

  function enterKeyPressedHandler(event) {
    // event.preventDefault();
    var code = event.keyCode || event.which;
    if (code === 13) {
      // alert("ENTER KEY PRESSED!");
      cadastrarHandler(event);
    }
  }

  function cadastrarHandler(e) {
    e.preventDefault();
    // VALIDATION:
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!pattern.test(emailCadastro)) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Favor preencher os campos corretamente!
        </div>
      );
      return;
    } else if (
      name === 'Nome' ||
      emailCadastro === 'E-mail' ||
      telephone === 'Telefone'
    ) {
      // alert(props.children);
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Favor preencher os campos corretamente!
        </div>
      );
      return;
    } else if (name.length < 3) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Mínimo 3 caracteres para nome!
        </div>
      );
      return;
    } else if (
      name.length > 40 ||
      emailCadastro.length > 40 ||
      telephone.length > 40
    ) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Máximo 40 caracteres por campo!
        </div>
      );
      return;
    } else if (
      name === props.username &&
      emailCadastro === props.userEmail &&
      telephone === props.userPhone
    ) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Nenhuma mudança foi efetuada!
        </div>
      );
      return;
    } else {
      // UPDATING USER'S DATA:
      setIsLoading(true);
      fetch(`${serverURL}/users/` + props.userId, {
        method: 'PUT',
        headers: {
          //   // "Bearer " is a convention of Authentication Token:
          // Authorization: "Bearer " + this.props.token,
          // application/json WHEN YOU USE ONLY TEXT!
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: emailCadastro,
          telephone: telephone,
        }),
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            setErrMessageAux(
              <div className={classes.ErrorMessage}>
                Favor tentar mais tarde!
              </div>
            );
            setIsLoading(false);
            return;
          }
          return res.json();
        })
        .then((resData) => {
          setIsLoading(false);
          setErrMessageAux(
            <div className={classes.ErrorMessage}>Informações atualizadas!</div>
          );
          props.onUpdate(
            resData.user.name,
            resData.user.email,
            resData.user.telephone
          );
        })
        .catch((err) => {
          setIsLoading(false);
          setErrMessageAux(
            <div className={classes.ErrorMessage}>Erro de conexão!</div>
          );
        });
    }
  }

  function alterarInfosToggle(e) {
    e.preventDefault();
    props.alterarInfosToggleFunc();
  }

  return (
    <div className={classes.CadastroStyle}>
      <div>
        <div className={classes[props.showTitle]}>
          <h1>{props.title}</h1>
          <br />
        </div>
        <input
          className={classes.BoldFont}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={enterKeyPressedHandler}
          disabled
          type="text"
          required
          placeholder="Nome"
          name={name}
          value={name}
        />
        <br />
        <input
          className={classes.BoldFont}
          onChange={(e) => setEmailCadastro(e.target.value)}
          onKeyPress={enterKeyPressedHandler}
          disabled
          type="email"
          required
          placeholder="E-mail"
          name={emailCadastro}
          value={emailCadastro}
        />
        <br />
        <input
          className={classes.BoldFont}
          onChange={(e) => setTelephone(e.target.value)}
          onKeyPress={enterKeyPressedHandler}
          disabled
          type="number"
          required
          placeholder="Telefone"
          name={telephone}
          value={telephone}
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
              <ButtonFunc btnColor="BlueBtn" function={alterarInfosToggle}>
                {/* Alterar Informações */}
                {props.children}
              </ButtonFunc>
            </>
          )}
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
    // errMessage: state.login.errorMessage,
    username: state.login.username,
    userEmail: state.login.userEmail,
    userPhone: state.login.userPhone,
    userId: state.login.idCurrentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (email, senha) => dispatch(actionTypes.login(email, senha)),
    onUpdate: (email, name, telephone) =>
      dispatch(actionTypes.update(email, name, telephone)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);
