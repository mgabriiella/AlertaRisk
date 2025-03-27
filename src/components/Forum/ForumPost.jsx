import React from "react"; 
import { useNavigate } from "react-router-dom"; 

// Função para calcular o tempo relativo desde a postagem
const getTimeAgo = (date) => {
  if (!date) return "Desconhecido"; // Retorna "Desconhecido" se não houver data
  const now = new Date(); // Data atual
  const past = new Date(date); // Converte a data da postagem
  const diffInSeconds = Math.floor((now - past) / 1000); // Diferença em segundos
  if (diffInSeconds < 60) return `há ${diffInSeconds} segundos`; // Menos de 1 minuto
  const diffInMinutes = Math.floor(diffInSeconds / 60); // Converte para minutos
  if (diffInMinutes < 60) return `há ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`; // Menos de 1 hora
  const diffInHours = Math.floor(diffInMinutes / 60); // Converte para horas
  if (diffInHours < 24) return `há ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`; // Menos de 1 dia
  const diffInDays = Math.floor(diffInHours / 24); // Converte para dias
  return `há ${diffInDays} dia${diffInDays > 1 ? "s" : ""}`; // Dias
};

// Componente para exibir uma postagem
const ForumPost = ({ post, onLike, onDislike }) => {
  const navigate = useNavigate(); // Hook para navegação
  const isAuthenticated = !!localStorage.getItem('userId'); // Verifica se o usuário está logado

  // Função para lidar com o clique no botão de curtir
  const handleLikeClick = () => {
    if (!isAuthenticated) { // Se não estiver logado
      alert('Faça login para curtir!'); // Alerta o usuário
      navigate('/login'); // Redireciona para login
      return;
    }
    onLike(post.id); // Chama a função do pai (Mapa.js) para curtir
  };

  // Função para lidar com o clique no botão de descurtir
  const handleDislikeClick = () => {
    if (!isAuthenticated) { // Se não estiver logado
      alert('Faça login para descurtir!'); 
      navigate('/login'); // Redireciona para login
      return;
    }
    onDislike(post.id); // Chama a função do pai (Mapa.js) para descurtir
  };

  const timeAgo = getTimeAgo(post.time); // Calcula o tempo relativo

  return (
    <div className="forum-post"> {/* Container da postagem */}
      <div className="post-content"> 
        <div className="post-details"> 
          <div className="post-title">{post.title}</div> 
          <div className="post-description">{post.description}</div> 
          <div className="post-meta"> {/* Metadados */}
            <img
              src={post.avatarUrl || "https://via.placeholder.com/20"} // Avatar do autor ou placeholder
              alt="Avatar do usuário"
              className="user-icon"
            />
            <span className="post-author">
              {post.author} • {timeAgo} {/* Autor e tempo relativo */}
            </span>
            <div className="post-actions"> {/* Botões de interação */}
              <button onClick={handleLikeClick} className="action-btn"> {/* Botão de curtir */}
                <img src="/like.png" alt="Like" />
                <span>{post.likes}</span> {/* Contador de curtidas */}
              </button>
              <button onClick={handleDislikeClick} className="action-btn"> {/* Botão de descurtir */}
                <img src="./deslike.png" alt="Dislike" />
                <span>{post.dislikes}</span> {/* Contador de descurtidas */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;