import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions/actionsIndex";

import classes from "./Contato.module.css";
import PageTitle from "../../components/Pages/PageTitle/PageTitle";

import Contato from "../../components/Pages/Contato";
import GoogleMap from "../../components/Pages/GoogleMap/GoogleMap";

function ContatoComponent(props) {
  useEffect(() => {
    props.onHideSideDrawer();
  }, []);

  return (
    <>
      <div id="start" style={{ position: "absolute", top: "0px" }} />
      <section className={classes.CenterAligned}>
        <PageTitle title="Contato" />
      </section>
      {/* FALE CONOSCO */}
      <div className={classes.OtherColors}>
        <Contato
          IconColor="#145a83"
          btnColor="BlueBtn"
          title="Contato"
          description="Deixe suas informações no formulário, ligue ou mande um e-mail pra gente."
        />
      </div>
      {/* GOOGLE MAPS */}
      <GoogleMap />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHideSideDrawer: () => dispatch(actionTypes.hideSideDrawer()),
  };
};

export default connect(null, mapDispatchToProps)(ContatoComponent);
