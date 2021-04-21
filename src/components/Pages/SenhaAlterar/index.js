import React, { useState, useEffect } from 'react';

import classes from './Style.module.css';
import ButtonFunc from '../../UI/Buttons/ButtonFunc';

import serverURL from '../../../serverURL';

export default function SenhaAlterar(props) {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [senhaNova, setSenhaNova] = useState('');
  const [senhaNovaConfirma, setSenhaNovaConfirma] = useState(
    'Confirmar Senha Nova'
  );
  const [messageToUser, setMessageToUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageToUser(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [messageToUser]);

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
    if (senhaNova.length < 5 || senhaNovaConfirma.length < 5) {
      setMessageToUser(
        <div className={classes.MessageToUser}>
          Mínimo 5 caracteres para senha!
        </div>
      );
      return;
    } else if (senhaNova !== senhaNovaConfirma) {
      setMessageToUser(
        <div className={classes.MessageToUser}>
          As senhas não são compatíves!
        </div>
      );
      return;
    }
    // CONFERINDO PASSWORD ATUAL:
    const userId = localStorage.getItem('currentUserId');
    fetch(`${serverURL}/users/password/` + userId, {
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
        // alert(res.status);
        if (res.status === 200) {
          // newPassSuccess is a function on <SenhaAlterar /> that
          // closes the inputs and set message to user:
          props.newPassSuccess();
          setSenhaNova('');
          setSenhaNovaConfirma('');
          return;
        } else if (res.status === 404) {
          setMessageToUser(
            <div className={classes.MessageToUser}>Usuário não encontrado!</div>
          );
          setSenhaNova('');
          setSenhaNovaConfirma('');
          return;
        } else if (res.status === 401) {
          setMessageToUser(
            <div className={classes.MessageToUser}>A senha não confere!</div>
          );
          setSenhaNova('');
          setSenhaNovaConfirma('');
          return;
        } else if (res.status !== 200 && res.status !== 201) {
          setMessageToUser(
            <div className={classes.MessageToUser}>
              Erro de conexão. Favor entrar em contato.
            </div>
          );
          return;
        }
        return res.json();
      })
      .catch((err) => {
        setMessageToUser(
          <div className={classes.MessageToUser}>
            Erro de conexão. Favor entrar em contato.
          </div>
        );
        setSenhaAtual('');
        setSenhaNova('');
        setSenhaNovaConfirma('');
      });
  }

  return (
    <div className={classes.LoginStyle}>
      <div className={classes[props.showTitle]}>
        {/* <h1>Alterar Senha</h1> */}
        <br />
      </div>
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
        // value={senhaNovaConfirma}
        name={senhaNovaConfirma}
      />
      <br />
      <div className={classes.SubmitBtn}>
        <ButtonFunc btnColor="BlueBtn" function={changePassHandler}>
          ALTERAR
        </ButtonFunc>
      </div>
      <br />
      {messageToUser}
    </div>
  );
}
