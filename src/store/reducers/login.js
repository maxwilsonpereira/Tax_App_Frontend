import * as actionTypes from '../actions/actionsTypes';

// isLogged is a GLOBAL STATE:
const initialState = {
  isLogged: localStorage.getItem('userIsLogged'),
  userId: localStorage.getItem('userId'),
  username: localStorage.getItem('username'),
  userEmail: localStorage.getItem('userEmail'),
  userPhone: localStorage.getItem('userPhone'),
  messageLogin: '',
  messageAreaCliente: '',
  messageCadastro: '',
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
          messageLogin: '',
          messageAreaCliente: '',
          messageCadastro: '',
        };
      } else {
        return {
          ...state,
          isLogged: false,
          messageLogin: action.message,
          messageAreaCliente: '',
          messageCadastro: '',
        };
      }
    case actionTypes.UPDATE:
      localStorage.setItem('username', action.name);
      localStorage.setItem('userEmail', action.email);
      localStorage.setItem('userPhone', action.telephone);
      return {
        ...state,
        username: action.name,
        userEmail: action.email,
        userPhone: action.telephone,
        messageAreaCliente: '',
        messageLogin: '',
        messageCadastro: 'Informações atualizadas!',
      };
    case actionTypes.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isLogged: 'false',
        username: '',
        userEmail: '',
        userPhone: '',
      };
    case actionTypes.SET_MESSAGE_LOGIN:
      return {
        ...state,
        messageAreaCliente: '',
        messageCadastro: '',
        messageLogin: action.message,
      };
    case actionTypes.SET_MESSAGE_AREA_CLIENTE:
      return {
        ...state,
        messageCadastro: '',
        messageLogin: '',
        messageAreaCliente: action.message,
      };
    case actionTypes.SET_MESSAGE_CADASTRO:
      return {
        ...state,
        messageAreaCliente: '',
        messageLogin: '',
        messageCadastro: action.message,
      };
    case actionTypes.ERASE_ALL_MESSAGES:
      return {
        ...state,
        messageAreaCliente: '',
        messageLogin: '',
        messageCadastro: '',
      };
    default:
      return state;
  }
};

export default reducer;
