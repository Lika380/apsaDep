import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './accomodationPolicy.css';

const Policy: React.FC = () => {
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
                <h2 className="policy-section-title">Политика конфиденциальности ApsaMarket</h2>
                <div className="policy-section-content">
                    <h3>Мы в ApsaStore уважаем вашу конфиденциальность и обязуемся защищать ваши персональные данные. В настоящей Политике конфиденциальности описано, какие данные мы собираем, как мы их используем и какие у вас есть права.</h3>
                </div>
              </section>

              <section id="information-collection" className="policy-section">
                <h2 className="policy-section-title">1. Сбор персональных данных</h2>
                <div className="policy-section-content">
                Если вы решите воспользоваться сервисом, это будет означать ваше согласие на сбор и использование данных в соответствии с данной политикой. Персональная информация, которую мы запрашиваем, используется исключительно для предоставления и улучшения функционала приложения. Мы не передаём и не распространяем ваши данные третьим лицам, за исключением случаев, указанных в настоящей политике конфиденциальности.
                Наша миссия — упростить жизнь покупателям, предоставляя качественные товары и удобный сервис. Мы верим в честность, прозрачность и уважение к каждому клиенту.
                <br />
                Для корректной работы сервиса мы можем запросить у вас определённую персональную информацию:
                <br />
                Название товара
                <br />
                Адрес электронной почты
                <br />
                Номер телефона
                <br />
                История заказов и взаимодействий с сайтом
                <br />
                Технические данные (IP-адрес, тип устройства, браузер, cookies)

                </div>
              </section>

              <section id="information-usage" className="policy-section">
                <h2 className="policy-section-title">2. Цели сбора данных</h2>
                <div className="policy-section-content">
                Собранные данные используются исключительно для:
                <br />
                обработки и выполнения заказов
                <br />
                связи с вами по вопросам заказов, акций и новостей
                <br />
                улучшения пользовательского опыта
                <br />
                анализа работы сайта
                <br />
                соблюдения правовых требований
                </div>
              </section>

              <section id="information-sharing" className="policy-section">
                <h2 className="policy-section-title">3. Хранение данных</h2>
                <div className="policy-section-content">
                Мы храним ваши данные только столько, сколько необходимо для выполнения вышеуказанных целей или в соответствии с законом. По истечении этого срока данные удаляются или обезличиваются.
                </div>
              </section>

              <section id="cookies" className="policy-section">
                <h2 className="policy-section-title">4. Передача данных третьим лицам</h2>
                <div className="policy-section-content">
                В отдельных случаях мы можем привлекать сторонние компании или специалистов для выполнения следующих задач:
                <br />
                •	Обеспечение работы сервиса;
                <br />
                •	Поддержка и обслуживание пользователей;
                <br />
                •	Анализ использования приложения.
                </div>
              </section>
              
              <section id="cookies" className="policy-section">
                <h2 className="policy-section-title">5. Безопасность данных</h2>
                <div className="policy-section-content">
                Мы прилагаем все разумные усилия для защиты вашей информации, однако ни один способ передачи данных через интернет или хранения не может гарантировать абсолютную безопасность. Поэтому мы не можем полностью исключить риски.
                </div>
              </section>

              <section id="cookies" className="policy-section">
                <h2 className="policy-section-title">6. Изменения политики</h2>
                <div className="policy-section-content">
                Мы оставляем за собой право обновлять настоящую политику. Все изменения публикуются на этой странице. Рекомендуем регулярно проверять актуальность информации. <br />Если у вас возникли вопросы или предложения по поводу этой политики, свяжитесь с нами по адресу электронной почты: <br />  
                apsua.market@gmail.com 

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

export default Policy;
