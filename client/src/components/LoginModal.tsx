import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import "../styles/loginModal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
};

export const LoginModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isEmail = emailOrPhone.includes('@');

      const data = await api.login(
        isEmail ? emailOrPhone : null,
        isEmail ? null : emailOrPhone,
        password
      );
      

      if (data.token) {
        login(data.token, {
          id: data.id,
          email: data.email,
          role: data.role,
        });

        if (data.role === "user") {
          navigate("/");
        } else {
          navigate("/admin");
        }
        onClose();
      } else {
        setMessage(data.message || "Ошибка входа");
      }
    } catch {
      setMessage("Ошибка подключения к серверу");
    }
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Вход</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="text"
            placeholder="Login"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="auth-login"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-password"
          />
          <button type="submit" className="auth-btn">
            Войти
          </button>
          <p>{message}</p>
        </form>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <p>
          Нет аккаунта?{" "}
          <button className="switch-btn" onClick={onSwitchToRegister}>
            Зарегистрироваться
          </button>
        </p>
      </div>
    </div>
  );
};
