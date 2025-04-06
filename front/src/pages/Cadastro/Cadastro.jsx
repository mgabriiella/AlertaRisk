import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bairrosRecife } from "../../pages/Service/api";
import { useAuth } from "/src/components/context/AuthContext";
import "./cadastro.css";
import { apiconfig } from "../Service/apiconfig";

var usuario = [];

const Cadastro = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [etapa, setEtapa] = useState("cadastro1");

  const handleCadastroEtapa1 = async (e) => {
    e.preventDefault();
 
    const nome = e.target.querySelector("#nome").value;
    const sobrenome = e.target.querySelector("#sobrenome").value;
    const email = e.target.querySelector("#email").value;
    const phone = e.target.querySelector("#phone").value;
    const password = e.target.querySelector("#password").value;
    const confirmarSenha = e.target.querySelector("#confirmar-senha").value;
<<<<<<< HEAD
 
=======

>>>>>>> 96072c8 (Integracao cadastro e login, falha no perfil)
    if (password !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }
<<<<<<< HEAD
 
    const name = nome + " " + sobrenome;
    usuario = [ name, email, phone, password ];
 
    // setUserData(setUserData);
=======

    const name = `${nome} ${sobrenome}`;
    setUserData({ name, email, phone, password });
>>>>>>> 96072c8 (Integracao cadastro e login, falha no perfil)
    setEtapa("cadastro2");
  };
 
  const handleCadastroEtapa2 = async (e) => {
    e.preventDefault();
 
    const cep = e.target.querySelector("#cep").value;
    const rua = e.target.querySelector("#rua").value;
    const bairro = e.target.querySelector("#bairro").value;
    const cidade = e.target.querySelector("#cidade").value;
    const estado = e.target.querySelector("#estado").value;
<<<<<<< HEAD
 
 
    const finalUserData = {
      name: usuario[0],
      email: usuario[1],
      password: usuario[3],
      phone: usuario[2],
      enderecos: [{
        cep,
        rua,
        bairro,
        cidade,
        estado
      }]
=======

    const finalUserData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      enderecos: [
        {
          cep,
          rua,
          bairro,
          cidade,
          estado,
        },
      ],
>>>>>>> 96072c8 (Integracao cadastro e login, falha no perfil)
    };
 
    try {
<<<<<<< HEAD
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalUserData),
      });
 
      if (response.ok) {
        const responseData = await response.json();
        login(finalUserData);
        localStorage.setItem("userId", responseData.id);
=======
      const response = await apiconfig.post("http://localhost:8080/users", finalUserData);
      if (response.status === 201) {
        const responseData = response.data;
        console.log("Cadastro response data:", responseData); // Debug log
        if (!responseData.token) {
          throw new Error("Token não retornado pelo backend.");
        }
        const userDataWithId = { ...finalUserData, id: responseData.id };
        login(userDataWithId, responseData.token);
        localStorage.setItem("id", responseData.id);
>>>>>>> 96072c8 (Integracao cadastro e login, falha no perfil)
        setEtapa("cadastro3");
 
        setTimeout(() => navigate("/mapa"), 3000);
      } else {
<<<<<<< HEAD
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erro ao finalizar cadastro. Tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao finalizar cadastro:", error);
      alert(error.message || "Ocorreu um erro. Tente novamente mais tarde.");
=======
        throw new Error(response.data.message || "Erro ao finalizar cadastro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao finalizar cadastro:", error);
      alert(error.response?.data?.message || "Ocorreu um erro. Tente novamente mais tarde.");
>>>>>>> 96072c8 (Integracao cadastro e login, falha no perfil)
    }
  };
 

  return (
    <div className="cadastro">
      <div className="container">
        <div className="auth-card">
          {etapa === "cadastro1" && (
            <>
              <Link to="/login" className="back-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#1A2B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="logo-container">
                <img src="./logo.png" alt="Logo" className="logo" />
              </div>
              <h2>Crie sua conta</h2>
              <hr className="divider" />
              <form onSubmit={handleCadastroEtapa1}>
                <div className="input-group">
                  <label htmlFor="nome">Nome:</label>
                  <input type="text" id="nome" placeholder="Seu nome" required />
                </div>
                <div className="input-group">
                  <label htmlFor="sobrenome">Sobrenome:</label>
                  <input type="text" id="sobrenome" placeholder="Seu sobrenome" required />
                </div>
                <div className="input-group">
                  <label htmlFor="email">E-mail:</label>
                  <input type="email" id="email" placeholder="Seu melhor e-mail" required />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">WhatsApp:</label>
                  <input type="tel" id="phone" placeholder="Seu número de WhatsApp" pattern="[0-9]+" required />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Senha:</label>
                  <input type="password" id="password" placeholder="Crie uma senha" required />
                </div>
                <div className="input-group">
                  <label htmlFor="confirmar-senha">Confirmar Senha:</label>
                  <input type="password" id="confirmar-senha" placeholder="Repita a senha" required />
                </div>
                <button type="submit" className="auth-button">CONTINUAR</button>
              </form>
            </>
          )}

          {etapa === "cadastro2" && (
            <>
              <Link onClick={() => setEtapa("cadastro1")} className="back-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#1A2B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="logo-container">
                <img src="./logo.png" alt="Logo" className="logo" />
              </div>
              <h2>Finalize seu Cadastro</h2>
              <form onSubmit={handleCadastroEtapa2}>
                <div className="input-group">
                  <label htmlFor="cep">CEP</label>
                  <input type="text" id="cep" placeholder="Digite seu CEP" />
                </div>
                <div className="input-group">
                  <label htmlFor="rua">Rua</label>
                  <input type="text" id="rua" placeholder="Digite sua rua" />
                </div>
                <div className="input-group">
                  <label htmlFor="bairro">Bairro</label>
                  <select id="bairro" required>
                    <option value="" disabled>Selecione seu bairro</option>
                    {bairrosRecife.map((bairro) => (
                      <option key={bairro} value={bairro}>
                        {bairro}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="cidade">Cidade</label>
                  <input type="text" id="cidade" placeholder="Digite sua cidade" />
                </div>
                <div className="input-group">
                  <label htmlFor="estado">Estado</label>
                  <input type="text" id="estado" placeholder="Digite seu estado" />
                </div>
                <p className="terms">
                  Ao se cadastrar no AlertaRisk significa que você concorda com os nossos{" "}
                  <a href="/termos" target="_blank" rel="noopener noreferrer">
                    Termos e Condições
                  </a>.
                </p>
                <button type="submit" className="auth-button">CONCLUIR</button>
              </form>
            </>
          )}

          {etapa === "cadastro3" && (
            <>
              <Link onClick={() => setEtapa("cadastro2")} className="back-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#1A2B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="logo-container">
                <img src="./logo.png" alt="Logo" className="logo" />
              </div>
              <h2>Cadastro concluído!</h2>
              <p className="instructions">
                Obrigado por se cadastrar no AlertaRisk! Te levaremos para o mapa em instantes...
              </p>
              <div className="loading-spinner"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cadastro;