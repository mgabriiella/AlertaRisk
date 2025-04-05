import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState("senha1"); 


  const handleSenhaEtapa1 = async (e) => {
    e.preventDefault(); 
    const email = e.target.querySelector('input[type="email"]').value; 

    try {

      const response = await fetch("/api/recuperar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEtapa("senha2");
      } else {
        alert("Erro ao enviar o e-mail. Verifique se o e-mail está correto.");
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail para recuperação:", error);
      alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
  };


  const handleSenhaEtapa2 = async (e) => {
    e.preventDefault(); 
    const codigo = e.target.querySelector('input[type="text"]').value; 

    try {
      
      const response = await fetch("/api/verificar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo }),
      });

      if (response.ok) {
        setEtapa("senha3"); 
      } else {
        alert("Código inválido. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
  };

  const handleSenhaEtapa3 = async (e) => {
    e.preventDefault(); 
    const novaSenha = e.target.querySelector('input[placeholder="Digite sua nova senha"]').value; 
    const confirmarSenha = e.target.querySelector('input[placeholder="Confirme sua nova senha"]').value; 

    if (novaSenha.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
  
      const response = await fetch("/api/atualizar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ novaSenha }),
      });

      if (response.ok) {
        setEtapa("senha4");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        alert("Erro ao atualizar a senha. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="cadastro">
      <div className="container">
        <div className="auth-card">
 
          {etapa === "senha1" && (
            <>
              <Link to="/login" className="back-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#1A2B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="logo-container">
                <img src="./logo.png" alt="Logo" className="logo" />
              </div>
              <h2>Encontre sua conta</h2>
              <p className="instructions">Informe o e-mail associado à sua conta.</p>
              <form onSubmit={handleSenhaEtapa1}>
                <div className="input-group">
                  <input type="email" placeholder="Email" required />
                </div>
                <button type="submit" className="auth-button">CONTINUAR</button>
              </form>
            </>
          )}

          {etapa === "senha2" && (
            <>
              <Link onClick={() => setEtapa("senha1")} className="back-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#1A2B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="logo-container">
                <img src="./logo.png" alt="Logo" className="logo" />
              </div>
              <h2>Enviamos um código</h2>
              <p className="instructions">Verifique seu e-mail para o código de confirmação.</p>
              <form onSubmit={handleSenhaEtapa2}>
                <div className="input-group">
                  <input type="text" placeholder="Digite seu código" required />
                </div>
                <button type="submit" className="auth-button">CONTINUAR</button>
              </form>
            </>
          )}

          {etapa === "senha3" && (
            <>
              <Link onClick={() => setEtapa("senha2")} className="back-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#1A2B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="logo-container">
                <img src="./logo.png" alt="Logo" className="logo" />
              </div>
              <h2>Escolha sua nova senha</h2>
              <p className="instructions">A senha deve ter no mínimo 8 caracteres.</p>
              <form onSubmit={handleSenhaEtapa3}>
                <div className="input-group">
                  <input type="password" placeholder="Digite sua nova senha" required />
                </div>
                <div className="input-group">
                  <input type="password" placeholder="Confirme sua nova senha" required />
                </div>
                <button type="submit" className="auth-button">CONTINUAR</button>
              </form>
            </>
          )}

          {etapa === "senha4" && (
            <>
              <Link onClick={() => setEtapa("senha3")} className="back-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#1A2B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="logo-container">
                <img src="./logo.png" alt="Logo" className="logo" />
              </div>
              <h2>Redirecionando ao login</h2>
              <p className="instructions">Tente fazer login com sua nova senha.</p>
              <div className="loading-spinner"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecuperarSenha;