import React, { useState, useEffect } from 'react';
import classes from './styles.module.scss';
import ButtonFunc from '../../UI/Buttons/ButtonFunc';
import CircularProgress from '@material-ui/core/CircularProgress';
import serverURL from '../../../serverURL';

// npm i react-icons
// https://react-icons.github.io/react-icons/
import { MdEmail } from 'react-icons/md';
import { MdCall } from 'react-icons/md';

export default function Contato(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');
  const [messageToUser, setMessageToUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isLogged = localStorage.getItem('userIsLogged');

  useEffect(() => {
    // SCROLL TO TOP ON PAGE LOAD:
    window.scrollTo(0, 0);
    // window.scrollTo(0, 370)
  }, []);

  useEffect(() => {
    if (isLogged) {
      const emailAux = localStorage.getItem('currentUserEmail');
      const nameAux = localStorage.getItem('currentUsername');
      const phoneAux = localStorage.getItem('currentUserPhone');
      setName(nameAux);
      setEmail(emailAux);
      setTelephone(phoneAux);
    }
  }, [isLogged]);

  function sendEmailHandler(e) {
    e.preventDefault();
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!pattern.test(email)) {
      setMessageToUser(<>Favor preencher todos os campos corretamente.</>);
      return;
    } else if (
      name === 'Nome' ||
      email === 'E-mail' ||
      telephone === 'Telefone' ||
      message === 'Mensagem'
    ) {
      setMessageToUser(<>Favor preencher todos os campos corretamente.</>);
      return;
    } else if (name.length < 3) {
      setMessageToUser(<>Mínimo 3 caracteres para nome.</>);
      return;
    } else if (telephone.length < 6) {
      setMessageToUser(<>Mínimo 6 caracteres para telefone.</>);
      return;
    } else if (message.length < 10) {
      setMessageToUser(<>Mínimo 10 caracteres para mensagem.</>);
      return;
    } else {
      // SENDING MESSAGE:
      setIsLoading(true);
      fetch(`${serverURL}/emails`, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          telephone: telephone,
          email: email,
          message: message,
        }),
        headers: {
          // "Bearer " is a convention of Authentication Token:
          // Authorization: "Bearer " + this.props.token,
          'Content-Type': 'Application/json',
        },
      })
        .then((res) => {
          // console.log('RESPONSE: res', res);
          setMessageToUser(
            <>
              Mensagem enviada com sucesso!
              <br />
              Em breve entraremos em contato.
            </>
          );
          setName('');
          setEmail('');
          setTelephone('');
          setMessage('');
          setIsLoading(false);
        })
        .catch((err) => {
          setMessageToUser(
            <>
              Serviço indisponível no momento.
              <br />
              Favor tentar mais tarde.
            </>
          );
          setIsLoading(false);
        });
    }
  }
  function enterKeyPressedHandler(event) {
    // event.preventDefault();
    var code = event.keyCode || event.which;
    if (code === 13) {
      // alert("ENTER KEY PRESSED!");
      sendEmailHandler(event);
    }
  }

  return (
    <section className={classes[props.backColor]}>
      <br />
      <div className={classes.AppContainer}>
        <div className={classes.Flexbox}>
          <div className={classes.flexboxFirstDiv}>
            <h1>{props.title}</h1>
            <br /> <br />
            <h2>{props.description}</h2>
            <br />
            <br />
            <h3>
              <MdEmail
                className={classes.EmailLog}
                size={30}
                color={props.IconColor}
              />
              ola@declaracaodeir.com
            </h3>
            <br />
            <br />
            <h3>
              <MdCall
                className={classes.EmailLog}
                size={30}
                color={props.IconColor}
              />
              (11) 95600-0301
            </h3>
          </div>
          <div>
            <input
              onChange={(e) => setName(e.target.value)}
              onKeyPress={enterKeyPressedHandler}
              type="text"
              required
              placeholder="Nome"
              name={name}
              value={name}
            />
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={enterKeyPressedHandler}
              type="email"
              required
              placeholder="E-mail"
              name={email}
              value={email}
            />
            <br />
            <input
              onChange={(e) => setTelephone(e.target.value)}
              onKeyPress={enterKeyPressedHandler}
              type="number"
              required
              placeholder="Telefone"
              name={telephone}
              value={telephone}
            />
            <br />
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              required
              placeholder="Mensagem"
              name={message}
              value={message}
            />
            <div className={classes.SubmitBtn}>
              {isLoading ? (
                <div className={classes.progressCircle}>
                  <CircularProgress color="inherit" />
                </div>
              ) : (
                <>
                  <ButtonFunc
                    btnColor={props.btnColor}
                    function={sendEmailHandler}
                  >
                    ENVIAR
                  </ButtonFunc>
                </>
              )}
            </div>
            <div
              className={[
                classes.MessageToUser,
                classes[props.messageColor],
              ].join(' ')}
            >
              {messageToUser}
            </div>
          </div>
        </div>
      </div>
      <br />
    </section>
  );
}
