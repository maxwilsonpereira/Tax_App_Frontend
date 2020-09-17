import React from "react";
// npm i react-router-dom
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./global.css";

import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Servicos from "./pages/Servicos";
import Contato from "./pages/Contato";
import Comprar from "./pages/Comprar";
import Login from "./pages/Login/Login";
import Checkout from "./pages/Checkout/Checkout";
import AdminPage from "./pages/AdminPage";

function App() {
  // localStorage.setItem("userIsLogged", "false");
  // localStorage.setItem("currentProduct", props.id);
  // SERVICOS/COMPRAR HAS:
  // const someName = localStorage.getItem("userIsLogged");

  // CLEAR STORAGE on logout:
  // localStorage.clear();

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path={"/admpage"} component={AdminPage} />
        <Route path={"/checkout"} component={Checkout} />
        <Route path={"/login"} component={Login} />
        <Route path={"/comprar"} component={Comprar} />
        <Route path={"/contato"} component={Contato} />
        <Route path={"/servicos"} component={Servicos} />
        <Route path={"/sobre"} component={Sobre} />
        <Route path={"/"} component={Home} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
