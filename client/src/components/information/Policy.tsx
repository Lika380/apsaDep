
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './accomodationPolicy.css';

const AccommodationPolicy: React.FC = () => {
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
            <div className="policy-last-update">Последнее обновление: 15.04.2025</div>
          </div>

          <div className="policy-navigation">
            <div className="policy-sections">
              <section id="introduction" className="policy-section">
                <h2 className="policy-section-title">Политика компании ApsuaStore</h2>
                <div className="policy-section-content">
                    <h3>О компании ApsuaStore</h3>
                  <p>
                  ApsuaStore — это современный интернет-магазин, предоставляющий широкий ассортимент товаров по доступным ценам. Мы стремимся обеспечивать высокое качество обслуживания, надежность и честность в каждой детали нашей работы. Наши клиенты — наш главный приоритет, и мы делаем всё возможное, чтобы каждый визит в ApsuaStore оставлял только положительные впечатления. <br /> <br />
                  Компания ориентирована на долгосрочное сотрудничество, прозрачные отношения с покупателями и развитие в сфере электронной коммерции. Мы верим в силу технологий и комфорт онлайн-шопинга, который становится доступным каждому.
                  </p>
                </div>
              </section>

              <section id="information-collection" className="policy-section">
                <h2 className="policy-section-title">Миссия и ценности</h2>
                <div className="policy-section-content">
                Наша миссия — упростить жизнь покупателям, предоставляя качественные товары и удобный сервис. Мы верим в честность, прозрачность и уважение к каждому клиенту.
                <br />
                Основные ценности ApsuaStore:
                <br />
                - Честность и открытость
                <br />
                - Забота о клиентах
                <br />
                - Постоянное развитие и инновации
                <br />
                - Этичность и социальная ответственность
                <br />
                - Качество товаров и услуг

                </div>
              </section>

              <section id="information-usage" className="policy-section">
                <h2 className="policy-section-title">Обслуживание клиентов</h2>
                <div className="policy-section-content">
                Мы стремимся к тому, чтобы каждый клиент получил быструю, вежливую и профессиональную поддержку. Наша служба поддержки работает 7 дней в неделю, чтобы ответить на любые вопросы, связанные с заказами, доставкой, возвратами и гарантией.

Мы предлагаем:
- Удобную и безопасную систему оформления заказов
- Быструю доставку по всей стране
- Понятные условия возврата и обмена товаров
- Постоянную поддержку через почту, мессенджеры и социальные сети

                </div>
              </section>

              <section id="information-sharing" className="policy-section">
                <h2 className="policy-section-title">Политика качества</h2>
                <div className="policy-section-content">
                ApsuaStore гарантирует подлинность и высокое качество всех представленных товаров. Мы сотрудничаем только с проверенными поставщиками и регулярно проверяем продукцию. <br /> <br />

Каждый товар, представленный на сайте, проходит контроль качества. В случае возникновения вопросов мы всегда готовы помочь с заменой, возвратом или решением проблемы.

                </div>
              </section>

              <section id="cookies" className="policy-section">
                <h2 className="policy-section-title">Доставка и возврат</h2>
                <div className="policy-section-content">
                Доставка осуществляется по всей территории страны в кратчайшие сроки. Мы работаем с надежными логистическими партнерами и следим за качеством доставки. <br /><br />

Возврат товара возможен в течение 14 дней с момента получения заказа. Для возврата необходимо сохранить чек и упаковку. Возврат осуществляется согласно законодательству.
<br /><br />
Подробности условий возврата и доставки указаны на сайте в соответствующем разделе.

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

export default AccommodationPolicy;
