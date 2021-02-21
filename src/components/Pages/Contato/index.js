import React, { useState, useEffect } from "react";

import classes from "./Style.module.css";
import ButtonFunc from "../../UI/Buttons/ButtonFunc";

import serverURL from "../../../serverURL";

// npm i react-icons
// https://react-icons.github.io/react-icons/
import { MdEmail } from "react-icons/md";
import { MdCall } from "react-icons/md";

export default function Contato(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [messageToUser, setMessageToUser] = useState(null);

  const isLogged = localStorage.getItem("userIsLogged");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageToUser(null);
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, [messageToUser]);

  useEffect(() => {
    if (isLogged) {
      const emailAux = localStorage.getItem("currentUserEmail");
      const nameAux = localStorage.getItem("currentUsername");
      const phoneAux = localStorage.getItem("currentUserPhone");
      setName(nameAux);
      setEmail(emailAux);
      setTelephone(phoneAux);
    }
  }, [isLogged]);

  // if (name === "") {
  //   setName("Nome");
  // }
  // if (email === "") {
  //   setEmail("E-mail");
  // }
  // if (telephone === "") {
  //   setTelephone("Telefone");
  // }
  // if (message === "") {
  //   setMessage("Mensagem");
  // }

  function sendEmailHandler(e) {
    e.preventDefault();
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!pattern.test(email)) {
      setMessageToUser(
        <div className={classes.MessageToUser}>
          Favor preencher todos os campos corretamente.
        </div>
      );
      return;
    } else if (
      name === "Nome" ||
      email === "E-mail" ||
      telephone === "Telefone" ||
      message === "Mensagem"
    ) {
      setMessageToUser(
        <div className={classes.MessageToUser}>
          Favor preencher todos os campos corretamente.
        </div>
      );
      return;
    } else if (name.length < 3) {
      setMessageToUser(
        <div className={classes.MessageToUser}>
          Mínimo 3 caracteres para nome.
        </div>
      );
      return;
    } else if (telephone.length < 6) {
      setMessageToUser(
        <div className={classes.MessageToUser}>
          Mínimo 6 caracteres para telefone.
        </div>
      );
      return;
    } else if (message.length < 10) {
      setMessageToUser(
        <div className={classes.MessageToUser}>
          Mínimo 10 caracteres para mensagem.
        </div>
      );
      return;
    } else {
      // SENDING MESSAGE:
      fetch(`${serverURL}/emails`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          telephone: telephone,
          email: email,
          message: message,
        }),
        headers: {
          // "Bearer " is a convention of Authentication Token:
          // Authorization: "Bearer " + this.props.token,
          "Content-Type": "Application/json",
        },
      })
        .then((res) => {
          setMessageToUser(
            <div className={classes.MessageToUser}>
              Mensagem enviada com sucesso!
              <br />
              Em breve entraremos em contato.
            </div>
          );
          setName("");
          setEmail("");
          setTelephone("");
          setMessage("");
        })
        .catch((err) => {
          setMessageToUser(
            <div className={classes.MessageToUser}>
              Serviço indisponível no momento.
              <br />
              Favor tentar mais tarde.
            </div>
          );
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
    <section
      className={[classes.CenterAligned, classes[props.backColor]].join(" ")}
    >
      <br />
      <div className={classes.AppContainer}>
        <div className={classes.Flexbox}>
          <div>
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
              <ButtonFunc btnColor={props.btnColor} function={sendEmailHandler}>
                ENVIAR
              </ButtonFunc>
            </div>
            {messageToUser}
          </div>
        </div>
      </div>
      <br />
    </section>
  );
}
