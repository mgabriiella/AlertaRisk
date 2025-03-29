// src/components/header/Header.js
import { Link } from "react-router-dom";
import { useAuth } from "/src/components/context/AuthContext";
import "./header.css";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-720yhwOYl5OuD698RkPs8eItz3l7nX.png"
            alt="AlertaRisk Logo"
            className="logo"
          />
        </Link>
        <nav>
          <Link to="/mapa">Mapa de alerta</Link>
          <Link to="/orientacoes">Orientações de segurança</Link>
          {isAuthenticated ? (
            <>
              <Link to="/perfil">Perfil</Link>
              <button onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/cadastro" className="btn-alerta">
                RECEBER ALERTAS
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;