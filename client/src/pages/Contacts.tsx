import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/contacts.css';
import IG from '../images/IG.png';
import TG from '../images/tg.png';
import WA from '../images/WA.png';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contacts: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Ошибка отправки сообщения');
      }
  
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
  
      // Через 3 секунды скрыть сообщение об успехе
      setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert('Не удалось отправить сообщение. Попробуйте позже.');
    }
  };
  
  return (
    <div className="contact-container">
      <main className="contact-main">
        <section className="apsuastore-location-section">
                <div className="apsuastore-contact-info">
                  <h2>КОНТАКТЫ</h2>
                  <hr className='content-hr' />
                  <div className="apsamarket-contact-block">
                     <div className="apsuastore-contact-item">
                        <img src="https://i.postimg.cc/0QLHg0JH/ic-round-phone.png" alt="location" className="apsuastore-contact-icon" />
                        <a href="tel:+79409203814" className="apsuastore-contact-text">
  +7 (940) 920-38-14
</a>
                      </div>
                      <div className="apsuastore-contact-item">
                         <img src="https://i.postimg.cc/x1DPRZy7/Group-2.png" alt="location" className="apsuastore-contact-icon" />
                         <a href="mailto:apsamarket1@gmail.com" className="apsuastore-contact-text">
  apsamarket1@gmail.com
</a>

                        </div>
                      <div className="social-links">
                      <a
  href="https://wa.me/79409203814"
  target="_blank"
  rel="noopener noreferrer"
  className="social-link"
>
  <img src={WA} alt="iconWA" className="footer-icon" />
</a>

                        <a href="#" className="social-link">
                        <img src={TG} alt="iconTG" className="footer-icon" />
                        </a>
                        <a
                          href="https://www.instagram.com/li.kasl/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                        >
                        <img src={IG} alt="iconIG" className="footer-icon" />
                        </a>

                      </div>
                      </div>
          </div>
      </section>   

        <section className="contact-form-section">
          <div className="">
            <h2 className="contact-section-title">Отправьте нам сообщение</h2>

            {formSubmitted ? (
              <div className="contact-form-success">
                <div className="contact-success-icon">✓</div>
                <h3 className="contact-success-title">Спасибо за сообщение!</h3>
                <p className="contact-success-text">
                  Мы получили ваше сообщение и ответим вам в ближайшее время.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="contact-form-grid">
                  <div className="contact-form-group">
                    <label className="contact-form-label">Ваше имя*</label>
                    <input
                      type="text"
                      name="name"
                      className="contact-form-input"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-form-label">Email*</label>
                    <input
                      type="email"
                      name="email"
                      className="contact-form-input"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="contact-form-group contact-form-full">
                    <label className="contact-form-label">Тема сообщения</label>
                    <input
                      type="text"
                      name="subject"
                      className="contact-form-input"
                      value={formData.subject}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="contact-form-group contact-form-full">
                    <label className="contact-form-label">Сообщение*</label>
                    <textarea
                      name="message"
                      className="contact-form-textarea"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={5}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="contact-form-submit">
                  <button type="submit" className="contact-form-button">
                    Отправить сообщение
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

    </div>
  );
};

export default Contacts;
