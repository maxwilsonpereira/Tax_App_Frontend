import React from "react";
// import { Link } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

import classes from "./Footer.module.css";
import logo from "../../assets/logomarca_footer.png";

export default function Footer() {
  return (
    <section className={classes.SectionColor}>
      <div className={classes.AppContainerFooter}>
        <div className={classes.GridFooter}>
          <div>
            <img className={classes.LogoFooter} src={logo} alt="" />
          </div>
          <div>
            <h1>Institucional</h1>
            <h3>
              <Link to="/sobre#start">Sobre</Link>
              <br />
              <Link to="/servicos#start">Serviços</Link>
              <br />
              <Link to="/login#start">Cadastre-se</Link>
            </h3>
          </div>
          <div>
            <h1>Relacionamento</h1>
            <h3>
              <Link to="/login#start">Login</Link>
              <br />
              <Link to="/#duvidas">Dúvidas Frequentes</Link>
              <br />
              <Link to="/contato#start">Contato</Link>
              {/* <Link to="/">Abrir Chamado</Link> */}
            </h3>
          </div>
          <div>
            <h1>Developed with REACT by</h1>
            <h3>Max Wilson Pereira</h3>

            <p>
              <a
                href="https://www.linkedin.com/in/maxwilsonpereira/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Linkedin
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className={classes.FooterDown}>
        <p>Todos os direitos reservados. Copyright 2019 Declarção de IR.</p>
      </div>
    </section>
  );
}
