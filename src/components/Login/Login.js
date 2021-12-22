import React from "react";

import UserEntryForm from "../UserEntryForm/UserEntryForm";

function Login({ onSubmit, isLoading, errorMessage }) {
  return (
    <UserEntryForm
      title="Рады видеть!"
      isPathSignUp={false}
      buttonTitle="Войти"
      question="Ещё не зарегистрированы?"
      linkPath="/signup"
      linkText="Регистрация"
      onSubmit={onSubmit}
      isLoading={isLoading}
      submitErrorMessage={errorMessage}
    />
  );
}

export default Login;
