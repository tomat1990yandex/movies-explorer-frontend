import React from 'react';

import './LinkTab.css';
import { Link } from 'react-scroll';

function LinkTab() {
  return(
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__list-item">
          <Link to="info__container"
                className="nav-tab__link"
                spy={true}
                smooth={true}
          >О проекте
          </Link>
        </li>
        <li className="nav-tab__list-item">
          <Link to="tech__container"
                className="nav-tab__link"
                spy={true}
                smooth={true}
          >Технологии
          </Link>
        </li>
        <li className="nav-tab__list-item">
          <Link to="portfolio__info"
                className="nav-tab__link"
                spy={true}
                smooth={true}
          >Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default LinkTab;
