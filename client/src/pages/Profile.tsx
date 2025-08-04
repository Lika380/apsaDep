import React from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/profile.css";

export const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
            </div>
          </div>
          <div className="profile-info">
            <h1>{user?.email}</h1>
            <p className="user-role">
              {user?.role === "admin" ? "Администратор" : "Пользователь"}
            </p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Быстрые действия</h2>
            <div className="quick-actions">
              <button
                className="action-btn"
                onClick={() => (window.location.href = "/catalog")}
              >
                 Перейти к покупкам
              </button>
              <button
                className="action-btn"
                onClick={() => (window.location.href = "/cartPage")}
              >
                Моя корзина
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
