import React, { useState, useEffect } from "react";
import "./forumcreatepost.css";
import { useNavigate } from "react-router-dom";
import { apiconfig } from "../../Service/apiconfig";

// Página para criar uma nova postagem no fórum
const ForumCreatePost = () => {
  const [currentSection, setCurrentSection] = useState("address");
  const [cep, setCep] = useState("")
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
  const isAuthenticated = !!localStorage.getItem("userId"); // Verifica se userId existe e não é vazio

  // Verifica autenticação ao carregar a página
  useEffect(() => {
    console.log("Verificando autenticação...");
    console.log("userId no localStorage:", localStorage.getItem("userId"));
    if (!isAuthenticated) {
      console.log("Usuário não autenticado, redirecionando para /login");
      alert("Você precisa fazer login para criar uma postagem!");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleContinue = (e) => {
    e.preventDefault();
   
    if (!cep || !street || !neighborhood || !city || !state) {
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
      console.log("Tentativa de submissão sem autenticação detectada");
      alert("Você precisa estar logado para publicar uma postagem!");
      navigate("/login");
      return;
    }

    // Validação mínima no frontend para UX
    if (!category || !title || !content) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const userId = localStorage.getItem("userId");
    const postData = {
      categoria: category.toUpperCase(),
      titulo: title,
      conteudo: content,
      id_usuario: userId,
      endereco: {
        status: "ATIVO",
        categoria: category.toUpperCase(),
        nivel: "VERDE",
        endereco: {
          cep: cep, 
          rua: street,
          bairro: neighborhood,
          cidade: city,
          estado: state,
        },
      },
    };
    try {
      
      const response = await apiconfig.post("http://localhost:8080/posts", postData);

      if (response.status === 201 || response.status === 200) {
        // Cria um objeto de postagem para adicionar ao mapa
        const newPost = {
          id: response.data.id || Date.now(), 
          title: postData.titulo,
          description: postData.conteudo,
          author: "Maria Julia", // Nome do usuário logado (deve vir do backend ou AuthContext no futuro)
          bairro: postData.endereco.endereco.bairro,
          category: postData.categoria,
          time: new Date().toISOString(),
          likes: 0,
          dislikes: 0,
          imageUrl: "https://via.placeholder.com/50", 
          avatarUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80",
          lat: -8.0578, 
          lon: -34.9045,
        };

        // Salva a nova postagem no localStorage para o Mapa.jsx ler
        localStorage.setItem("newPost", JSON.stringify(newPost));

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
      console.error("Erro ao enviar a postagem:", error);
      alert(error.response?.data?.message || "Erro ao enviar a postagem. Tente novamente.");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
//buscar uma lista de todos os posts armazenados no backend
  const fetchAllPosts = async () => {
    try {
      const response = await apiconfig.get("http://localhost:8080/posts");
      console.log("Lista de postagens:", response.data);
      return response.data; // Return the list of posts for use elsewhere
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
      alert("Erro ao buscar postagens. Tente novamente.");
      return [];
    }
  };

  const fetchPostById = async (postId) => {
    try {
      const response = await apiconfig.get(`http://localhost:8080/posts/${postId}`);
      console.log("Postagem encontrada:", response.data);
      return response.data; 
    } catch (error) {
      console.error("Erro ao buscar a postagem:", error);
      alert("Erro ao buscar a postagem. Tente novamente.");
      return null;
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
            {/* Novo campo CEP adicionado aqui */}
            <div className="form-group">
              <label>CEP *</label>
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Digite o CEP"
                required
                maxLength="8"
              />
            </div>
            
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
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
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