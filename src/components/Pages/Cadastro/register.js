import React, { useState, useEffect } from 'react';
import * as actionTypes from '../../../store/actions/actionsIndex';
import { connect } from 'react-redux';
import classes from './styles.module.scss';
import ButtonFunc from '../../UI/Buttons/ButtonFunc';
import CircularProgress from '@material-ui/core/CircularProgress';
import serverURL from '../../../serverURL';

function Cadastro(props) {
  const [name, setName] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [telephone, setTelephone] = useState('Telefone');
  const [senhaCadastro, setSenhaCadastro] = useState('Senha');
  const [senhaConfirma, setSenhaConfirma] = useState('Confirmar Senha');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.userIsLogged === 'true') {
      setName(props.username);
      setEmailCadastro(props.userEmail);
      setTelephone(props.userPhone);
    }
  }, [props.userIsLogged, props.username, props.userEmail, props.userPhone]);

  function enterKeyPressedHandler(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      cadastrarHandler(event);
    }
  }

  function cancelarHandler(e) {
    e.preventDefault();
    props.alterarInfosToggleFunc();
  }

  function cadastrarHandler(e) {
    e.preventDefault();
    props.onEraseAllMessages();
    // VALIDATION:
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!pattern.test(emailCadastro)) {
      props.onSetMessageCadastro('Favor preencher os campos corretamente!');
      return;
    } else if (
      props.children === 'Cadastrar' &&
      (name === 'Nome' ||
        emailCadastro === 'E-mail' ||
        telephone === 'Telefone' ||
        senhaCadastro === 'Senha' ||
        senhaConfirma === 'Confirmar Senha')
    ) {
      props.onSetMessageCadastro('Favor preencher os campos corretamente!');
      return;
    } else if (
      (props.children === 'Alterar' && name === 'Nome') ||
      emailCadastro === 'E-mail' ||
      telephone === 'Telefone'
    ) {
      props.onSetMessageCadastro('Favor preencher os campos corretamente!');

      return;
    } else if (name.length < 3) {
      props.onSetMessageCadastro('Mínimo 3 caracteres para nome!');

      return;
    } else if (senhaCadastro.length < 5) {
      props.onSetMessageCadastro('Mínimo 5 caracteres para senha!');
      return;
    } else if (
      name.length > 40 ||
      emailCadastro.length > 40 ||
      telephone.length > 40 ||
      senhaCadastro.length > 40 ||
      senhaConfirma.length > 40
    ) {
      props.onSetMessageCadastro('Máximo 40 caracteres por campo!');
      return;
    } else if (
      props.children === 'Cadastrar' &&
      senhaCadastro !== senhaConfirma
    ) {
      props.onSetMessageCadastro('As senhas não são compatíves!');

      return;
    } else if (props.children === 'Cadastrar') {
      setIsLoading(true);
      // ********** CADASTRAR USUÁRIO:
      fetch(`${serverURL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: emailCadastro,
          telephone: telephone,
          password: senhaCadastro,
        }),
      })
        .then(async (res) => {
          if (res.status === 201) {
            // receiving the response you coded from the backend
            const responseFromBackend = await res.json();
            console.log('responseFromBackend: ', responseFromBackend);
            props.onLogIn(emailCadastro, senhaCadastro);
          } else if (res.status === 409) {
            setIsLoading(false);
            props.onSetMessageCadastro('Email já cadastrado!');
            return;
          } else {
            setIsLoading(false);
            props.onSetMessageCadastro(
              'Falha no cadastro! Favor entrar em contato!'
            );
            return;
          }
        })
        .catch((err) => {
          // console.log(err);
          setIsLoading(false);
          props.onSetMessageCadastro(
            'Falha no cadastro! Favor entrar em contato!'
          );
        });
    } else if (
      // ********** UPDATE USER INFOS
      name === props.username &&
      emailCadastro === props.userEmail &&
      telephone === props.userPhone
    ) {
      props.onSetMessageCadastro('Nenhuma mudança foi efetuada!');
      return;
    } else {
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
          console.log('res: ', res);
          if (res.status === 409) {
            setIsLoading(false);
            props.onSetMessageCadastro('Email já cadastrado!');
            return;
          } else if (res.status !== 200 && res.status !== 201) {
            setIsLoading(false);
            props.onSetMessageCadastro('Favor tentar mais tarde!');
            return;
          } else {
            return res.json().then((resData) => {
              console.log('resData: ', resData);
              props.alterarInfosToggleFunc();
              // userUpdated is the updated user you are sending from the backend:
              props.onUpdate(
                resData.userUpdated.email,
                resData.userUpdated.name,
                resData.userUpdated.telephone
              );
              props.onSetMessageCadastro('Informações atualizadas!');
              setIsLoading(false);
              return;
            });
          }
        })
        .catch((err) => {
          if (err.status === 409) {
            setIsLoading(false);
            props.onSetMessageCadastro('Email já cadastrado!');

            return;
          } else {
            setIsLoading(false);
            props.onSetMessageCadastro('Favor tentar mais tarde!');
            return;
          }
        });
    }
  }

  return (
    <div className={classes.CadastroStyle}>
      <div>
        <div className={classes[props.showTitle]}>
          <h1>{props.title}</h1>
          <br />
        </div>
        <input
          onChange={(e) => setName(e.target.value)}
          onKeyPress={enterKeyPressedHandler}
          type="text"
          required
          placeholder="Nome"
          name={name}
          value={name}
        />
        <br />
        <input
          onChange={(e) => setEmailCadastro(e.target.value)}
          onKeyPress={enterKeyPressedHandler}
          type="email"
          required
          placeholder="E-mail"
          name={emailCadastro}
          value={emailCadastro}
        />
        <br />
        <input
          onChange={(e) => setTelephone(e.target.value)}
          onKeyPress={enterKeyPressedHandler}
          type="number"
          required
          placeholder="Telefone"
          name={telephone}
          value={telephone}
        />
        <br />
        <input
          className={classes[props.dontShowPasswordInputs]}
          onChange={(e) => setSenhaCadastro(e.target.value)}
          onKeyPress={enterKeyPressedHandler}
          type="password"
          required
          placeholder="Senha"
          // value={senhaCadastro}
          name={senhaCadastro}
        />
        <br />
        <input
          className={classes[props.dontShowPasswordInputs]}
          onChange={(e) => setSenhaConfirma(e.target.value)}
          onKeyPress={enterKeyPressedHandler}
          type="password"
          required
          placeholder="Confirmar Senha"
          // value={senhaConfirma}
          name={senhaConfirma}
        />

        {isLoading ? (
          <div className={classes.progressCircle}>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <div className={classes.btnsContainer}>
            {/* <div className={classes.btnOne}> */}
            <ButtonFunc btnColor="BtnGreen" function={cadastrarHandler}>
              {props.children}
            </ButtonFunc>
            {/* </div> */}
            <div
              className={[
                classes.MarginLeft10,
                classes.btnTwo,
                classes[props.dontShowCancelBtn],
              ].join(' ')}
            >
              <ButtonFunc btnColor="BlueBtn" function={cancelarHandler}>
                Cancelar
              </ButtonFunc>
            </div>
          </div>
        )}
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
    userId: state.login.userId,
    messageCadastro: state.login.messageCadastro,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (email, senha) => dispatch(actionTypes.login(email, senha)),
    onUpdate: (email, name, telephone) =>
      dispatch(actionTypes.update(email, name, telephone)),
    onSetMessageCadastro: (message) =>
      dispatch(actionTypes.setMessageCadastro(message)),
    onEraseAllMessages: (message) =>
      dispatch(actionTypes.eraseAllMessages(message)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);
