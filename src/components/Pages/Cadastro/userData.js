import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './styles.module.scss';
import ButtonFunc from '../../UI/Buttons/ButtonFunc';

function Cadastro(props) {
  const [name, setName] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [telephone, setTelephone] = useState('Telefone');

  useEffect(() => {
    setName(props.username);
    setEmailCadastro(props.userEmail);
    setTelephone(props.userPhone);
  }, [props.userIsLogged, props.username, props.userEmail, props.userPhone]);

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
          <ButtonFunc btnColor="BlueBtn" function={alterarInfosToggle}>
            {/* Alterar Informações */}
            {props.children}
          </ButtonFunc>
        </div>
      </div>
      <div className={classes.ErrorMessage}>{props.messageCadastro}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userIsLogged: state.login.isLogged,
    username: state.login.username,
    userEmail: state.login.userEmail,
    userPhone: state.login.userPhone,
    userId: state.login.idCurrentUser,
    messageCadastro: state.login.messageCadastro,
  };
};

export default connect(mapStateToProps)(Cadastro);
