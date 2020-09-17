import * as actionTypes from "../actions/actionsTypes";

// isLogged is a GLOBAL STATE:
const initialState = {
  isLogged: localStorage.getItem("userIsLogged"),
  errorMessage: null,
  nameCurrentUser: localStorage.getItem("currentUsername"),
  emailCurrentUser: localStorage.getItem("currentUserEmail"),
  phoneCurrentUser: localStorage.getItem("currentUserPhone"),
  idCurrentUser: localStorage.getItem("currentUserId"),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      // If ID and Password are good:
      if (action.validLogin) {
        localStorage.setItem("userIsLogged", "true");
        localStorage.setItem("currentUsername", action.name);
        localStorage.setItem("currentUserEmail", action.email);
        localStorage.setItem("currentUserPhone", action.telephone);
        localStorage.setItem("currentUserId", action.id);
        localStorage.setItem("token", action.token);

        return {
          ...state,
          isLogged: "true",
          errorMessage: null,
          nameCurrentUser: action.name,
          emailCurrentUser: action.email,
          phoneCurrentUser: action.telephone,
          userId: action.id,
          token: action.token,
        };
      } else {
        return {
          ...state,
          isLogged: false,
          errorMessage: action.errMessage,
        };
      }
    case actionTypes.UPDATE:
      localStorage.setItem("currentUsername", action.name);
      localStorage.setItem("currentUserEmail", action.email);
      localStorage.setItem("currentUserPhone", action.telephone);
      return {
        ...state,
        nameCurrentUser: action.name,
        emailCurrentUser: action.email,
        phoneCurrentUser: action.telephone,
      };
    case actionTypes.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isLogged: "false",
        errorMessage: null,
        nameCurrentUser: null,
        emailCurrentUser: null,
        phoneCurrentUser: null,
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
