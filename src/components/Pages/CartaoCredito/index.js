import React, { useState } from 'react';

import classes from './Style.module.css';
import ButtonFunc from '../../UI/Buttons/ButtonFunc';

// SENDING EMAILS
// ULTIL 200 emails per month: https://www.npmjs.com/package/emailjs-com

// npm i react-icons
// https://react-icons.github.io/react-icons/
// import { MdEmail } from 'react-icons/md';
// import { MdCall } from 'react-icons/md';

export default function Contato(props) {
  const [number, setNumber] = useState('Número do Cartão');
  const [nomeTitular, setNomeTitular] = useState('Nome do Titular');
  const [codigoSeguranca, setCodigoSeguranca] = useState('Código de Segurança');
  const [mesValidade, setMesValidade] = useState('Mês de Validade (Ex. 12)');
  const [anoValidade, setAnoValidade] = useState('Ano de Validade (Ex. 2023)');

  if (number === '') {
    setNumber('Número do Cartão');
  }
  if (nomeTitular === '') {
    setNomeTitular('Nome do Titular');
  }
  if (codigoSeguranca === '') {
    setCodigoSeguranca('Código de Segurança');
  }
  if (mesValidade === '') {
    setMesValidade('Mês de Validade (Ex. 12)');
  }
  if (anoValidade === '') {
    setAnoValidade('Ano de Validade (Ex. 2023');
  }

  function finalizarCompraHandler(e) {
    e.preventDefault();
    alert('Confirmar!');
  }

  function enterKeyPressedHandler(event) {
    // event.preventDefault();
    var code = event.keyCode || event.which;
    if (code === 13) {
      // alert("ENTER KEY PRESSED!");
      finalizarCompraHandler(event);
    }
  }

  return (
    <section
      className={[classes.CenterAligned, classes[props.backCollor]].join(' ')}
    >
      <div className={classes.AppContainer}>
        <div className={classes.Flexbox}>
          <div>
            <input
              onChange={(e) => setNumber(e.target.value)}
              onKeyPress={enterKeyPressedHandler}
              type="number"
              required
              placeholder={number}
              name={number}
            />
            <br />
            <input
              onChange={(e) => setNomeTitular(e.target.value)}
              onKeyPress={enterKeyPressedHandler}
              type="text"
              required
              placeholder={nomeTitular}
              name={nomeTitular}
            />
            <br />
            <input
              onChange={(e) => setCodigoSeguranca(e.target.value)}
              onKeyPress={enterKeyPressedHandler}
              type="number"
              required
              placeholder={codigoSeguranca}
              name={codigoSeguranca}
            />
            <br />
            <input
              onChange={(e) => setMesValidade(e.target.value)}
              onKeyPress={enterKeyPressedHandler}
              type="number"
              required
              placeholder={mesValidade}
              name={mesValidade}
            />
            <br />
            <input
              onChange={(e) => setAnoValidade(e.target.value)}
              onKeyPress={enterKeyPressedHandler}
              type="number"
              required
              placeholder={anoValidade}
              name={anoValidade}
            />
            <br />
            <br />
            <div className={classes.SubmitBtn}>
              <ButtonFunc
                // className={classes.BtnFinalizar}
                btnColor="BtnGreenPagar"
                function={finalizarCompraHandler}
              >
                Confirmar
              </ButtonFunc>
            </div>
          </div>
        </div>
      </div>
      <br />
    </section>
  );
}
