import React from "react";
import "../styles/footer.css";
import IG from '../images/IG.png';
import TG from '../images/tg.png';
import WA from '../images/WA.png';
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";


const Footer = () => {

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>О компании</h3>
          <ul>
            <li>
              <a href="/contacts">Контакты</a>
            </li>
            <li>
              <a href="/projects">Проекты</a>
            </li>
          </ul>
   
        </div>

        <div className="footer-section">
          <h3>Партнерам</h3>
          <ul>
            <li>
              <a href="/investorPage">Спонсорам и инвесторам</a>
            </li>
            <li>
              <a href="/makersPage">Производителям</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <div className="contact-item">
            <strong>+7 (940) 900-14-16</strong>
            <span>apsamarket1@gmail.com</span>
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

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© 2025 ApsaMarket. Все права защищены</p>
          <div className="footer-links">
            <a href="/privacy">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
