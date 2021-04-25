import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionsIndex';
import classes from './styles.module.scss';
import ButtonFunc from '../../UI/Buttons/ButtonFunc';
import CircularProgress from '@material-ui/core/CircularProgress';
import serverURL from '../../../serverURL';

function SenhaAlterar(props) {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [senhaNova, setSenhaNova] = useState('');
  const [senhaNovaConfirma, setSenhaNovaConfirma] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // if (senhaAtual === "") {
  //   setSehaAtual("Senha Atual");
  // }
  // if (senhaNova === "") {
  //   setSenhaNova("Senha Nova");
  // }
  // if (senhaNovaConfirma === "") {
  //   setSenhaNovaConfirma("Confirmar Senha Nova");
  // }

  function changePassHandler(e) {
    // CONFERIR SE SENHA NOVA: COM O BACKEND! Onde colocar? 21/03/2021
    // FRONTEND VALIDATION:
    e.preventDefault();
    props.onEraseAllMessages();
    if (senhaNova.length < 5 || senhaNovaConfirma.length < 5) {
      props.onSetMessageLogin('Mínimo 5 caracteres para senha!');
      return;
    }
    if (senhaNova !== senhaNovaConfirma) {
      props.onSetMessageLogin('As senhas não são compatíves!');
      return;
    }
    if (senhaNova === senhaAtual) {
      props.onSetMessageLogin('As senhas são idénticas!');
      return;
    }
    // UPDATING PASSWORD:
    setIsLoading(true);
    fetch(`${serverURL}/users/password/` + props.userId, {
      method: 'PUT',
      headers: {
        // "Bearer " is a convention of Authentication Token:
        // Authorization: "Bearer " + this.props.token,
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        password: senhaAtual,
        passwordNew: senhaNova,
      }),
    })
      .then((res) => {
        console.log('RES: ', res);
        if (res.status === 200) {
          // newPassSuccess is a function on <SenhaAlterar /> that
          // closes the inputs and set message to user:
          props.newPassSuccess();
          setSenhaNova('');
          setSenhaNovaConfirma('');
          setIsLoading(false);
          return;
        } else if (res.status === 404) {
          props.onSetMessageLogin('Usuário não encontrado!');
          setSenhaNova('');
          setSenhaNovaConfirma('');
          setIsLoading(false);
          return;
        } else if (res.status === 403) {
          props.onSetMessageLogin('A senha não confere!');
          setSenhaNova('');
          setSenhaNovaConfirma('');
          setIsLoading(false);
          return;
        } else {
          props.onSetMessageLogin('Erro de conexão. Favor entrar em contato.');
          setIsLoading(false);
          return;
        }
      })
      .catch((err) => {
        props.onSetMessageLogin('Erro de conexão. Favor entrar em contato.');
        setSenhaAtual('');
        setSenhaNova('');
        setSenhaNovaConfirma('');
        setIsLoading(false);
      });
  }

  return (
    <div className={classes.LoginStyle}>
      {/* <div className={classes[props.showTitle]}>
        <h1>Alterar Senha</h1>
      </div> */}
      <input
        onChange={(e) => setSenhaAtual(e.target.value)}
        type="password"
        required
        placeholder="Senha Atual"
        value={senhaAtual}
        name={senhaAtual}
      />
      <br />
      <input
        onChange={(e) => setSenhaNova(e.target.value)}
        type="password"
        required
        placeholder="Senha Nova"
        value={senhaNova}
        name={senhaNova}
      />
      <br />
      <input
        onChange={(e) => setSenhaNovaConfirma(e.target.value)}
        type="password"
        required
        placeholder="Confirmar Senha Nova"
        value={senhaNovaConfirma}
        name={senhaNovaConfirma}
      />
      <br />
      <div className={classes.SubmitBtn}>
        {isLoading ? (
          <div className={classes.progressCircle}>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <div className={classes.flexBtns}>
            <ButtonFunc btnColor="BtnGreen" function={changePassHandler}>
              Alterar
            </ButtonFunc>
            <div className={classes.btnTwo}>
              <ButtonFunc btnColor="BlueBtn" function={props.cancelar}>
                Cancelar
              </ButtonFunc>
            </div>
          </div>
        )}
      </div>
      <div className={classes.MessageToUser}>{props.messageLogin}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.login.userId,
    messageLogin: state.login.messageLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMessageLogin: (message) =>
      dispatch(actionTypes.setMessageLogin(message)),
    onEraseAllMessages: (message) =>
      dispatch(actionTypes.eraseAllMessages(message)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SenhaAlterar);
