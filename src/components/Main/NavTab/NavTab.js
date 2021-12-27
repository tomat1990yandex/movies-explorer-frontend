import React from "react";

import {Link} from "react-router-dom";

import "./NavTab.css";

import profileIcon from "../../../images/profile-icon.svg";
import burgerMenu from "../../../images/burger-icon.svg";


function NavTab({location, onMenuClick, loggedIn}) {
  return (
    <>
      {loggedIn ? (
        <>
          <nav className="header__main-menu">
            <div className="header__icon-menu" onClick={onMenuClick}>
              <span className="header__icon-menu-span"/>
            </div>
            <Link
              to="/movies"
              className={`header__link header__link_black ${
                location === "/movies" && "header__link_active"
              }`}
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={`header__link header__link_black ${
                location === "/saved-movies" && "header__link_active"
              }`}
            >
              Сохранённые фильмы
            </Link>
          </nav>
          {window.innerWidth > 769 ? (
            <Link to="/profile" className="header__button">
              <>
                <button className="header__link header__link_button">
                  Аккаунт
                </button>
                <img
                  src={profileIcon}
                  alt="Иконка личного кабинета"
                  className="header__profile-icon"
                />
              </>
            </Link>
          ) : (
            <img
              src={burgerMenu}
              alt="Иконка раскрывающегося меню"
              className="header__burger-menu"
              onClick={onMenuClick}
            />
          )}
        </>
      ) : (
        <nav className="header__menu">
          <Link to="/signup" className="header__link header__link_white">
            Регистрация
          </Link>
          <Link to="/signin" className="header__link header__link_green">
            Войти
          </Link>
        </nav>
      )}
    </>
  );
}

export default NavTab;
