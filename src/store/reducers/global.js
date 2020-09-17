import * as actionTypes from "../actions/actionsTypes";

// isLogged is a GLOBAL STATE:
const initialState = {
  toggleSideDrawer: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEDRAWER:
      return {
        ...state,
        toggleSideDrawer: !state.toggleSideDrawer,
      };
    case actionTypes.HIDE_SIDEDRAWER:
      return {
        ...state,
        toggleSideDrawer: false,
      };
    default:
      return state;
  }
};

export default reducer;
