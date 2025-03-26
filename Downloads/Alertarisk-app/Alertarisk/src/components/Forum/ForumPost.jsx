// src/components/Forum/ForumPost.jsx
import React, { useState, useEffect } from 'react';

// Função para calcular o tempo relativo
const getTimeAgo = (date) => {
  if (!date) return 'Desconhecido';

  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return `há ${diffInSeconds} segundos`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `há ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
};

const ForumPost = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);

  // Função para lidar com o clique no botão de like
  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user123' }),
      });
      if (response.ok) {
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error('Erro ao curtir o post:', error);
    }
  };

  // Função para lidar com o clique no botão de dislike
  const handleDislike = async () => {
    try {
      const response = await fetch(`/api/posts/${post.id}/dislike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user123' }),
      });
      if (response.ok) {
        setDislikes(dislikes + 1);
      }
    } catch (error) {
      console.error('Erro ao descurtir o post:', error);
    }
  };

  // Formatar o tempo de publicação
  const timeAgo = getTimeAgo(post.time);

  return (
    <div className="forum-post">
      <div className="post-content">
        <div className="post-details">
          <div className="post-title">{post.title}</div>
          <div className="post-description">{post.description}</div>
          <div className="post-meta">
            <img
              src={post.avatarUrl || 'https://via.placeholder.com/20'}
              alt="Avatar do usuário"
              className="user-icon"
            />
            <span className="post-author">
              {post.author} • {timeAgo}
            </span>
            <div className="post-actions">
              <button onClick={handleLike} className="action-btn">
                <img
                  src="/like.png"
                  alt="Like"
                />
                <span>{likes}</span>
              </button>
              <button onClick={handleDislike} className="action-btn">
                <img
                  src="./deslike.png"
                  alt="Dislike"
                />
                <span>{dislikes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;