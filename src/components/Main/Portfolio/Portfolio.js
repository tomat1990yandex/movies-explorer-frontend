import React from "react";

import "./Portfolio.css";

import AboutMe from "../AboutMe/AboutMe";

import arrow from "../../../images/landing-arrow.svg";

function Portfolio() {
  return (
    <section className="section portfolio">
      <div className="portfolio__container">
        <div className="section__header">Студент</div>
        <AboutMe />
        <div className="portfolio__projects">
          <p className="portfolio__text">Портфолио</p>
          <div className="portfolio__links">
            <div className="portfolio__link">
              <a
                target="_blank"
                href="https://tomat1990yandex.github.io/how-to-learn/"
                rel="noreferrer"
                className="portfolio__project"
              >
                Статичный сайт
              </a>
              <a
                target="_blank"
                href="https://tomat1990yandex.github.io/how-to-learn/"
                rel="noreferrer"
              >
                <img
                  src={arrow}
                  className="portfolio__icon"
                  alt="Иконка для ссылки на проект"
                />
              </a>
            </div>
            <div className="portfolio__link">
              <a
                target="_blank"
                href="https://tomat1990yandex.github.io/russian-travel/"
                rel="noreferrer"
                className="portfolio__project"
              >
                Адаптивный сайт
              </a>
              <a
                target="_blank"
                href="https://tomat1990yandex.github.io/russian-travel/"
                rel="noreferrer"
              >
                <img
                  src={arrow}
                  className="portfolio__icon"
                  alt="Иконка для ссылки на проект"
                />
              </a>
            </div>
            <div className="portfolio__link">
              <a
                target="_blank"
                href="https://tomat1990yandex.github.io/mesto/"
                rel="noreferrer"
                className="portfolio__project"
              >
                Одностраничное приложение
              </a>
              <a
                target="_blank"
                href="https://tomat1990yandex.github.io/mesto/"
                rel="noreferrer"
              >
                <img
                  src={arrow}
                  className="portfolio__icon"
                  alt="Иконка для ссылки на проект"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
