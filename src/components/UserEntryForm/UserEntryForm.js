import React from "react";
import { Link } from "react-router-dom";

import useFormAndValidation from "../../utils/useFormAndValidation";

import "./UserEntryForm.css";

import logo from "../../images/logo.svg";

import Preloader from "../Movies/Preloader/Preloader";

function UserEntryForm({
  title,
  isPathSignUp,
  buttonTitle,
  question,
  linkPath,
  linkText,
  onSubmit,
  isLoading,
  submitErrorMessage,
  onLogoClick,
}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  let userErrorMessage;

  switch (submitErrorMessage) {
    case "Ошибка 409":
      userErrorMessage = "Пользователь с такими данными уже существует.";
      break;
    case "Ошибка 401":
      userErrorMessage = "Неверный логин или пароль.";
      break;
    default:
      userErrorMessage =
        "При попытке отправить данные произошла ошибка. Проверьте корректность введённых данных или повторите попытку позже.";
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
    resetForm();
  }

  return (
    <section className="section entry">
      <div className="entry__container">
        <Link to="/" onClick={onLogoClick}>
        <img src={logo} alt="Логотип проекта" className="entry__logo" />
        </Link>
        <form noValidate onSubmit={handleSubmit} className="entry__form">
          <h2 className="entry__title">{title}</h2>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              {isPathSignUp && (
                <>
                  <label htmlFor="name" className="entry__label">
                    Имя
                  </label>
                  <input
                    name="name"
                    type="text"
                    minLength="2"
                    maxLength="30"
                    pattern="[a-zA-Zа-яА-Я0-9\sёЁ-]{2,30}"
                    value={values.name || ""}
                    onChange={handleChange}
                    className="entry__input"
                    required
                  />
                  <span className="entry__input-error">{errors.name}</span>
                </>
              )}
              <label htmlFor="email" className="entry__label">
                E-mail
              </label>
              <input
                name="email"
                type="email"
                pattern="[A-z0-9_.-]{1,}@[A-z0-9_.-]{1,}[.][A-z]{2,8}"
                value={values.email || ""}
                onChange={handleChange}
                className="entry__input"
                required
              />
              <span className="entry__input-error">{errors.email}</span>
              <label htmlFor="userPassword" className="entry__label">
                Пароль
              </label>
              <input
                name="password"
                type="password"
                value={values.password || ""}
                onChange={handleChange}
                className="entry__input"
                minLength="8"
                required
              />
              <span className="entry__input-error">{errors.password}</span>
              <div className="entry__button-area">
                {submitErrorMessage && (
                  <span className="entry__submit-error">
                    {userErrorMessage}
                  </span>
                )}
                <button
                  type="submit"
                  disabled={isValid === false && true}
                  className={`entry__button ${
                    isValid === false && "entry__button_disabled"
                  }`}
                >
                  {buttonTitle}
                </button>
              </div>
              <p className="entry__paragraph">
                {question}
                <Link to={linkPath} className="entry__link">
                  {linkText}
                </Link>
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default UserEntryForm;
