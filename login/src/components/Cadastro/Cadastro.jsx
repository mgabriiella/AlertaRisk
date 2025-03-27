import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./cadastro.css"; // Verifique se o caminho do CSS está correto

const Cadastro = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar validações ou enviar dados para uma API
    navigate("/cadastro2"); // Redireciona para a segunda etapa do cadastro
  };

  return (
    <div className="container">
      <div className="login-card">
        {/* Logo */}
        <div className="logo-container">
          <img src="../logo (1).png" alt="Logo" className="logo" />
        </div>

        <h2>Crie sua conta</h2>
        <hr className="divider" />

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" placeholder="Seu nome" required />
          </div>

          <div className="input-group">
            <label htmlFor="sobrenome">Sobrenome:</label>
            <input type="text" id="sobrenome" name="sobrenome" placeholder="Seu sobrenome" required />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" placeholder="Seu melhor e-mail" required />
          </div>

          <div className="input-group">
            <label htmlFor="whatsapp">WhatsApp:</label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              placeholder="Seu número de WhatsApp"
              pattern="[0-9]+"
              title="Digite apenas números"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" placeholder="Crie uma senha" required />
          </div>

          <div className="input-group">
            <label htmlFor="confirmar-senha">Confirmar Senha:</label>
            <input type="password" id="confirmar-senha" name="confirmar-senha" placeholder="Repita a senha" required />
          </div>

          <button type="submit" className="login-button">Criar Conta</button>
        </form>

        <div className="signup-link">
          Já tem uma conta? <Link to="/">Faça login</Link>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
