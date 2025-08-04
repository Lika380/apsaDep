// AuthPage.tsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import '../styles/authPage.css';

interface AuthPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isLogin ? (
          <LoginModal
            isOpen={true}
            onClose={onClose}
            onSwitchToRegister={() => setIsLogin(false)}
          />
        ) : (
          <RegisterModal
            isOpen={true}
            onClose={onClose}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
