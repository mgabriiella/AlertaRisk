import React, { useState, useEffect } from "react";
import { useAuth } from "/src/components/context/AuthContext";
import { apiconfig } from "../Service/apiconfig";
import { useUserData } from "../../hooks/userUserData";
import "./perfil.css";

const Perfil = () => {
  const { logout, setUser } = useAuth();
  const { userData: user, loading } = useUserData();

  const [secaoAtiva, setSecaoAtiva] = useState("dados");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enderecos: [{ cep: "", rua: "", bairro: "", cidade: "", estado: "" }],
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [historico, setHistorico] = useState([
    {
      id: 1,
      nome: "Bueiro entupido",
      descricao: "Rua Augusta 456 - Água no rio escorreu, risco de enchente",
      data: "13/02/2023 10:30",
    },
    {
      id: 2,
      nome: "Bueiro entupido",
      descricao: "Av. Brasil 456 - Água no rio escorreu, risco de enchente",
      data: "13/02/2023 10:30",
    },
  ]);
  const [editandoHistorico, setEditandoHistorico] = useState(null);
  const [mostrarFormularioEndereco, setMostrarFormularioEndereco] = useState(false);
  const [alertasAtivados, setAlertasAtivados] = useState(false);
  const [enderecoAlerta, setEnderecoAlerta] = useState({});
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        enderecos:
          user.enderecos && user.enderecos.length > 0
            ? user.enderecos
            : [{ cep: "", rua: "", bairro: "", cidade: "", estado: "" }],
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.enderecos[0]) {
      setFormData({
        ...formData,
        enderecos: [{ ...formData.enderecos[0], [name]: value }],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      secaoAtiva === "dados" &&
      (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim())
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (
      secaoAtiva === "endereco" &&
      (!formData.enderecos[0].cep.trim() ||
        !formData.enderecos[0].rua.trim() ||
        !formData.enderecos[0].bairro.trim() ||
        !formData.enderecos[0].cidade.trim() ||
        !formData.enderecos[0].estado.trim())
    ) {
      setError("Por favor, preencha todos os campos de endereço.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token || !user?.id) {
        console.warn("Token ou ID do usuário ausente. Redirecionando para login.");
        logout();
        window.location.href = "/login";
        return;
      }

      const response = await apiconfig.put(`/users/${user.id}`, formData);
      if (response.status === 200 || response.status === 201) {
        setSuccess("Dados atualizados com sucesso!");
        const updatedUser = { ...user, ...formData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err.message, err.response?.data);
      setError("Erro ao atualizar os dados. Tente novamente.");
    }
  };

  const handleEditarHistorico = (item) => setEditandoHistorico(item);

  const handleSalvarEdicao = (e) => {
    e.preventDefault();
    const updatedHistorico = historico.map((item) =>
      item.id === editandoHistorico.id
        ? {
            ...item,
            nome: e.target.nome.value,
            descricao: e.target.descricao.value,
          }
        : item
    );
    setHistorico(updatedHistorico);
    setEditandoHistorico(null);
  };

  const handleExcluirHistorico = (id) => {
    setHistorico(historico.filter((item) => item.id !== id));
  };

  const handleAtivarAlertas = () => setMostrarFormularioEndereco(true);
  const handleCancelarAlertas = () => setAlertasAtivados(false);

  const handleSalvarEnderecoAlerta = (e) => {
    e.preventDefault();
    setAlertasAtivados(true);
    setMostrarFormularioEndereco(false);
  };

  const handleExcluirConta = async (e) => {
    e.preventDefault();
    const senha = e.target.senha.value;

    if (!senha) {
      setError("Por favor, insira sua senha para confirmar.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token || !user?.id) {
        setError("Usuário não autenticado. Faça login novamente.");
        logout();
        window.location.href = "/login";
        return;
      }

      const response = await apiconfig.delete(`/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204 || response.status === 200) {
        localStorage.removeItem("token");
        logout();
        window.location.href = "/";
      } else {
        setError("Erro ao excluir a conta. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      setError(err.response?.data?.message || "Erro ao excluir a conta.");
    }
  };

  return (
    <div className="perfil-background-wrapper">
      <div className="perfil-container">
        <aside className="perfil-menu-lateral">
          <h2>Perfil</h2>
          <button
            onClick={() => setSecaoAtiva("dados")}
            className={secaoAtiva === "dados" ? "active" : ""}
          >
            Dados Pessoais
          </button>
          <button
            onClick={() => setSecaoAtiva("endereco")}
            className={secaoAtiva === "endereco" ? "active" : ""}
          >
            Endereço
          </button>
          <button
            onClick={() => setSecaoAtiva("historico")}
            className={secaoAtiva === "historico" ? "active" : ""}
          >
            Histórico
          </button>
          <button
            onClick={() => setSecaoAtiva("propriedade")}
            className={secaoAtiva === "propriedade" ? "active" : ""}
          >
            Propriedade da Conta
          </button>
          <button
            onClick={() => setSecaoAtiva("excluir")}
            className={secaoAtiva === "excluir" ? "active" : ""}
          >
            Excluir Conta
          </button>
        </aside>

        <section className="perfil-conteudo">
          {secaoAtiva === "dados" && (
            <>
              <h1>Meus Dados</h1>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <form className="perfil-form" onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name.split(" ")[0]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: `${e.target.value} ${
                        formData.name.split(" ").slice(1).join(" ") || ""
                      }`,
                    })
                  }
                  required
                />
                <label>Sobrenome:</label>
                <input
                  type="text"
                  name="sobrenome"
                  value={formData.name.split(" ").slice(1).join(" ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: `${formData.name.split(" ")[0]} ${e.target.value}`.trim(),
                    })
                  }
                  required
                />
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email.trim()}
                  onChange={handleInputChange}
                  required
                />
                <label>WhatsApp:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone.trim()}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="perfil-btn-confirmar">
                  Confirmar
                </button>
              </form>
            </>
          )}

          {secaoAtiva === "endereco" && (
            <>
              <h1>Meu Endereço</h1>
              <form className="perfil-form" onSubmit={handleSubmit}>
                {["cep", "rua", "bairro", "cidade", "estado"].map((field) => (
                  <React.Fragment key={field}>
                    <label>{field.toUpperCase()}:</label>
                    <input
                      type="text"
                      name={field}
                      value={formData.enderecos[0][field].trim()}
                      onChange={handleInputChange}
                      required
                    />
                  </React.Fragment>
                ))}
                <button type="submit" className="perfil-btn-confirmar">
                  Confirmar
                </button>
              </form>
            </>
          )}

          {secaoAtiva === "historico" && (
            <div className="perfil-historico-container">
              <h2>Meus Históricos</h2>
              {historico.length === 0 ? (
                <div className="perfil-historico-vazio">
                  <p>Nenhum histórico salvo no momento.</p>
                </div>
              ) : (
                <div className="perfil-historico-lista">
                  {historico.map((item) => (
                    <div key={item.id} className="perfil-historico-card">
                      {editandoHistorico?.id === item.id ? (
                        <form
                          onSubmit={handleSalvarEdicao}
                          className="perfil-historico-form"
                        >
                          <div className="perfil-historico-form-group">
                            <label>Nome:</label>
                            <input
                              type="text"
                              name="nome"
                              defaultValue={editandoHistorico.nome}
                              required
                            />
                          </div>
                          <div className="perfil-historico-form-group">
                            <label>Descrição:</label>
                            <input
                              type="text"
                              name="descricao"
                              defaultValue={editandoHistorico.descricao}
                              required
                            />
                          </div>
                          <div className="perfil-historico-form-actions">
                            <button
                              type="submit"
                              className="perfil-btn-confirmar"
                            >
                              Salvar
                            </button>
                            <button
                              type="button"
                              className="perfil-btn-cancelar"
                              onClick={() => setEditandoHistorico(null)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="perfil-historico-content">
                          <div className="perfil-historico-info">
                            <h3>{item.nome}</h3>
                            <p>{item.descricao}</p>
                            <span>Data: {item.data}</span>
                          </div>
                          <div className="perfil-historico-actions">
                            <button className="perfil-map-btn">
                              Ver no mapa
                            </button>
                            <div className="perfil-action-buttons">
                              <button
                                className="perfil-edit-btn"
                                onClick={() => handleEditarHistorico(item)}
                              >
                                <img
                                  src="./icones/icone-editar.png"
                                  alt="Editar"
                                />
                              </button>
                              <button
                                className="perfil-delete-btn"
                                onClick={() => handleExcluirHistorico(item.id)}
                              >
                                <img
                                  src="./icones/icone-excluir.png"
                                  alt="Excluir"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {secaoAtiva === "propriedade" && (
            <div>
              <h1>Propriedade da Conta</h1>
              <div className="perfil-propriedade-conta">
                <h3>Gerenciar Alertas</h3>
                {mostrarFormularioEndereco ? (
                  <form
                    className="perfil-form"
                    onSubmit={handleSalvarEnderecoAlerta}
                  >
                    {["cep", "rua", "bairro", "cidade", "estado"].map(
                      (field) => (
                        <React.Fragment key={field}>
                          <label>{field.toUpperCase()}:</label>
                          <input
                            type="text"
                            name={field}
                            defaultValue={enderecoAlerta[field]}
                            required
                          />
                        </React.Fragment>
                      )
                    )}
                    <div className="perfil-btn-container">
                      <button
                        type="submit"
                        className="perfil-btn-confirmar"
                      >
                        Ativar Alertas
                      </button>
                      <button
                        type="button"
                        className="perfil-btn-cancelar"
                        onClick={() => setMostrarFormularioEndereco(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="perfil-alertas-status">
                      Status dos alertas:{" "}
                      {alertasAtivados ? "Ativados" : "Desativados"}
                    </p>
                    {alertasAtivados ? (
                      <button
                        className="perfil-btn-cancelar perfil-btn-abaixo"
                        onClick={handleCancelarAlertas}
                      >
                        Cancelar Alertas
                      </button>
                    ) : (
                      <button
                        className="perfil-btn-confirmar perfil-btn-abaixo"
                        onClick={handleAtivarAlertas}
                      >
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
                <div className="perfil-content-text">
                  <h3>Isso excluirá sua conta</h3>
                  <p>
                    Você está prestes a iniciar o processo de exclusão da sua
                    conta do AlertaRisk.
                    <br /> Seus dados e perfil não estarão mais acessíveis na
                    plataforma.
                  </p>
                  <button
                    className="perfil-btn-continuar"
                    onClick={() => setConfirmarExclusao(true)}
                  >
                    Continuar
                  </button>
                </div>
              ) : (
                <div className="perfil-container-senha">
                  <h3>Confirme sua senha</h3>
                  <form onSubmit={handleExcluirConta}>
                    <label>Senha</label>
                    <input type="password" name="senha" required />
                    <button
                      type="submit"
                      className="perfil-btn-excluir"
                    >
                      Excluir conta
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Perfil;