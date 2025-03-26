// src/components/header/Header.js
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header>
      <div className="container header-container">
        <Link to="/">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-720yhwOYl5OuD698RkPs8eItz3l7nX.png"
            alt="AlertaRisk Logo"
            width={150}
            height={30}
            className="logo"
          />
        </Link>
        <nav>
          <Link to="/mapa">Mapa de alerta</Link>
          <Link to="/orientacoes">Orientações de segurança</Link>
          <Link to="/login">Login</Link>
          <Link to="/alertas" className="btn-alerta">
            RECEBER ALERTAS
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;