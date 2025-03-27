import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Mapa from "./pages/Mapa/Mapa";
import ForumCreatePost from "./pages/Mapa/Postagem/ForumCreatePost"; // Importar o componente de nova postagem
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/mapa/nova-postagem" element={<ForumCreatePost />} />
            <Route path="*" element={<h1>Página não encontrada</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;