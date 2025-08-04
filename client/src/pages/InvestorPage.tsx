
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/information/accomodationPolicy.css';

const InvestorPage: React.FC = () => {
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
                    <p>Уважаемые партнёры и инвесторы!
                <br /><br />
                Мы рады пригласить вас к сотрудничеству с платформой <b>ApsaMarket</b> — онлайн-каталогом, объединяющим честных производителей, локальные бренды и покупателей, которым небезразличны качество, этика и устойчивое потребление.</p>
                </div>
              </section>

              <section id="information-collection" className="policy-section">
                <h2 className="policy-section-title">Прозрачные условия сотрудничества</h2>
                <div className="policy-section-content">
                Вы можете напрямую поддерживать молодые бренды, проекты и направления, соответствующие вашим ценностям и интересам.    <br /><br />
                Ваш вклад может стать реальным импульсом для развития малого и устойчивого бизнеса, а также будет публично отражён на платформе.
                </div>
              </section>

              <section id="information-usage" className="policy-section">
                <h2 className="policy-section-title">Хотите поддержать конкретный бренд или проект?</h2>
                <div className="policy-section-content">
                Напишите нам на почту: <a href="mailto:apsamarket1@gmail.com">apsamarket1@gmail.com</a> — и мы предложим вам актуальные проекты и свяжем с теми, кому ваша поддержка действительно важна.
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

export default InvestorPage;
