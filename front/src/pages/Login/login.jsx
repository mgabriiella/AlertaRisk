import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "/src/components/context/AuthContext";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.querySelector("#email").value;
    const senha = e.target.querySelector("#password").value;

    try {
      // Requisição real para o backend
      const response = await fetch("URL_DO_BACKEND/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: senha }),
      });

      if (response.ok) {
        const data = await response.json();
        // O backend deve retornar userId, token e dados do usuário
        const userData = {
          userId: data.userId,
          token: data.token,
          email: data.email // ou outros dados que o backend fornecer
        };
        login(userData);
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="auth-card">
          <div className="logo-container">
            <img src="./logo.png" alt="Logo" className="logo" />
          </div>
          <h2>Acesse sua conta</h2>
          <button className="google-button">
            Continuar com o Google
          </button>
          <hr className="divider" />
          <form onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Digite seu email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" placeholder="Digite sua senha" required />
              <div className="forgot-password">
                <Link to="/recuperar-senha">Esqueceu a senha?</Link>
              </div>
            </div>
            <button type="submit" className="auth-button">ACESSAR CONTA</button>
            <div className="signup-link">
              Ainda não tem cadastro? <Link to="/cadastro">Clique aqui</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;