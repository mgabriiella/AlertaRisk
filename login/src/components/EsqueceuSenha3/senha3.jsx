import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./senha3.css"; // Certifique-se de criar e ajustar este arquivo conforme necessário

const Senha3 = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleContinue = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    navigate("/esqueceusenha4"); // Redireciona para a página senha4
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <Link to="/esqueceusenha2" className="back-button">
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

        <h2>Escolha a sua nova senha</h2>

        <p className="instructions">
          A sua senha deve ter no mínimo 8 caracteres
        </p>

        <form onSubmit={handleContinue}>
          <div className="input-group">
            <input
              type="password"
              placeholder="Digite sua nova senha"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirme sua nova senha"
              required
            />
          </div>

          <button type="submit" className="continue-button">
            CONTINUAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Senha3;
