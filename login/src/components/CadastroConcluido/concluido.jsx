import React from "react";
import { Link } from "react-router-dom";
import "./cadastroConcluido.css"; // Ajuste o caminho conforme a estrutura do seu projeto

const CadastroConcluido = () => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <Link to="/cadastro2" className="back-button">
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

        <h2>Cadastro concluído!</h2>

        <p className="instructions">
          Obrigado por se cadastrar no AlertaRisk! Agora você pode explorar o
          mapa interativo e receber alertas sobre áreas de risco. Te levaremos para
          o mapa em instantes...
        </p>

        {/* Bolinha de carregamento */}
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default CadastroConcluido;
