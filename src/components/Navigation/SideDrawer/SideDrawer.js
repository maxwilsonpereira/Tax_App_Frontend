import React from 'react';

import Logo from '../../../assets/logomarca.png';
import NavigationItems from '../NavigationItems';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
  return (
    <div className={classes.SideDrawerContainer}>
      <img className={classes.LogoImg} src={Logo} alt="" />
      <NavigationItems
        toggle={props.toggle}
        logOutUser={props.logOutUser}
        classProps="activeMobile"
      />
    </div>
  );
};

export default SideDrawer;
