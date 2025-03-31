import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Mapa from "./pages/Mapa/Mapa";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Orientacoes from "./pages/Orientacoes/Orientacoes";
import Termos from "./pages/Termos/Termos";
import Sobre from "./pages/Sobre/Sobre";
import Perfil from "./pages/Perfil/Perfil";
import { AuthProvider } from "./components/context/AuthContext";
import RecuperarSenha from "./components/RecuperarSenha/RecuperarSenha";
import ForumCreatePost from "./pages/Mapa/Postagem/ForumCreatePost"; // Importar o componente de nova postagem
import Header from "./components/Header/Header";
import Footer from "./components/footer/Footer";
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="app-wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/mapa/nova-postagem" element={<ForumCreatePost />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="*" element={<h1>Página não encontrada</h1>} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
            <Route path="/orientacoes" element={<Orientacoes/>} />
            <Route path="/perfil" element={<Perfil/>} />
            <Route path="/termos" element={<Termos/>} />
            <Route path="/sobre" element={<Sobre/>} />
          </Routes>
        </main>
        <Footer />
      </div>
      </AuthProvider>
    </Router>
  );
}
export default App;