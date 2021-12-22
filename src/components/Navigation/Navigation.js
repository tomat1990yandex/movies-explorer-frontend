import React from "react";
import { Link } from "react-router-dom";

import "./Navigation.css";

import closeIcon from "../../images/close-icon.svg";
import profileIcon from "../../images/profile-icon.svg";

function Navigation({ isOpen, onClose }) {
  return (
    <section className={`section popup ${isOpen && "popup_opened"}`}>
      <img
        src={closeIcon}
        alt="Иконка закрытия"
        className="popup__close-icon"
        onClick={onClose}
      />
      <div className="popup__links">
        <Link to="/" className="popup__link" onClick={onClose}>
          Главная
        </Link>
        <Link to="/movies" className="popup__link" onClick={onClose}>
          Фильмы
        </Link>
        <Link to="/saved-movies" className="popup__link" onClick={onClose}>
          Сохранённые фильмы
        </Link>
      </div>

      <Link to="/profile" className="popup__button" onClick={onClose}>
        <img
          src={profileIcon}
          alt="Иконка личного кабинета"
          className="popup__profile-icon"
        />
        <p className="popup__caption">Аккаунт</p>
      </Link>
    </section>
  );
}

export default Navigation;
