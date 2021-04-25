import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionsIndex';

import classes from './Sobre.module.css';
import PageTitle from '../../components/Pages/PageTitle/PageTitle';
import img from '../../assets/sobre.png';

import Servicos from '../../components/Pages/Servicos';
import FaleConosco from '../../components/Pages/Contato';
import GoogleMap from '../../components/Pages/GoogleMap/GoogleMap';

function Sobre(props) {
  useEffect(() => {
    props.onHideSideDrawer();
  }, []);

  return (
    <>
      <div id="start" style={{ position: 'absolute', top: '0px' }} />
      <section className={classes.CenterAligned}>
        <PageTitle title="Sobre" />
        <br />
        <div className={classes.AppContainer}>
          <h1 className={classes.SectionTitle}>Sobre</h1>
          <br />
          <h2> Conheça o nosso serviço e declare seu IR conosco </h2>
          <p className={classes.SectionDescription}>
            Olá! Nós somos o Declaração de IR e nascemos com a missão de quebrar
            um grande paradigma junto aos contribuintes do Imposto de Renda.
            Nossa ideia é que você não “gaste” mais seu tempo com algo que você
            não conhece, não tem intimidade para fazer, ou faz por obrigação e
            algumas vezes, paga por atraso no envio, uma multa de R$165,00
            (cento e sessenta e cinco reais). Além disso, sabemos que o tempo
            gasto para preparar a declaração é precioso e achamos que você
            deveria usá-lo com as pessoas que você gostaria de estar. Em
            primeiro lugar, somos profissionais, especialistas em imposto de
            renda, e com várias formações. Somos{' '}
            <b>administradores, advogados, contadores, economistas</b>
            entre outras formações na área de exatas. Agora a pergunta de
            R$1.000.000, por que fazemos imposto de renda? Fazemos por vários
            motivos, mas o principal deles é porque queremos facilitar a vida
            dos nossos clientes. Na verdade queremos servir e permitir ao nosso
            cliente que ele use o tempo dele com o que é mais importante e
            “caro”. A preparação de uma declaração de imposto de renda pode ser
            algo estressante e que literalmente vai fazer sair da nossa cabeça,
            aquela fumacinha igual a de um desenho animado. Mas lembre-se sempre
            que você tem o Declaração de IR, estaremos sempre aqui para te
            ajudar a comprar esse tempo.
          </p>
          <img className={classes.ImgSobre} src={img} alt="" />
          <br /> <br /> <br /> <br />
        </div>
      </section>
      {/* DECLARE SEU IMPOSTO / COMPRAR */}
      <Servicos />
      {/* FALE CONOSCO */}
      <FaleConosco
        IconColor="white"
        backColor="SectionBlueDark"
        title="Fale Conosco"
        description="Entre em contato pelo nosso telefone, e-mail ou preencha o
            formulário e fale com um dos nossos especialistas."
      />
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

export default connect(null, mapDispatchToProps)(Sobre);
