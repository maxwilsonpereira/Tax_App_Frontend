import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionsIndex';

import classes from './Servicos.module.css';
import PageTitle from '../../components/Pages/PageTitle/PageTitle';

import Servicos from '../../components/Pages/Servicos';
import Contato from '../../components/Pages/Contato';
import GoogleMap from '../../components/Pages/GoogleMap/GoogleMap';

function ServicosComponent(props) {
  useEffect(() => {
    props.onHideSideDrawer();
  }, []);

  return (
    <>
      <div id="start" style={{ position: 'absolute', top: '0px' }} />
      <section className={classes.CenterAligned}>
        <PageTitle title="Serviços" />
      </section>
      {/* DECLARE SEU IMPOSTO / COMPRAR */}
      <Servicos />
      {/* FALE CONOSCO */}
      <section
        className={[classes.CenterAligned, classes.SectionBlueDark].join(' ')}
      >
        <br />
        <Contato
          IconColor="white"
          title="Fale Conosco"
          backColor="SectionBlueDark"
          btnColor="BtnBuy"
          description="Entre em contato pelo nosso telefone, e-mail ou preencha o
            formulário e fale com um dos nossos especialistas."
        />
        <br />
      </section>
      {/* GOOGLE MAPS */}
      <section>
        <GoogleMap />
      </section>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHideSideDrawer: () => dispatch(actionTypes.hideSideDrawer()),
  };
};

export default connect(null, mapDispatchToProps)(ServicosComponent);
