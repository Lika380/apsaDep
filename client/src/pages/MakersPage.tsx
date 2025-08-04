
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/information/accomodationPolicy.css';

const MakersPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrintPolicy = () => {
    window.print();
  };

  return (
    <div className="policy-container">
      <main className="policy-main">

        <div className="policy-content">
          <div className="policy-actions">
            <button className="policy-print-btn" onClick={handlePrintPolicy}>
              <span className="policy-print-icon">🖨️</span> Распечатать документ
            </button>
            <div className="policy-last-update">Последнее обновление: 01.10.2025</div>
          </div>

          <div className="policy-navigation">
            <div className="policy-sections">
              <section id="introduction" className="policy-section">
                <h2 className="policy-section-title"> Приглашение к сотрудничеству</h2>
                <div className="policy-section-content">
                    <p>Уважаемые производители!
                <br /><br />
                Мы приглашаем вас стать частью нашей платформы — места, где честные бренды и качественные товары находят своих покупателей. Сотрудничество с нами поможет вам расширить аудиторию, повысить узнаваемость и укрепить репутацию.        <br /><br />
                Мы предлагаем прозрачные условия, поддержку продвижения и возможность напрямую связываться с заинтересованными покупателями и инвесторами.</p>
                </div>
              </section>

              <section id="information-collection" className="policy-section">
                <h2 className="policy-section-title">Прозрачные условия сотрудничества</h2>
                <div className="policy-section-content">
                * Продвигаем эко-проекты через контент, соцсети и тематические подборки
                Это формат "витрины доверия", где каждый бренд — как личная рекомендация.

                </div>
              </section>

              <section id="information-usage" className="policy-section">
                <h2 className="policy-section-title">Хотите продвинуть свой бренд или проект?</h2>
                <div className="policy-section-content">
                   Свяжитесь с нами по электронной почте: <a href="mailto:apsamarket1@gmail.com">apsamarket1@gmail.com</a>,и мы подберём для вас актуальные возможности сотрудничества.
                </div>
              </section>
            </div>
          </div>

          <div className="policy-back-link">
            <Link to="/" className="policy-back-button">
              <span>←</span> Вернуться на главную</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MakersPage;
