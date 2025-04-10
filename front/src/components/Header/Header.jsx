import { Link } from "react-router-dom";
import { useAuth } from "/src/components/context/AuthContext";
import { useState } from "react";
import "./header.css";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`nav-mobile ${isMenuOpen ? "active" : ""}`}>
          <Link to="/mapa" onClick={toggleMenu}>Mapa de alerta</Link>
          <Link to="/orientacoes" onClick={toggleMenu}>Orientações de segurança</Link>
          {isAuthenticated ? (
            <>
              <Link to="/perfil" onClick={toggleMenu}>Perfil</Link>
              <button onClick={() => { logout(); toggleMenu(); }} className="btn-sair">Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu}>Login</Link>
              <Link to="/cadastro" className="btn-alerta" onClick={toggleMenu}>
                RECEBER ALERTAS
              </Link>
            </>
          )}
        </nav>
        <nav className="nav-desktop">
          <Link to="/mapa">Mapa de alerta</Link>
          <Link to="/orientacoes">Orientações de segurança</Link>
          {isAuthenticated ? (
            <>
              <Link to="/perfil">Perfil</Link>
              <button onClick={logout} className="btn-sair">Sair</button>
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