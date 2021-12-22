import React from "react";

import UserEntryForm from "../UserEntryForm/UserEntryForm";

function Register({ onSubmit, isLoading, errorMessage }) {
  return (
    <UserEntryForm
      title="Добро пожаловать!"
      isPathSignUp={true}
      buttonTitle="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkPath="/signin"
      linkText="Войти"
      onSubmit={onSubmit}
      submitErrorMessage={errorMessage}
    />
  );
}

export default Register;
