import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./senha2.css"; // Ajuste o caminho conforme sua estrutura

const Senha2 = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleContinue = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    navigate("/esqueceusenha3"); // Redireciona para a página senha3
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <Link to="/esqueceusenha1" className="back-button">
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

        <h2>Enviamos um código para você</h2>

        <p className="instructions">
          Verifique seu e-mail para obter o código de confirmação. Caso precise de um
          novo código, retorne e repita o processo.
        </p>

        <form onSubmit={handleContinue}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Digite seu código"
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

export default Senha2;
