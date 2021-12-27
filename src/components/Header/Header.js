import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../images/logo.svg";

import NavTab from "../Main/NavTab/NavTab";

function Header({ location, onMenuClick, onLogoClick, loggedIn }) {
  let headerClassname;

  switch (location) {
    case "/movies":
      headerClassname = "header header_movies";
      break;
    case "/saved-movies":
      headerClassname = "header header_movies";
      break;
    case "/profile":
      headerClassname = "header header_movies";
      break;
    case "/":
      headerClassname = "header";
      break;
    default:
      headerClassname = "header header_hidden";
  }

  return (
    <header className={headerClassname}>
      <div className="header__container">
        <Link to="/" onClick={onLogoClick}>
          <img src={logo} alt="Логотип" className="header__logo" />
        </Link>
        <NavTab
          location={location}
          loggedIn={loggedIn}
          onMenuClick={onMenuClick} />
      </div>
    </header>
  );
}

export default Header;
