import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "/src/components/context/AuthContext";
import "./login.css";
import { apiconfig } from "../Service/apiconfig";
import { decodeToken } from "../utils/jwtUtils"; // Adicionado

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.querySelector("#email").value;
    const senha = e.target.querySelector("#password").value;

    try {
      const response = await apiconfig.post("http://localhost:8080/auth", {
        email,
        password: senha,
      });

      const token = response.data;
      console.log("Token recebido:", token);

      if (!token) {
        throw new Error("Token não retornado pelo backend.");
      }

      const decoded = decodeToken(token); // Decodifica o token
      const userId = decoded?.sub; // Extrai o userId do campo "sub"
      if (!userId) {
        throw new Error("ID do usuário não encontrado no token.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId); // Armazena o userId
      login({ id: userId }, token); // Passa o userId para o contexto
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      const message = typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.message || "E-mail ou senha incorretos.";

      alert(message);
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
            <img src="./devicon_google.png" alt="Google" className="google-icon" />
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