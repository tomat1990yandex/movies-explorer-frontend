import { React, useEffect, useContext } from "react";

import { Link } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import useFormAndValidation from "../../utils/useFormAndValidation";

import Preloader from "../Movies/Preloader/Preloader";

import "./Profile.css";

function Profile({ onUpdate, isLoading, onLogout }) {
  let { values, errors, isValid, handleChange } =
    useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    values.email = currentUser.email;
    values.name = currentUser.name;
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ email: values.email, name: values.name });
    // resetForm();
  };

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
                value={values.name || currentUser.name || "" }
                minLength="2"
                maxLength="30"
                pattern="[a-zA-Zа-яА-Я\sёЁ-]{2,30}"
                required
                onChange={handleChange}
                className="profile__input"
                autoComplete='off'
              />
            </div>
            <span className="profile__input-error">{errors.name}</span>
            <div className="profile__input-area">
              <label className="profile__label">E-mail</label>
              <input
                name="email"
                type="email"
                value={values.email || currentUser.email || "" }
                pattern="[A-z0-9_.-]{1,}@[A-z0-9_.-]{1,}[.][A-z]{2,8}"
                required
                onChange={handleChange}
                className="profile__input"
                autoComplete='off'
              />
              {/*<span className="profile__message">{errorMessage}</span>*/}
            </div>
            <span className="profile__input-error">{errors.email}</span>
            <button
              type="submit"
              className={`profile__button ${
                (!isValid ||
                  (values.email === currentUser.email &&
                    values.name === currentUser.name)) &&
                'profile__button_disabled'
              }`}
              onClick={handleSubmit}
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
