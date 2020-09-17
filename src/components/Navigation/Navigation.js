import React from "react";
// npm i react-redux
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions/actionsIndex";

import logo from "../../assets/logomarca.png";
import classes from "./Navigation.module.css";
import NavigationItems from "./NavigationItems";
import SideDrawer from "./SideDrawer/SideDrawer";
// npm i react-icons
// https://react-icons.github.io/react-icons/
import { FaBars } from "react-icons/fa";

function Navigation(props) {
  let showSideNav = "";

  function toggleHandle() {
    props.onToggleSideDrawer();
  }
  function logOutUserHandler() {
    props.onLogOut();
  }
  function logOutUserToggleHandler() {
    props.onLogOut();
    props.onToggleSideDrawer();
  }

  if (props.toggleSideDrawer) {
    showSideNav = (
      <>
        <SideDrawer
          toggle={toggleHandle}
          logOutUser={logOutUserToggleHandler}
        />
      </>
    );
  }
  return (
    <>
      <div className={classes.NavMobile}>{showSideNav}</div>
      <div className={classes.AppContainer}>
        <div className={classes.FlexboxNavigation}>
          <div className={classes.FlexChild}>
            <img className={classes.LogoImg} src={logo} alt="" />
            {/* NEXT IS THE SIDE BARS FOR MOBILE: */}
            <FaBars onClick={toggleHandle} className={classes.Bars} size={35} />
          </div>
          <div className={classes.FlexChild}>
            <ul className={classes.NavigationItems}>
              <NavigationItems
                logOutUser={logOutUserHandler}
                classProps="active"
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    toggleSideDrawer: state.global.toggleSideDrawer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(actionTypes.logout()),
    onToggleSideDrawer: () => dispatch(actionTypes.toggleSideDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
