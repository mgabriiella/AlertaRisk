// src/components/Forum/ForumFilter.jsx
import React from 'react';

const ForumFilter = ({ category, setCategory, order, setOrder, onFilter }) => {
  const handleFilterClick = () => {
    onFilter();
  };

  return (
    <div className="filter-section">
      <h3>Categoria</h3>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Todas as categorias</option>
        <option value="alagamento">Alagamento</option>
        <option value="bueiro">Bueiro Entupido</option>
        <option value="deslizamento">Deslizamento</option>
        <option value="queda-arvore">Queda de Árvore</option>
      </select>
      <h3>Ordenar por:</h3>
      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="recent">Mais recentes</option>
        <option value="oldest">Mais antigos</option>
      </select>
      <button className="filter-btn" onClick={handleFilterClick}>
        FILTRAR
      </button>
    </div>
  );
};

export default ForumFilter;