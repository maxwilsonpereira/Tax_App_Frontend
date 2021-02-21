import * as actionTypes from "./actionsTypes";

import serverURL from "../../serverURL";

export const login = (email, password) => {
  // alert(serverURL);
  return (dispatch) => {
    fetch(`${serverURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 404) {
          dispatch(loginExec("false", password, "name", "telephone", "id"));
          setTimeout(() => {
            dispatch(errorMessageEraser());
          }, 3000);
        } else if (res.status === 401) {
          dispatch(loginExec(email, "false", "name", "telephone", "id"));
          setTimeout(() => {
            dispatch(errorMessageEraser());
          }, 3000);
        } else if (res.status !== 200 && res.status !== 201) {
          dispatch(loginExec(email, "error", "name", "telephone", "id"));
          setTimeout(() => {
            dispatch(errorMessageEraser());
          }, 3000);
        } else {
          return res.json().then((resData) => {
            // console.log(resData.name, resData.email, resData.telephone);
            dispatch(
              loginExec(
                email,
                password,
                resData.name,
                resData.telephone,
                resData.id,
                resData.token
              )
            );
            setTimeout(() => {
              dispatch(errorMessageEraser());
            }, 3000);
          });
        }
      })
      .catch((err) => {
        dispatch(loginExec(email, "error", "name", "telephone", "id"));
        setTimeout(() => {
          dispatch(errorMessageEraser());
        }, 3000);
      });
  };
};

export const loginExec = (email, password, name, telephone, id, token) => {
  if (email === "false") {
    return {
      type: actionTypes.LOGIN,
      validLogin: false,
      errMessage: "Email Não Cadastrado!",
    };
  } else if (password === "false") {
    return {
      type: actionTypes.LOGIN,
      validLogin: false,
      errMessage: "Senha Incorreta!",
    };
  } else if (password === "error") {
    return {
      type: actionTypes.LOGIN,
      validLogin: false,
      errMessage: "Erro de Conexão. Favor entrar em contato.",
    };
  } else {
    return {
      type: actionTypes.LOGIN,
      validLogin: true,
      email: email,
      name: name,
      telephone: telephone,
      id: id,
      token: token,
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
