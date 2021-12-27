import React from "react";

import "./Main.css";

import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import Portfolio from "./Portfolio/Portfolio";
import LinkTab from "./LinkTab/LinkTab";

function Main() {
  return (
    <main className="content">
      <Promo />
      <LinkTab />
      <AboutProject />
      <Techs />
      <Portfolio />
    </main>
  );
}

export default Main;
