import axios from 'axios';
import * as actionTypes from './actionsTypes';
import serverURL from '../../serverURL';

export const login = (email, password) => async (dispatch) => {
  // Erasing last message:
  let message = 'Loggin in';
  const body = { email: email, password: password };
  let loginSucceed = false;
  console.log('body: ', body);

  try {
    const response = await axios.post(`${serverURL}/users/login`, body);
    loginSucceed = true;
    dispatch(
      loginExec(
        loginSucceed,
        message,
        email,
        response.data.name,
        response.data.telephone,
        response.data.id,
        response.data.token
      )
    );
  } catch (err) {
    console.log('IM HERE ERR: err: ', err);
    if (err.response) {
      switch (err.response.status) {
        case 404:
          message = 'Email Não Cadastrado!';
          break;
        case 401:
          message = 'Senha Incorreta!';
          break;
        default:
          message = 'Erro de Conexão. Favor entrar em contato.';
          break;
      }
    } else {
      message = 'Erro de Conexão. Favor entrar em contato.';
    }
    dispatch(loginExec(loginSucceed, message));
  }
};

export const loginExec = (
  loginSucceed,
  message,
  email,
  name,
  telephone,
  id,
  token
) => {
  if (loginSucceed) {
    return {
      type: actionTypes.LOGIN,
      validLogin: true,
      email: email,
      name: name,
      telephone: telephone,
      id: id,
      token: token,
      message: message,
    };
  } else {
    return {
      type: actionTypes.LOGIN,
      validLogin: false,
      message: message,
    };
  }
};

export const update = (email, name, telephone) => {
  return {
    type: actionTypes.UPDATE,
    email: email,
    name: name,
    telephone: telephone,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const setMessageLogin = (message) => {
  return {
    type: actionTypes.SET_MESSAGE_LOGIN,
    message: message,
  };
};
export const setMessageAreaCliente = (message) => {
  return {
    type: actionTypes.SET_MESSAGE_AREA_CLIENTE,
    message: message,
  };
};
export const setMessageCadastro = (message) => {
  return {
    type: actionTypes.SET_MESSAGE_CADASTRO,
    message: message,
  };
};
export const eraseAllMessages = () => {
  return {
    type: actionTypes.ERASE_ALL_MESSAGES,
  };
};
