import React, { useEffect, useContext } from "react";

import { Link } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import useFormAndValidation from "../../utils/useFormAndValidation";

import Preloader from "../Movies/Preloader/Preloader";

import "./Profile.css";

function Profile({ onUpdate, isLoading, onLogout }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...values, email: currentUser.email });
    resetForm();
  };

  useEffect(() => {}, [currentUser]);

  return (
    <section className="profile">
      <form noValidate onSubmit={handleSubmit} className="profile__form">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <div className="profile__input-area">
              <label className="profile__label">Имя</label>
              <input
                name="name"
                type="text"
                placeholder={currentUser.name}
                value={values.name || ""}
                minLength="2"
                maxLength="30"
                pattern="[a-zA-Zа-яА-Я\sёЁ-]{2,30}"
                required
                onChange={handleChange}
                className="profile__input"
              />
            </div>
            <span className="profile__input-error">{errors.name}</span>
            <div className="profile__input-area">
              <label className="profile__label">E-mail</label>
              <input
                name="userEmail"
                type="email"
                readOnly
                placeholder={currentUser.email}
                value={values.email || ""}
                className="profile__input"
                disabled={true}
              />
            </div>
            <button
              disabled={isValid === false && true}
              type="submit"
              className="profile__button"
            >
              Редактировать
            </button>
            <Link to="/">
              <button
                type="reset"
                onClick={onLogout}
                className="profile__button profile__button_red"
              >
                Выйти из аккаунта
              </button>
            </Link>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;
