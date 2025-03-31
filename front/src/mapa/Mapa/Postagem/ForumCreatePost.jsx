import React, { useState, useEffect } from "react";
import "./ForumCreatePost.css";
import { useNavigate } from "react-router-dom";

// Página para criar uma nova postagem no fórum
const ForumCreatePost = () => {
  const [currentSection, setCurrentSection] = useState("address");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("Recife");
  const [state, setState] = useState("PE");
  const [referencePoint, setReferencePoint] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('userId');

  // Verifica autenticação ao carregar a página
  useEffect(() => {
    if (!isAuthenticated) {
      alert("Faça login para criar uma postagem!");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleContinue = (e) => {
    e.preventDefault();
    if (!street || !neighborhood || !city || !state) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    setCurrentSection("post");
  };

  const handleBack = () => {
    setCurrentSection("address");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação mínima no frontend para UX
    if (!category || !title || !content) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const userId = localStorage.getItem('userId');
    const postData = {
      address: { street, neighborhood, city, state, referencePoint },
      post: { category, title, content, image, userId },
    };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar a postagem');
      }

      // Sucesso: resetar formulário e redirecionar
      setStreet("");
      setNeighborhood("");
      setCity("Recife");
      setState("PE");
      setReferencePoint("");
      setCategory("");
      setTitle("");
      setContent("");
      setImage(null);
      setCurrentSection("address");
      navigate("/mapa");
    } catch (error) {
      alert(error.message || "Erro ao enviar a postagem. Tente novamente.");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Se não estiver autenticado, não renderiza o formulário (redireciona antes)
  if (!isAuthenticated) {
    return null; // Ou uma mensagem de carregamento, se preferir
  }

  return (
    <div className="forum-create-post">
      {currentSection === "address" ? (
        <>
          <div className="header-with-back">
            <button className="back-btn" onClick={() => navigate("/mapa")}>
              ←
            </button>
            <h2>Detalhes do endereço</h2>
          </div>
          <p>Preencha as informações detalhadas do local</p>
          <form onSubmit={handleContinue}>
            <div className="form-group">
              <label>Rua/Avenida *</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Nome da rua ou avenida"
                required
              />
            </div>
            <div className="form-group">
              <label>Bairro *</label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Nome do bairro"
                required
              />
            </div>
            <div className="form-group form-group-row">
              <div className="form-group-half">
                <label>Cidade *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Recife"
                  required
                />
              </div>
              <div className="form-group-half">
                <label>Estado *</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="PE"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Ponto de Referência</label>
              <input
                type="text"
                value={referencePoint}
                onChange={(e) => setReferencePoint(e.target.value)}
                placeholder="Ex: Próximo ao supermercado central"
              />
            </div>
            <button type="submit" className="continue-btn">
              CONTINUAR <span className="arrow">→</span>
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="header-with-back">
            <button className="back-btn" onClick={handleBack}>
              ←
            </button>
            <h2>Nova postagem</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Categoria *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="" disabled>
                  Selecione uma categoria
                </option>
                <option value="alagamento">Alagamento</option>
                <option value="bueiro">Bueiro entupido</option>
                <option value="deslizamento">Deslizamento de terra</option>
                <option value="queda-arvore">Queda de árvore</option>
              </select>
            </div>
            <div className="form-group">
              <label>Título *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título da sua postagem"
                required
              />
            </div>
            <div className="form-group">
              <label>Conteúdo *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Descreva a situação..."
                required
              />
            </div>
            <div className="form-group">
              <label>Imagem</label>
              <label className="image-upload">
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                Clique para adicionar foto
              </label>
            </div>
            <button type="submit" className="publish-btn">
              PUBLICAR
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ForumCreatePost;