import axios from 'axios';
import * as actionTypes from './actionsTypes';
import serverURL from '../../serverURL';

export const login = (email, password) => async (dispatch) => {
  const body = { email: email, password: password };
  let message = '';
  let loginSucceed = false;
  try {
    const response = await axios.post(`${serverURL}/users/login`, body);
    console.log('response.data: ', response.data);
    loginSucceed = true;
    message = 'Loggin in';
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
  setTimeout(() => {
    dispatch(errorMessageEraser());
  }, 8000);
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
    };
  } else {
    return {
      type: actionTypes.LOGIN,
      validLogin: false,
      errMessage: message,
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

export const errorMessageEraser = () => {
  return {
    type: actionTypes.ERR_MESSAGE_ERASER,
  };
};
