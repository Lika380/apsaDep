import React, { useState } from "react";
import { api } from "../utils/api";
import '../styles/loginModal.css'

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
};

export const RegisterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const data = await api.register(email, phone, password, name); 

    if (data.message === "Пользователь успешно создан") {
      setMessage("Регистрация успешна!");
      setEmail("");
      setPhone("");
      setPassword("");
      setName("");
      onClose();
    } else {
      setMessage(data.message || "Ошибка регистрации");
    }
  } catch {
    setMessage("Ошибка подключения к серверу");
  }
};

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  {/* Опционально для телефона */}
  <input
    type="tel"
    placeholder="Телефон"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Регистрация</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            placeholder="Логин"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-login"
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-password"
            required
          />
          <input
  type="text"
  placeholder="Имя"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="auth-name"
  required
/>
          <button type="submit" className="auth-btn">
            Зарегистрироваться
          </button>
          <p>{message}</p>
        </form>
        <p>
          Уже есть аккаунт?{" "}
          <button className="switch-btn" onClick={onSwitchToLogin}>
            Войти
          </button>
        </p>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};
