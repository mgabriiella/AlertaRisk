import { Link } from "react-router-dom";
import "./footer.css"; // Importa o CSS específico para o footer
function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-brand">
            <Link to="/">
              <img src="./logo.png" alt="Logo" className="logo" />
            </Link>
          </div>
          <div className="footer-section">
            <h3>Links úteis</h3>
            <ul className="footer-links">
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
          <div className="footer-section">
            <h3>Políticas</h3>
            <ul className="footer-links">
              <li>
                <Link to="/termos">Termos e Condições</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="divider"></div>
        <div className="copyright">
          AlertaRisk. Alguns direitos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;