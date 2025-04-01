import React from 'react';
import { Link } from 'react-router-dom';
import './CallToAction.css';



const CallToAction = () => {
  return (
    <section className="cta">
      <h3>
        Ainda não ativou o <span className="highlight">AlertaRisk</span>?
      </h3>
      <p>Por que esperar?</p>
      <button className="register-button">
        <Link to="/cadastro">Cadastre-se Agora</Link>
        </button>
    </section>
  );
};

export default CallToAction;