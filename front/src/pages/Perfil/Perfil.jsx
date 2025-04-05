import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/src/components/context/AuthContext";
import "./perfil.css";

const Perfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redireciona para login se o usuário não estiver autenticado
  if (!user) {
    navigate("/login");
    return null;
  }

  const [secaoAtiva, setSecaoAtiva] = useState("dados");
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [editandoHistorico, setEditandoHistorico] = useState(null);
  const [alertasAtivados, setAlertasAtivados] = useState(true);
  const [mostrarFormularioEndereco, setMostrarFormularioEndereco] = useState(false);

  const [dadosPessoais, setDadosPessoais] = useState({
    nome: user?.nome || "Nome Padrão",
    sobrenome: user?.sobrenome || "Sobrenome Padrão",
    email: user?.email || "email@exemplo.com",
    whatsapp: user?.whatsapp || "123456789",
  });
  const [endereco, setEndereco] = useState({
    cep: user?.cep || "",
    rua: user?.rua || "",
    bairro: user?.bairro || "",
    cidade: user?.cidade || "",
    estado: user?.estado || "",
  });
  const [historico, setHistorico] = useState([
    { id: 1, nome: "Histórico 1 #1", descricao: "Chuvas intensas em Boa Viagem", data: "2025-04-01" },
    { id: 2, nome: "Histórico 2 #2", descricao: "Alagamento na Madalena", data: "2025-04-02" },
  ]);
  const [enderecoAlerta, setEnderecoAlerta] = useState({
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

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
  };

  const handleExcluirHistorico = async (id) => {
    try {
      const response = await fetch(`/api/historico/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setHistorico(historico.filter((item) => item.id !== id));
        alert("Histórico excluído com sucesso!");
      } else {
        throw new Error("Erro ao excluir o histórico");
      }
    } catch (error) {
      alert(error.message || "Erro ao excluir o histórico. Tente novamente.");
    }
  };

  const handleEditarHistorico = (historicoItem) => {
    setEditandoHistorico(historicoItem);
  };

  const handleSalvarEdicao = async (e) => {
    e.preventDefault();
    const novoNome = e.target.nome.value;
    const novaDescricao = e.target.descricao.value;

    try {
      const response = await fetch(`/api/historico/${editandoHistorico.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome, descricao: novaDescricao }),
      });

      if (response.ok) {
        setHistorico(
          historico.map((item) =>
            item.id === editandoHistorico.id
              ? { ...item, nome: novoNome, descricao: novaDescricao }
              : item
          )
        );
        setEditandoHistorico(null);
        alert("Histórico atualizado com sucesso!");
      } else {
        throw new Error("Erro ao atualizar o histórico");
      }
    } catch (error) {
      alert(error.message || "Erro ao atualizar o histórico. Tente novamente.");
    }
  };

  const handleCancelarAlertas = async () => {
    try {
      const response = await fetch("/api/user/alertas/desativar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response.ok) {
        setAlertasAtivados(false);
        setMostrarFormularioEndereco(false);
        alert("Alertas cancelados com sucesso!");
      } else {
        throw new Error("Erro ao cancelar os alertas");
      }
    } catch (error) {
      alert(error.message || "Erro ao cancelar os alertas. Tente novamente.");
    }
  };

  const handleAtivarAlertas = () => {
    setMostrarFormularioEndereco(true);
  };

  const handleSalvarEnderecoAlerta = async (e) => {
    e.preventDefault();
    const novoEndereco = {
      cep: e.target.cep.value,
      rua: e.target.rua.value,
      bairro: e.target.bairro.value,
      cidade: e.target.cidade.value,
      estado: e.target.estado.value,
    };

    try {
      const response = await fetch("/api/user/alertas/ativar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, endereco: novoEndereco }),
      });

      if (response.ok) {
        setEnderecoAlerta(novoEndereco);
        setAlertasAtivados(true);
        setMostrarFormularioEndereco(false);
        alert("Alertas personalizados ativados com sucesso!");
      } else {
        throw new Error("Erro ao ativar os alertas");
      }
    } catch (error) {
      alert(error.message || "Erro ao ativar os alertas. Tente novamente.");
    }
  };

  const handleExcluirConta = (e) => {
    e.preventDefault();
    const senha = e.target.senha.value;
    if (senha) {
      localStorage.clear();
      logout();
      navigate("/login");
      alert("Conta excluída com sucesso!");
    } else {
      alert("Digite sua senha para confirmar.");
    }
  };

  return (
    <div className="perfil-container">
      <aside className="menu-lateral">
        <h2>Perfil</h2>
        <button onClick={() => setSecaoAtiva("dados")}>Dados Pessoais</button>
        <button onClick={() => setSecaoAtiva("endereco")}>Endereço</button>
        <button onClick={() => setSecaoAtiva("historico")}>Histórico</button>
        <button onClick={() => setSecaoAtiva("propriedade")}>Propriedade da Conta</button>
        <button onClick={() => setSecaoAtiva("excluir")}>Excluir Conta</button>
      </aside>

      {/* Renderização condicional das seções do perfil */}
      <section className="conteudo">
        {secaoAtiva === "dados" && (
          <div>
            <h1>Meus Dados</h1>
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

        {secaoAtiva === "historico" && (
          <div className="localizacao">
            <h2>Meus Históricos</h2>
            {historico.length === 0 ? (
              <div className="local">
                <div className="info">
                  <h3>Salvo como: (vazio)</h3>
                  <p>(vazio)</p>
                </div>
                <div className="actions">
                  <button className="map-btn" disabled>Ver no mapa</button>
                  <div className="action-edit">
                    <button className="edit-btn" disabled>
                      <img src="./icones/icone-editar.png" alt="Editar" />
                    </button>
                    <button className="delete-btn" disabled>
                      <img src="./icones/icone-excluir.png" alt="Excluir" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              historico.map((item) => (
                <div key={item.id} className="local">
                  {editandoHistorico && editandoHistorico.id === item.id ? (
                    <form onSubmit={handleSalvarEdicao}>
                      <label>Nome:</label>
                      <input
                        type="text"
                        name="nome"
                        defaultValue={editandoHistorico.nome}
                        required
                      />
                      <label>Descrição:</label>
                      <input
                        type="text"
                        name="descricao"
                        defaultValue={editandoHistorico.descricao}
                        required
                      />
                      <button type="submit" className="btn-confirmar">Salvar</button>
                      <button
                        type="button"
                        className="btn-cancelar"
                        onClick={() => setEditandoHistorico(null)}
                      >
                        Cancelar
                      </button>
                    </form>
                  ) : (
                    <>
                      <div className="info">
                        <h3>Salvo como: {item.nome}</h3>
                        <p>{item.descricao}</p>
                        <p>Data: {item.data}</p>
                      </div>
                      <div className="actions">
                        <button className="map-btn">Ver no mapa</button>
                        <div className="action-edit">
                          <button
                            className="edit-btn"
                            onClick={() => handleEditarHistorico(item)}
                          >
                            <img src="./icones/icone-editar.png" alt="Editar" />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleExcluirHistorico(item.id)}
                          >
                            <img src="./icones/icone-excluir.png" alt="Excluir" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {secaoAtiva === "propriedade" && (
          <div>
            <h1>Propriedade da Conta</h1>
            <div className="propriedade-conta">
              <h3>Gerenciar Alertas</h3>
              {mostrarFormularioEndereco ? (
                <form className="form" onSubmit={handleSalvarEnderecoAlerta}>
                  <label>CEP:</label>
                  <input type="text" name="cep" defaultValue={enderecoAlerta.cep} required />
                  <label>Rua:</label>
                  <input type="text" name="rua" defaultValue={enderecoAlerta.rua} required />
                  <label>Bairro:</label>
                  <input type="text" name="bairro" defaultValue={enderecoAlerta.bairro} required />
                  <label>Cidade:</label>
                  <input type="text" name="cidade" defaultValue={enderecoAlerta.cidade} required />
                  <label>Estado:</label>
                  <input type="text" name="estado" defaultValue={enderecoAlerta.estado} required />
                  <button type="submit" className="btn-confirmar">Ativar Alertas</button>
                  <button
                    type="button"
                    className="btn-cancelar"
                    onClick={() => setMostrarFormularioEndereco(false)}
                  >
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  <p>Status dos alertas: {alertasAtivados ? "Ativados" : "Desativados"}</p>
                  {alertasAtivados && (
                    <button className="btn-cancelar" onClick={handleCancelarAlertas}>
                      Cancelar Alertas
                    </button>
                  )}
                  {!alertasAtivados && (
                    <button className="btn-confirmar" onClick={handleAtivarAlertas}>
                      Ativar Alertas Personalizados
                    </button>
                  )}
                </>
              )}
            </div>
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