import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions/actionsIndex";

// import { NavLink } from "react-router-dom";
// npm i react-router-hash-link
import { NavHashLink as NavLink } from "react-router-hash-link";

import { FaUserAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import classes from "./Navigation.module.css";

function NavigationItems(props) {
  /******** LOG OUT HANLDLING ********/
  const [showLogOutIcon, setShowLogOutIcon] = useState(false);

  useEffect(() => {
    if (props.userIsLogged === "true") {
      setShowLogOutIcon(
        <>
          <li className={classes.NavigationItem}>
            <NavLink
              to="/login#start"
              activeClassName={classes[props.classProps]}
              // onClick is used on SideDrawer:
              onClick={props.toggle}
            >
              <FaUserAlt size={28} />
            </NavLink>
          </li>
          <li className={classes.NavigationItem}>
            <NavLink
              to="/logout"
              // activeClassName={classes[props.classProps]}
              onClick={props.logOutUser}
            >
              <h4
                className={[
                  classes.OlaUserMobile,
                  classes.DesktopDontShow,
                ].join(" ")}
              >
                LOG OUT
              </h4>
              <FaSignOutAlt size={28} />
            </NavLink>
          </li>
        </>
      );
    } else {
      setShowLogOutIcon(
        <li className={classes.NavigationItem}>
          <NavLink
            to="/login#start"
            activeClassName={classes[props.classProps]}
            onClick={props.toggle}
          >
            <FaUserAlt size={26} />
          </NavLink>
        </li>
      );
    }
  }, [props.userIsLogged]);
  /******** LOG OUT HANLDLING - END ********/

  return (
    <>
      <li className={classes.NavigationItem}>
        <NavLink
          to="/#start"
          exact
          activeClassName={classes[props.classProps]}
          // onClick is used on SideDrawer:
          onClick={props.toggle}
        >
          Home
        </NavLink>
      </li>
      <li className={classes.NavigationItem}>
        <NavLink
          to="/sobre#start"
          activeClassName={classes[props.classProps]}
          onClick={props.toggle}
        >
          Sobre
        </NavLink>
      </li>
      <li className={classes.NavigationItem}>
        <NavLink
          to="/servicos#start"
          activeClassName={classes[props.classProps]}
          onClick={props.toggle}
        >
          Serviços
        </NavLink>
      </li>
      <li className={classes.NavigationItem}>
        <NavLink
          to="/contato#start"
          activeClassName={classes[props.classProps]}
          onClick={props.toggle}
        >
          Contato
        </NavLink>
      </li>
      <li
        className={[classes.BarVertical, classes.MobileDontShow].join(" ")}
      ></li>
      {showLogOutIcon}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userIsLogged: state.login.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(actionTypes.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
