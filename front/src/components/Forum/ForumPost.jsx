import React from "react"; 
import { useNavigate } from "react-router-dom"; 

// Função para calcular o tempo relativo desde a postagem
const getTimeAgo = (date) => {
  if (!date) return "Desconhecido";
  const now = new Date();
  const past = new Date(date); 
  const diffInSeconds = Math.floor((now - past) / 1000); 
  if (diffInSeconds < 60) return `há ${diffInSeconds} segundos`;
  const diffInMinutes = Math.floor(diffInSeconds / 60); 
  if (diffInMinutes < 60) return `há ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`; 
  const diffInHours = Math.floor(diffInMinutes / 60); 
  if (diffInHours < 24) return `há ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`; 
  const diffInDays = Math.floor(diffInHours / 24); 
  return `há ${diffInDays} dia${diffInDays > 1 ? "s" : ""}`; 
};

// Componente para exibir uma postagem
const ForumPost = ({ post, onLike, onDislike }) => {
  const navigate = useNavigate(); 
  const isAuthenticated = !!localStorage.getItem('userId'); // Verifica se o usuário está logado

  // Função para lidar com o clique no botão de curtir
  const handleLikeClick = () => {
    if (!isAuthenticated) { 
      alert('Faça login para curtir!');
      navigate('/login'); 
      return;
    }
    onLike(post.id); // Chama a função do pai (Mapa.js) para curtir
  };

  // Função para lidar com o clique no botão de descurtir
  const handleDislikeClick = () => {
    if (!isAuthenticated) { 
      alert('Faça login para descurtir!'); 
      navigate('/login'); 
    }
    onDislike(post.id); 
  };

  const timeAgo = getTimeAgo(post.time); // Calcula o tempo relativo

  return (
    <div className="forum-post"> 
      <div className="post-content"> 
        <div className="post-details"> 
          <div className="post-title">{post.title}</div> 
          <div className="post-description">{post.description}</div> 
          <div className="post-meta"> {/* Metadados */}
            <img
              src={post.avatarUrl || "https://via.placeholder.com/20"} 
              alt="Avatar do usuário"
              className="user-icon"
            />
            <span className="post-author">
              {post.author} • {timeAgo} 
            </span>
            <div className="post-actions"> 
              <button onClick={handleLikeClick} className="action-btn"> 
                <img src="/like.png" alt="Like" />
                <span>{post.likes}</span> 
              </button>
              <button onClick={handleDislikeClick} className="action-btn"> 
                <img src="./deslike.png" alt="Dislike" />
                <span>{post.dislikes}</span> 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;