import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/userDropdown.css";

interface UserDropdownProps {
  userAvatar?: string;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ userAvatar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Закрытие дропдауна при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const handleAdminClick = () => {
    setIsOpen(false);
    navigate("/admin");
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <button
        className="user-avatar-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {userAvatar ? (
          <img src={userAvatar} alt="User Avatar" className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">
            {user?.email ? getInitials(user.email) : "U"}
          </div>
        )}
        <svg
          className={`dropdown-arrow ${isOpen ? "open" : ""}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
        >
          <path
            d="M1 1l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="user-info">
              <div className="user-name">{user?.email}</div>
              <div className="user-role">
                {isAdmin ? "Администратор" : "Пользователь"}
              </div>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-content">
            <button className="dropdown-item" onClick={handleProfileClick}>
              Личный кабинет
            </button>

            {isAdmin && (
              <button
                className="dropdown-item admin-item"
                onClick={handleAdminClick}
              >
                Админ панель
              </button>
            )}
          </div>

          <div className="dropdown-divider"></div>

          <button className="dropdown-item logout-item" onClick={handleLogout}>
            <svg
              className="item-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                fill="currentColor"
              />
            </svg>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};
