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
    if (props.userIsLogged === 'true') {
      setName(props.username);
      setEmailCadastro(props.userEmail);
      setTelephone(props.userPhone);
    }
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
  // if (senhaCadastro === "") {
  //   setSenhaCadastro("Senha");
  // }
  // if (senhaConfirma === "") {
  //   setSenhaConfirma("Confirmar Senha");
  // }

  function enterKeyPressedHandler(event) {
    // event.preventDefault();
    var code = event.keyCode || event.which;
    if (code === 13) {
      // alert("ENTER KEY PRESSED!");
      cadastrarHandler(event);
    }
  }

  function cancelarHandler(e) {
    props.alterarInfosToggleFunc();
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
      props.children === 'CADASTRAR' &&
      (name === 'Nome' ||
        emailCadastro === 'E-mail' ||
        telephone === 'Telefone' ||
        senhaCadastro === 'Senha' ||
        senhaConfirma === 'Confirmar Senha')
    ) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Favor preencher os campos corretamente!
        </div>
      );
      return;
    } else if (
      (props.children === 'ALTERAR' && name === 'Nome') ||
      emailCadastro === 'E-mail' ||
      telephone === 'Telefone'
    ) {
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
    } else if (senhaCadastro.length < 5) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Mínimo 5 caracteres para senha!
        </div>
      );
      return;
    } else if (
      name.length > 40 ||
      emailCadastro.length > 40 ||
      telephone.length > 40 ||
      senhaCadastro.length > 40 ||
      senhaConfirma.length > 40
    ) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Máximo 40 caracteres por campo!
        </div>
      );
      return;
    } else if (
      props.children === 'CADASTRAR' &&
      senhaCadastro !== senhaConfirma
    ) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          As senhas não são compatíves!
        </div>
      );
      return;
    } else if (props.children === 'CADASTRAR') {
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
        .then((res) => {
          if (res.status === 409) {
            setIsLoading(false);
            setErrMessageAux(
              <div className={classes.ErrorMessage}>Email já cadastrado!</div>
            );
            return;
          } else if (res.status !== 200 && res.status !== 201) {
            setIsLoading(false);
            setErrMessageAux(
              <div className={classes.ErrorMessage}>
                Falha no cadastro! Favor entrar em contato!
              </div>
            );
            return;
          }
          return res.json();
        })
        .then((resData) => {
          // receiving the response you coded from the backend
          console.log(resData);
          props.onLogIn(emailCadastro, senhaCadastro);
        })
        .catch((err) => {
          // console.log(err);
          setIsLoading(false);
          setErrMessageAux(
            <div className={classes.ErrorMessage}>
              Falha no cadastro! Favor entrar em contato!
            </div>
          );
        });
    } else if (
      // ********** UPDATE USER INFOS
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
            setErrMessageAux(
              <div className={classes.ErrorMessage}>Email já cadastrado!</div>
            );
            return;
          } else if (res.status !== 200 && res.status !== 201) {
            setIsLoading(false);
            setErrMessageAux(
              <div className={classes.ErrorMessage}>
                Favor tentar mais tarde!
              </div>
            );
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
              setErrMessageAux(
                <div className={classes.ErrorMessage}>
                  Informações atualizadas!
                </div>
              );
              setIsLoading(false);
              return;
            });
          }
        })
        .catch((err) => {
          if (err.status === 409) {
            setIsLoading(false);
            setErrMessageAux(
              <div className={classes.ErrorMessage}>Email já cadastrado!</div>
            );
            return;
          } else {
            setIsLoading(false);
            setErrMessageAux(
              <div className={classes.ErrorMessage}>
                Favor tentar mais tarde!
              </div>
            );
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
        <div className={classes.SubmitBtn}>
          {isLoading ? (
            <div className={classes.progressCircle}>
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <>
              <ButtonFunc btnColor="BlueBtn" function={cadastrarHandler}>
                {props.children}
              </ButtonFunc>
              <span
                className={[
                  classes.MarginLeft10,
                  classes[props.dontShowCancelBtn],
                ].join(' ')}
              >
                <ButtonFunc btnColor="OrangeBtn" function={cancelarHandler}>
                  Cancelar
                </ButtonFunc>
              </span>
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
    userId: state.login.userId,
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
