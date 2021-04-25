import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionsIndex';

import classes from './Home.module.css';
import homeImg from '../../assets/homeImg.jpg';

import Servicos from '../../components/Pages/Servicos';
import NumeroDeVendas from '../../components/Pages/NumeroDeVendas';
import Testimonials from '../../components/Pages/Testimonials';
import Duvidas from '../../components/Pages/Duvidas';
import Contato from '../../components/Pages/Contato';
import GoogleMap from '../../components/Pages/GoogleMap/GoogleMap';
import QualSeuCaso from '../../components/Pages/QualSeuCaso';
import ComoFunciona from '../../components/Pages/ComoFunciona';

function Home(props) {
  useEffect(() => {
    props.onHideSideDrawer();
  }, []);

  const backHomeImgStyle = {
    backgroundImage: `url(${homeImg})`,
  };
  return (
    <div>
      {/* ANCHOR self-closing DIV: */}
      <div id="start" style={{ position: 'absolute', top: '0px' }} />
      {/* HOME IMAGE */}
      <section className={classes.HomeImageContainer} style={backHomeImgStyle}>
        <div className={classes.SectionDescription}>
          <br /> <br />
          <br className={classes.MobileDontShow} />
          <br className={classes.MobileDontShow} />
          <h1>Declare seu IR com a gente!</h1> <br />
          <h3 className={classes.titleSecond}>
            Simplificada, completa e múltiplas fontes
          </h3>
          <br />
        </div>
      </section>
      {/* VÍDEO "COMO FUNCIONA" */}
      <ComoFunciona />
      {/* DECLARE SEU IMPOSTO / SERVICOS */}
      <Servicos showOnlyHighlight={true} />
      {/* NUMEROS DE SERVIÇOS PRESTADOS */}
      <NumeroDeVendas />
      {/* NÃO SABE QUAL É O SEU CASO? */}
      <QualSeuCaso />
      {/* TESTIMONIALS */}
      <Testimonials />
      {/* DÚVIDAS FREQUENTES */}
      <Duvidas backCollor="SectionGrey" />
      {/* FALE CONOSCO */}
      <Contato
        IconColor="white"
        backColor="SectionBlueDark"
        btnColor="ButtonBuy"
        title="Fale Conosco"
        messageColor="whiteFont"
        description="Entre em contato pelo nosso telefone, e-mail ou preencha o
            formulário e fale com um dos nossos especialistas."
      />
      {/* GOOGLE MAPS */}
      <GoogleMap />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHideSideDrawer: () => dispatch(actionTypes.hideSideDrawer()),
  };
};

export default connect(null, mapDispatchToProps)(Home);
