import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/src/components/context/AuthContext";

const Perfil = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p>Nome: {user.nome} {user.sobrenome}</p>
      <p>Email: {user.email}</p>
      <p>WhatsApp: {user.whatsapp}</p>
      <p>Endereço: {user.rua}, {user.bairro}, {user.cidade} - {user.estado}</p>
    </div>
  );
};

export default Perfil;