import React from 'react';

import './AboutMe.css';
import photo from '../../../images/dmitriy.jpg';
import PortfolioTitle from "../../PortfolioTitle/PortfolioTitle";

function AboutMe() {
  function age(birtDate) {
    const years = ((new Date().getTime() - new Date(birtDate)) / (24 * 3600 * 365.25 * 1000)) | 0;
    const secondDigit = +String(years).charAt(1);

    if (secondDigit === 1) {
      return years + ' год';
    } else if (secondDigit === 2 || secondDigit === 3 || secondDigit === 4) {
      return years + ' года';
    } else {
      return years + ' лет';
    }
  }

  return (
    <section className="about-me about-project" id="student">
      <PortfolioTitle title="Студент"/>
      <div className="about-me__wrapper">
        <img src={photo} alt="Моё фото" className="about-me__photo"/>
        <div className="about-me__bio-wrapper">
          <div className="about-me__bio-wrapper-info">
            <h3 className="about-me__name techs__title">Дмитрий</h3>
            <h4 className="about-me__subtitle">
              Фронтенд-разработчик, {age('1990-08-08')}
            </h4>
            <p className="about-me__bio about-project__item-text">Я из города Екатеринбурга. С детства меня притягивали
              технологии и когда у меня в 2003 году появился компьютер мне нравилось на нем не только играть в игры, но
              и разбираться как они устроены и почему они иногда не работают :). Когда я стал взрослым, в один из
              холодных зимних вечеров я решил, что надо попробовать заняться тем что мне всегда нравилось,
              программированием!<br/>
              Я записался на курсы Я.Практикум и меня это очень увлекло.
              Люблю современные веб-технологии и считаю что за интернетом будущее.
              </p>
          </div>
          <ul className="about-me__contacts">
            <li className="about-me__contacts-link">
              <a href="https://www.facebook.com/diminenn" className="about-me__contacts-link"
                 target="_blank" rel="noreferrer">Facebook</a>
            </li>
            <li className="about-me__contacts-link">
              <a href="https://github.com/tomat1990yandex" className="about-me__contacts-link"
                 target="_blank" rel="noreferrer">GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
