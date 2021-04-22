import * as actionTypes from '../actions/actionsTypes';

// isLogged is a GLOBAL STATE:
const initialState = {
  isLogged: localStorage.getItem('userIsLogged'),
  userId: localStorage.getItem('userId'),
  username: localStorage.getItem('username'),
  userEmail: localStorage.getItem('userEmail'),
  userPhone: localStorage.getItem('userPhone'),
  errorMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      // If ID and Password are good:
      if (action.validLogin) {
        localStorage.setItem('userIsLogged', 'true');
        localStorage.setItem('userId', action.id);
        localStorage.setItem('username', action.name);
        localStorage.setItem('userEmail', action.email);
        localStorage.setItem('userPhone', action.telephone);
        localStorage.setItem('token', action.token);

        return {
          ...state,
          isLogged: 'true',
          userId: action.id,
          username: action.name,
          userEmail: action.email,
          userPhone: action.telephone,
          token: action.token,
          errorMessage: 'Logado',
        };
      } else {
        return {
          ...state,
          isLogged: false,
          errorMessage: action.errMessage,
        };
      }
    case actionTypes.UPDATE:
      localStorage.setItem('username', action.name);
      localStorage.setItem('username', action.email);
      localStorage.setItem('userPhone', action.telephone);
      return {
        ...state,
        username: action.name,
        userEmail: action.email,
        userPhone: action.telephone,
      };
    case actionTypes.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isLogged: 'false',
        errorMessage: null,
        username: null,
        userEmail: null,
        userPhone: null,
      };
    case actionTypes.ERR_MESSAGE_ERASER:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default reducer;
