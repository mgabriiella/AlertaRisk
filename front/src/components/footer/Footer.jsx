import { Link } from "react-router-dom";
import "./footer.css"; // Importa o CSS específico para o footer

function Footer() {
  return (
    <footer className="alerta-risk-footer">
      <div className="alerta-risk-footer-container">
        <div className="alerta-risk-footer-brand">
          <Link to="/">
            <img src="./logo.png" alt="Logo AlertaRisk" className="alerta-risk-logo" />
          </Link>
        </div>
        <div className="alerta-risk-footer-section">
          <h3>Links úteis</h3>
          <ul className="alerta-risk-footer-links">
            <li>
              <Link to="/sobre">Sobre nós</Link>
            </li>
            <li>
              <Link to="/mapa">Mapa de alerta</Link>
            </li>
            <li>
              <Link to="/orientacoes">Orientações</Link>
            </li>
          </ul>
        </div>
        <div className="alerta-risk-footer-section">
          <h3>Políticas</h3>
          <ul className="alerta-risk-footer-links">
            <li>
              <Link to="/termos">Termos e Condições</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="alerta-risk-footer-divider"></div>
      <div className="alerta-risk-footer-copyright">
        AlertaRisk. Alguns direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;