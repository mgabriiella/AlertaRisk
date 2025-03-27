import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./senha1.css"; // Certifique-se de ajustar o caminho conforme a estrutura do seu projeto

const Senha1 = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleContinue = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    navigate("/esqueceusenha2"); // Redireciona para a página esqueceusenha2
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <Link to="/" className="back-button">
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

        <h2>Encontre sua conta do AlertaRisk</h2>

        <p className="instructions">
          Informe o e-mail associado à sua conta para alterar sua senha.
        </p>

        <form onSubmit={handleContinue}>
          <div className="input-group">
            <input type="email" placeholder="Email" required />
          </div>

          <button type="submit" className="continue-button">
            CONTINUAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Senha1;
