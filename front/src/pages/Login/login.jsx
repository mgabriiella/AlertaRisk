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
      // Simulação de resposta do backend (mock)
      const mockResponse = {
        ok: true,
        json: async () => ({
          userId: "12345", // Simula um userId retornado pelo backend
          token: "mock-token",
          user: { email },
        }),
      };

      const response = mockResponse;

      if (response.ok) {
        const data = await response.json();
        const userData = { email, ...data.user };
        login(userData);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
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