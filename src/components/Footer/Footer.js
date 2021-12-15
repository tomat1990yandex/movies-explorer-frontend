import React from 'react';

import './Footer.css';

function Footer({ moviesPage }) {
  const currentYear = new Date().getFullYear();

  return(
    <section className={`footer ${moviesPage && 'footer__movies-media'}`}>
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__wrapper">
        <div className="footer__links-wrapper">
          <ul className="footer__links">
            <li className="footer__item">
              <a href="https://praktikum.yandex.ru/" className="footer__item-link"
                 target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__item">
              <a href="https://github.com/tomat1990yandex" className="footer__item-link"
                 target="_blank" rel="noreferrer" >Github</a>
            </li>
            <li className="footer__item">
              <a href="https://www.facebook.com/diminenn" className="footer__item-link"
                 target="_blank" rel="noreferrer" >Facebook</a>
            </li>
          </ul>
        </div>
        <p className="footer__copyright">&copy;{currentYear === 2021 ? '2021': `2021 — ${currentYear}`}</p>
      </div>
    </section>
  );
}

export default Footer;
