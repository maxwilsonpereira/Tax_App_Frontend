import React, { useState, useEffect } from "react";

import * as actionTypes from "../../../store/actions/actionsIndex";
import { connect } from "react-redux";
// import * as actionTypes from "../../../store/actions/actionsIndex";

import classes from "./Cadastro.module.css";
import ButtonFunc from "../../UI/Buttons/ButtonFunc";

function Cadastro(props) {
  const [name, setName] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [telephone, setTelephone] = useState("Telefone");
  const [senhaCadastro, setSenhaCadastro] = useState("Senha");
  const [senhaConfirma, setSenhaConfirma] = useState("Confirmar Senha");
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

  useEffect(() => {
    if (props.userIsLogged === "true") {
      setName(props.userName);
      setEmailCadastro(props.userEmail);
      setTelephone(props.userPhone);
    }
  }, [props.userName, props.userEmail, props.userPhone]);

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
    } else if (
      props.children === "CADASTRAR" &&
      (name === "Nome" ||
        emailCadastro === "E-mail" ||
        telephone === "Telefone" ||
        senhaCadastro === "Senha" ||
        senhaConfirma === "Confirmar Senha")
    ) {
      // alert(props.children);
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Favor preencher os campos corretamente!
        </div>
      );
    } else if (
      (props.children === "ALTERAR" && name === "Nome") ||
      emailCadastro === "E-mail" ||
      telephone === "Telefone"
    ) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Favor preencher os campos corretamente!
        </div>
      );
    } else if (name.length < 3) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Mínimo 3 caracteres para nome!
        </div>
      );
    } else if (senhaCadastro.length < 5) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Mínimo 5 caracteres para senha!
        </div>
      );
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
    } else if (
      props.children === "CADASTRAR" &&
      senhaCadastro !== senhaConfirma
    ) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          As senhas não são compatíves!
        </div>
      );
    } else if (props.children === "CADASTRAR") {
      // CADASTRAR USUÁRIO:
      fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
            setErrMessageAux(
              <div className={classes.ErrorMessage}>Email já cadastrado!</div>
            );
            throw new Error("Email já cadastrado!");
          } else if (res.status === 400) {
            setErrMessageAux(
              <div className={classes.ErrorMessage}>
                Máximo 40 caracteres por campo!
              </div>
            );
            throw new Error("Falha! Favor entrar em contato!");
          } else if (res.status !== 200 && res.status !== 201) {
            setErrMessageAux(
              <div className={classes.ErrorMessage}>
                Falha no cadastro! Favor entrar em contato!
              </div>
            );
            throw new Error("Falha! Favor entrar em contato!");
          }
          return res.json();
        })
        .then((resData) => {
          // console.log(resData);
          props.onLogIn(emailCadastro, senhaCadastro);
        })
        .catch((err) => {
          console.log(err);
          // setErrMessageAux(<div className={classes.ErrorMessage}>ERRO</div>);
        });
    } else if (
      // props.children === "ALTERAR" &&
      name === props.userName &&
      emailCadastro === props.userEmail &&
      telephone === props.userPhone
    ) {
      setErrMessageAux(
        <div className={classes.ErrorMessage}>
          Nenhuma mudança foi efetuada!
        </div>
      );
    } else {
      // ALTERAR USUÁRIO:
      fetch("http://localhost:8080/users/" + props.userId, {
        method: "PUT",
        headers: {
          //   // "Bearer " is a convention of Authentication Token:
          //   Authorization: "Bearer " + this.props.token,
          // application/json WHEN YOU USE ONLY TEXT!
          "Content-Type": "application/json",
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
            return;
          }
          return res.json();
        })
        .then((resData) => {
          setErrMessageAux(
            <div className={classes.ErrorMessage}>Informações atualizadas!</div>
          );
          props.alterarInfosToggleFunc();
          props.onUpdate(
            resData.user.email,
            resData.user.name,
            resData.user.telephone
          );
        })
        .catch((err) => {
          setErrMessageAux(
            <div className={classes.ErrorMessage}>Erro de conexão!</div>
          );
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
        <br />
        <br />
        <div className={classes.SubmitBtn}>
          <ButtonFunc btnColor="BlueBtn" function={cadastrarHandler}>
            {props.children}
          </ButtonFunc>
          <span
            className={[
              classes.MarginLeft10,
              classes[props.dontShowCancelBtn],
            ].join(" ")}
          >
            <ButtonFunc btnColor="OrangeBtn" function={cancelarHandler}>
              Cancelar
            </ButtonFunc>
          </span>
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
    userName: state.login.nameCurrentUser,
    userEmail: state.login.emailCurrentUser,
    userPhone: state.login.phoneCurrentUser,
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
