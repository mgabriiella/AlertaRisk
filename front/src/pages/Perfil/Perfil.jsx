import React, { useState, useEffect } from "react";
import { useAuth } from "/src/components/context/AuthContext";
import { apiconfig } from "../Service/apiconfig";
import "./perfil.css";

const Perfil = () => {
  const { user, setUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("dados");
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enderecos: [{ cep: "", rua: "", bairro: "", cidade: "", estado: "" }],
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      console.log("User data in Perfil:", user);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        enderecos: user.enderecos && user.enderecos.length > 0
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

    if (activeSection === "dados" && (!formData.name || !formData.email || !formData.phone)) {
      setError("Por favor, preencha todos os campos obrigatórios (Nome, Email, WhatsApp).");
      return;
    }
    if (activeSection === "endereco" && (
      !formData.enderecos[0].cep ||
      !formData.enderecos[0].rua ||
      !formData.enderecos[0].bairro ||
      !formData.enderecos[0].cidade ||
      !formData.enderecos[0].estado
    )) {
      setError("Por favor, preencha todos os campos de endereço.");
      return;
    }

    try {
      const id = localStorage.getItem("id");
      if (!id) {
        setError("ID do usuário não encontrado. Por favor, faça login novamente.");
        logout();
        window.location.href = "/login";
        return;
      }

      console.log("Token in localStorage:", localStorage.getItem("token"));
      console.log("Payload being sent:", formData);

      const response = await apiconfig.put(`http://localhost:8080/users/${id}`, formData);

      if (response.status === 200) {
        setSuccess("Dados atualizados com sucesso!");
        const updatedUser = { ...user, ...formData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(true);
      } else {
        throw new Error("Erro ao atualizar os dados.");
      }
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      console.error("Error response:", err.response?.data);
      if (err.response?.status === 401) {
        setError("Sessão expirada. Por favor, faça login novamente.");
        logout();
        window.location.href = "/login";
        return;
      }
      setError(err.response?.data?.message || "Erro ao atualizar os dados. Tente novamente.");
    }
  };

  // Rest of the component remains unchanged (return statement)
  return (
    <div className="perfil-background-wrapper">
      <div className="perfil-container">
        <aside className="perfil-menu-lateral">
          <h2>Perfil</h2>
          <button
            className={activeSection === "dados" ? "active" : ""}
            onClick={() => setActiveSection("dados")}
          >
            Dados Pessoais
          </button>
          <button
            className={activeSection === "endereco" ? "active" : ""}
            onClick={() => setActiveSection("endereco")}
          >
            Endereço
          </button>
          <button>Histórico</button>
          <button>Propriedade da Conta</button>
          <button>Excluir Conta</button>
        </aside>

        <section className="perfil-conteudo">
          {activeSection === "dados" && (
            <>
              <h1>Meus Dados</h1>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}

              <form className="perfil-form" onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name.split(" ")[0] || ""}
                  onChange={(e) => setFormData({ ...formData, name: `${e.target.value} ${formData.name.split(" ").slice(1).join(" ") || ""}` })}
                  required
                />
                <label>Sobrenome:</label>
                <input
                  type="text"
                  name="sobrenome"
                  value={formData.name.split(" ").slice(1).join(" ") || ""}
                  onChange={(e) => setFormData({ ...formData, name: `${formData.name.split(" ")[0] || ""} ${e.target.value}` })}
                  required
                />
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <label>WhatsApp:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="perfil-btn-confirmar">Confirmar</button>
              </form>
            </>
          )}

          {activeSection === "endereco" && (
            <>
              <h1>Meu Endereço</h1>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}

              <form className="perfil-form" onSubmit={handleSubmit}>
                <label>CEP:</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.enderecos[0].cep}
                  onChange={handleInputChange}
                  required
                />
                <label>Rua:</label>
                <input
                  type="text"
                  name="rua"
                  value={formData.enderecos[0].rua}
                  onChange={handleInputChange}
                  required
                />
                <label>Bairro:</label>
                <input
                  type="text"
                  name="bairro"
                  value={formData.enderecos[0].bairro}
                  onChange={handleInputChange}
                  required
                />
                <label>Cidade:</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.enderecos[0].cidade}
                  onChange={handleInputChange}
                  required
                />
                <label>Estado:</label>
                <input
                  type="text"
                  name="estado"
                  value={formData.enderecos[0].estado}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="perfil-btn-confirmar">Confirmar</button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Perfil;