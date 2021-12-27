import React from "react";

import { useHistory } from "react-router-dom";

import "./UnknownPage.css";

function UnknownPage() {
  const history = useHistory();

  function goToPreviousPage() {
    history.goBack();
  }

  return (
    <section className="unknown">
      <div className="unknown__container">
        <h2 className="unknown__title">404</h2>
        <h3 className="unknown__subtitle">Страница не найдена</h3>
        <button className="unknown__link" onClick={goToPreviousPage}>
          Назад
        </button>
      </div>
    </section>
  );
}

export default UnknownPage;
