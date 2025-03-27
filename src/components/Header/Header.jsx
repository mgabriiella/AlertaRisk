// src/components/header/Header.js
import { Link } from "react-router-dom";
import "./header.css";

// Componente de cabeçalho que exibe o logo e a navegação da aplicação
function Header() {
  return (
    <header>
      <div className="container header-container">
        {/* Link para a página inicial com o logo da aplicação */}
        <Link to="/">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-720yhwOYl5OuD698RkPs8eItz3l7nX.png"
            alt="AlertaRisk Logo"
            width={150}
            height={30}
            className="logo"
          />
        </Link>
        {/* Navegação com links para as principais seções */}
        <nav>
          <Link to="/mapa">Mapa de alerta</Link>
          <Link to="/orientacoes">Orientações de segurança</Link>
          <Link to="/login">Login</Link>
          {/* Botão destacado para cadastro de alertas */}
          <Link to="/alertas" className="btn-alerta">
            RECEBER ALERTAS
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;