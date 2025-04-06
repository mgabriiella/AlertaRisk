import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "/src/components/context/AuthContext";
import "./login.css";
import { apiconfig } from "../Service/apiconfig";

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

      const data = response.data;
      console.log("Login response data:", data); // Debug log
      if (!data.token) {
        throw new Error("Token não retornado pelo backend.");
      }
      const userData = {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        enderecos: data.enderecos || [],
      };
      const authToken = data.token;

      localStorage.setItem("id", data.id);
      localStorage.setItem("token", authToken); // Ensure token is stored
      login(userData, authToken);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert(error.response?.data?.message || "E-mail ou senha incorretos.");
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