import React from "react";
import { Link } from "react-router-dom";
import "./senha4.css"; // Certifique-se de ajustar o caminho e os estilos conforme necessário

const Senha4 = () => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <Link to="/esqueceusenha3" className="back-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#1A2B3C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <div className="logo-container">
          <img
            src="../logo (1).png"
            alt="AlertaRisk Logo"
            className="logo"
          />
        </div>

        <h2>Redirecionando para tela de login</h2>

        <p className="instructions">
          Tente fazer login com sua nova senha.
        </p>

        {/* Bolinha de carregamento */}
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default Senha4;
