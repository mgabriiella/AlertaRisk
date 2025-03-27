import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Cadastro from "./components/Cadastro/Cadastro";
import Cadastro2 from "./components/Cadastro2/Cadastro2";
import EsqueceuSenha1 from "./components/EsqueceuSenha1/senha1";
import Senha2 from "./components/EsqueceuSenha2/senha2";
import Senha3 from "./components/EsqueceuSenha3/senha3";
import Senha4 from "./components/EsqueceuSenha4/senha4";
import CadastroConcluido from "./components/CadastroConcluido/concluido";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro2" element={<Cadastro2 />} />
        <Route path="/esqueceusenha1" element={<EsqueceuSenha1 />} />
        <Route path="/esqueceusenha2" element={<Senha2 />} />
        <Route path="/esqueceusenha3" element={<Senha3 />} />
        <Route path="/esqueceusenha4" element={<Senha4 />} />
        <Route path="/cadastroconcluido" element={<CadastroConcluido />} />
      </Routes>
    </Router>
  );
}

export default App;
