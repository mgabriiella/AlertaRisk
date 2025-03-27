import React from "react";
import { Link } from "react-router-dom";
import "./styler.css"; // Certifique-se de que o arquivo CSS está correto

const Login = () => {
  return (
    <div className="container">
      <div className="logo-container">
        <img src="../logo (1).png" alt="Logo" className="logo" />
      </div>

      <h2>Acesse sua conta</h2>

      <button className="google-button">
        <img src="../devicon_google.png" alt="Google Icon" />
        Continuar com o Google
      </button>

      <hr className="divider" />

      <form>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Digite seu email" required />
        </div>

        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="Digite sua senha" required />
          <div className="forgot-password">
            <Link to="/esqueceusenha1">Esqueceu a senha?</Link>
          </div>
        </div>

        <button type="submit" className="login-button">ACESSAR CONTA</button>

        <div className="signup-link">
          Ainda não tem cadastro? <Link to="/cadastro">Clique aqui</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
