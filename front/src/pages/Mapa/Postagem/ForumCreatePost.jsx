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
  const isAuthenticated = !!localStorage.getItem('userId'); // Verifica se userId existe e não é vazio

  // Verifica autenticação ao carregar a página
  useEffect(() => {
    console.log("Verificando autenticação..."); // Debug
    console.log("userId no localStorage:", localStorage.getItem('userId')); // Debug
    if (!isAuthenticated) {
      console.log("Usuário não autenticado, redirecionando para /login"); // Debug
      alert("Você precisa fazer login para criar uma postagem!");
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

    // Verificação redundante para garantir que só usuários autenticados continuem
    if (!isAuthenticated) {
      console.log("Tentativa de submissão sem autenticação detectada"); // Debug
      alert("Você precisa estar logado para publicar uma postagem!");
      navigate("/login");
      return;
    }

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

    // Simulação de resposta do backend (mock)
    const mockResponse = { ok: true };

    try {
      if (mockResponse.ok) {
        // Cria um objeto de postagem para adicionar ao mapa
        const newPost = {
          id: Date.now(), // ID único baseado no timestamp
          title: postData.post.title,
          description: postData.post.content,
          author: "Maria Julia", // Nome do usuário logado (deve vir do backend ou AuthContext no futuro)
          bairro: postData.address.neighborhood,
          category: postData.post.category,
          time: new Date().toISOString(),
          likes: 0,
          dislikes: 0,
          imageUrl: postData.post.image ? URL.createObjectURL(postData.post.image) : 'https://via.placeholder.com/50',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
          lat: -8.0578, // Coordenadas fictícias (devem vir do backend ou geolocalização)
          lon: -34.9045,
        };

        // Salva a nova postagem no localStorage para o Mapa.jsx ler
        localStorage.setItem('newPost', JSON.stringify(newPost));

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
      } else {
        throw new Error("Erro ao criar a postagem");
      }
    } catch (error) {
      alert(error.message || "Erro ao enviar a postagem. Tente novamente.");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Se não estiver autenticado, exibe mensagem e impede renderização do formulário
  if (!isAuthenticated) {
    return (
      <div className="forum-create-post">
        <h2>Você precisa estar logado</h2>
        <p>Por favor, faça login para criar uma postagem no fórum.</p>
        <button className="continue-btn" onClick={() => navigate("/login")}>
          FAZER LOGIN
        </button>
      </div>
    );
  }

  return (
    <div className="forum-create-post-container">
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
      </div>
  );
};

export default ForumCreatePost;