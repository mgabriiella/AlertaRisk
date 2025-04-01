import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/src/components/context/AuthContext"; // Caminho ajustado conforme seu exemplo
import "./perfil.css";

const Perfil = () => {
  const { user, logout } = useAuth(); // Pega user e logout do contexto
  const navigate = useNavigate();

  // Redireciona para login se não houver usuário autenticado
  if (!user) {
    navigate("/login");
    return null;
  }

  const [secaoAtiva, setSecaoAtiva] = useState("dados"); // Controla a seção ativa
  const [confirmarExclusao, setConfirmarExclusao] = useState(false); // Etapa de confirmação de exclusão

  // Dados iniciais baseados no user do contexto (ou mockados se vazio)
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: user?.nome || "",
    sobrenome: user?.sobrenome || "",
    email: user?.email || "",
    whatsapp: user?.whatsapp || "",
  });
  const [endereco, setEndereco] = useState({
    cep: user?.cep || "",
    rua: user?.rua || "",
    bairro: user?.bairro || "",
    cidade: user?.cidade || "",
    estado: user?.estado || "",
  });
  const [locaisSalvos, setLocaisSalvos] = useState([
    { id: 1, nome: "Casa", endereco: "124 R. Vic de Ibiamauna, Recife, PE", imagem: "/image/image (1).png" },
    { id: 2, nome: "Trabalho", endereco: "Av. Alfredo Lisboa, 810, Recife, PE", imagem: "/image/image (2).png" },
  ]);
  const [historico, setHistorico] = useState([]); // Histórico vazio por enquanto

  // Handlers para formulários
  const handleDadosSubmit = (e) => {
    e.preventDefault();
    const novosDados = {
      nome: e.target.nome.value,
      sobrenome: e.target.sobrenome.value,
      email: e.target.email.value,
      whatsapp: e.target.whatsapp.value,
    };
    setDadosPessoais(novosDados);
    alert("Dados atualizados com sucesso!");
    // Aqui você pode enviar ao backend
  };

  const handleEnderecoSubmit = (e) => {
    e.preventDefault();
    const novoEndereco = {
      cep: e.target.cep.value,
      rua: e.target.rua.value,
      bairro: e.target.bairro.value,
      cidade: e.target.cidade.value,
      estado: e.target.estado.value,
    };
    setEndereco(novoEndereco);
    alert("Endereço atualizado com sucesso!");
    // Aqui você pode enviar ao backend
  };

  const handleExcluirConta = (e) => {
    e.preventDefault();
    const senha = e.target.senha.value;
    if (senha) { // Validação simples, substitua por lógica real
      localStorage.clear();
      logout();
      navigate("/login"); // Redireciona para login após exclusão
      alert("Conta excluída com sucesso!");
    } else {
      alert("Digite sua senha para confirmar.");
    }
  };

  return (
    <div className="perfil-container">
      {/* Menu Lateral */}
      <aside className="menu-lateral">
        <h2>Perfil</h2>
        <button onClick={() => setSecaoAtiva("dados")}>Dados Pessoais</button>
        <button onClick={() => setSecaoAtiva("endereco")}>Endereço</button>
        <button onClick={() => setSecaoAtiva("locais")}>Locais Salvos</button>
        <button onClick={() => setSecaoAtiva("historico")}>Histórico</button>
        <button onClick={() => setSecaoAtiva("excluir")}>Excluir Conta</button>
      </aside>

      {/* Conteúdo Principal */}
      <section className="conteudo">
        {secaoAtiva === "dados" && (
          <div>
            <h1>Meus Dados</h1>
            <div className="profile">
              <img src="/image/usuario.png" alt="Foto de Perfil" />
            </div>
            <form className="form" onSubmit={handleDadosSubmit}>
              <label>Nome:</label>
              <input type="text" name="nome" defaultValue={dadosPessoais.nome} />
              <label>Sobrenome:</label>
              <input type="text" name="sobrenome" defaultValue={dadosPessoais.sobrenome} />
              <label>Email:</label>
              <input type="email" name="email" defaultValue={dadosPessoais.email} />
              <label>WhatsApp:</label>
              <input type="number" name="whatsapp" defaultValue={dadosPessoais.whatsapp} />
              <button type="submit" className="btn-confirmar">Confirmar</button>
            </form>
          </div>
        )}

        {secaoAtiva === "endereco" && (
          <div>
            <h1>Meu Endereço</h1>
            <form className="form" onSubmit={handleEnderecoSubmit}>
              <label>CEP:</label>
              <input type="number" name="cep" defaultValue={endereco.cep} />
              <label>Rua:</label>
              <input type="text" name="rua" defaultValue={endereco.rua} />
              <label>Bairro:</label>
              <input type="text" name="bairro" defaultValue={endereco.bairro} />
              <label>Cidade:</label>
              <input type="text" name="cidade" defaultValue={endereco.cidade} />
              <label>Estado:</label>
              <input type="text" name="estado" defaultValue={endereco.estado} />
              <button type="submit" className="btn-confirmar">Confirmar</button>
            </form>
          </div>
        )}

        {secaoAtiva === "locais" && (
          <div className="localizacao">
            <h2>Meus Locais</h2>
            {locaisSalvos.map((local) => (
              <div key={local.id} className="local">
                <img src={local.imagem} alt={`Imagem de ${local.nome}`} />
                <div className="info">
                  <h3>Salvo como: {local.nome}</h3>
                  <p>{local.endereco}</p>
                </div>
                <div className="actions">
                  <button className="map-btn">Ver no mapa</button>
                  <button className="edit-btn">
                    <img src="/image/icone-editar.png" alt="Editar" />
                  </button>
                  <button className="delete-btn">
                    <img src="/image/icone-excluir.png" alt="Excluir" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {secaoAtiva === "historico" && (
          <div className="localizacao">
            <h2>Meus Históricos</h2>
            {historico.length === 0 ? (
              <div className="local">
                <img src="/image/Rectangle 251.png" alt="Sem histórico" />
                <div className="info">
                  <h3>Salvo como: (vazio)</h3>
                  <p>(vazio)</p>
                </div>
                <div className="actions">
                  <button className="map-btn">Ver no mapa</button>
                  <button className="edit-btn">
                    <img src="/image/icone-editar.png" alt="Editar" />
                  </button>
                  <button className="delete-btn">
                    <img src="/image/icone-excluir.png" alt="Excluir" />
                  </button>
                </div>
              </div>
            ) : (
              <p>Histórico ainda não implementado.</p>
            )}
          </div>
        )}

        {secaoAtiva === "excluir" && (
          <div>
            {!confirmarExclusao ? (
              <div className="content-text">
                <h3>Isso excluirá sua conta</h3>
                <p>
                  Você está prestes a iniciar o processo de exclusão da sua conta do AlertaRisk.
                  <br /> Seus dados e perfil não estarão mais acessíveis na plataforma, e você
                  <br /> deixará de receber alertas e atualizações sobre áreas de risco.
                </p>
                <button className="btn-continuar" onClick={() => setConfirmarExclusao(true)}>
                  Continuar 
                </button>
              </div>
            ) : (
              <div className="container-senha">
                <h3>Confirme sua senha</h3>
                <form onSubmit={handleExcluirConta}>
                  <label>Senha</label>
                  <input type="password" name="senha" />
                  <button type="submit" className="btn-excluir">Excluir conta</button>
                </form>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Perfil;