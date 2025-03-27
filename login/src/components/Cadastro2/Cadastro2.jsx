import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cadastro.css"; 

const Cadastro2 = () => {
  const navigate = useNavigate(); 

  const handleConcluir = (e) => {
    e.preventDefault(); 
    navigate("/cadastroconcluido"); 
  };

  return (
    <div className="container">
      <div className="login-card">
    
        <Link to="/cadastro">
          <div className="logo">
            <img src="../tabler_arrow-up.png" alt="Logo" />
          </div>
        </Link>

        <h2>Finalize seu Cadastro</h2>

        <form onSubmit={handleConcluir}>
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
            <input type="text" id="bairro" placeholder="Digite seu bairro" />
          </div>

          <div className="input-group">
            <label htmlFor="cidade">Cidade</label>
            <input type="text" id="cidade" placeholder="Digite sua cidade" />
          </div>

          <div className="input-group">
            <label htmlFor="estado">Estado</label>
            <input type="text" id="estado" placeholder="Digite seu estado" />
          </div>

          <button type="submit" className="login-button">Concluir</button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro2;
