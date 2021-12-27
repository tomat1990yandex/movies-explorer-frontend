import React from "react";

import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="section info">
      <div className="info__container">
        <div className="section__header">О проекте</div>
        <div className="info__content">
          <div className="info__item">
            <h2 className="info__title">Дипломный проект включал 5 этапов</h2>
            <p className="info__paragraph">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="info__item">
            <h2 className="info__title">На выполнение диплома ушло 5 недель</h2>
            <p className="info__paragraph">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="info__timetable">
          <div className="info__scale">
            <div className="info__step info__step_first">1 неделя</div>
            <div className="info__step info__step_second">4 недели</div>
          </div>
          <div className="info__comments">
            <p className="info__comment">Back-end</p>
            <p className="info__comment">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
