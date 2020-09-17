import * as actionTypes from "./actionsTypes";

export const toggleSideDrawer = () => {
  return {
    type: actionTypes.TOGGLE_SIDEDRAWER,
  };
};

export const hideSideDrawer = () => {
  return {
    type: actionTypes.HIDE_SIDEDRAWER,
  };
};
