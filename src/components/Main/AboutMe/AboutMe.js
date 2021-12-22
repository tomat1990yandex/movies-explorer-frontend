import React from "react";

import "./AboutMe.css";

import avatar from "../../../images/avatar.png";

function AboutMe() {
  return (
    <div className="portfolio__info">
      <div className="portfolio__about">
        <h2 className="portfolio__title">Дмитрий</h2>
        <h3 className="portfolio__subtitle">Фронтенд-разработчик, 31 год</h3>
        <p className="portfolio__paragraph">
          Я из города Екатеринбурга. С детства меня притягивали
          технологии и когда у меня в 2003 году появился компьютер мне нравилось на нем не только играть в игры, но
          и разбираться как они устроены и почему они иногда не работают :). Когда я стал взрослым, в один из
          холодных зимних вечеров я решил, что надо попробовать заняться тем что мне всегда нравилось,
          программированием!<br/>
          Я записался на курсы Я.Практикум и меня это очень увлекло.
          Люблю современные веб-технологии и считаю что за интернетом будущее.
        </p>
        <div className="portfolio__contacts">
          <a
            target="_blank"
            href="https://www.facebook.com/diminenn"
            className="portfolio__contact"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            target="_blank"
            href="https://github.com/tomat1990yandex"
            className="portfolio__contact"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
      <img
        src={avatar}
        alt="Фотография студента"
        className="portfolio__photo"
      />
    </div>
  );
}

export default AboutMe;
