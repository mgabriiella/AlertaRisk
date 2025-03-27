import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import './mapa.css'; 
import ForumFilter from '../../components/Forum/ForumFilter'; 
import ForumPost from '../../components/Forum/ForumPost'; 
import MapLegend from '../../components/Map/MapLegend'; 
import { RECIFE_LAT, RECIFE_LON, bairrosRecife, coordenadasBairros, fetchWeather } from '../Service/api'; // Dados e função da API

// Função para traduzir condições climáticas em português
const formatWeatherCondition = (condition) => {
  const conditionsMap = { // Dicionário simples para traduzir condições
    'clear sky': 'Céu Limpo',
    'few clouds': 'Poucas Nuvens',
    'scattered clouds': 'Nuvens Dispersas',
    'broken clouds': 'Nuvens Parcialmente Cobertas',
    'overcast clouds': 'Céu Nublado',
    'light rain': 'Chuva Fraca',
    'moderate rain': 'Chuva Moderada',
    'heavy intensity rain': 'Chuva Intensa',
    'very heavy rain': 'Chuva Muito Intensa',
    'extreme rain': 'Chuva Extrema',
    'light intensity shower rain': 'Chuva Fraca com Pancadas',
    'shower rain': 'Chuva com Pancadas',
    'heavy intensity shower rain': 'Chuva Intensa com Pancadas',
    'thunderstorm': 'Tempestade',
    'thunderstorm with light rain': 'Tempestade com Chuva Fraca',
    'thunderstorm with heavy rain': 'Tempestade com Chuva Intensa',
  };
  return conditionsMap[condition?.toLowerCase()] || condition || 'N/A'; // Retorna tradução ou "N/A" se não houver
};

// Define um ícone personalizado para marcadores de postagens
const postMarkerIcon = L.icon({
  iconUrl: './Vector.png', 
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
});

// Componente para adicionar controles de zoom no mapa
const CustomZoomControl = () => {
  const map = useMap(); // Hook do Leaflet para acessar o mapa
  useEffect(() => {
    if (!map) {
      console.error('Mapa não inicializado no CustomZoomControl'); // Avisa se o mapa não carregou
      return;
    }
    const zoomControl = L.control.zoom({ position: 'topleft' }); // Cria controles de zoom no canto superior esquerdo
    zoomControl.addTo(map); // Adiciona os controles ao mapa
    return () => zoomControl.remove(); // Remove os controles ao desmontar o componente
  }, [map]); // Executa sempre que "map" mudar
  return null; // Não renderiza nada visível
};

// Componente para buscar dados climáticos dos bairros
const WeatherData = ({ onWeatherDataFetched }) => {
  const map = useMap(); // Hook para acessar o mapa
  useEffect(() => {
    const fetchWeatherForBairros = async () => { // Função assíncrona para buscar dados
      const weatherData = {}; // Objeto para armazenar os dados climáticos
      for (const bairro of bairrosRecife) { // Loop em cada bairro de Recife
        const coords = coordenadasBairros[bairro]; // Pega latitude e longitude do bairro
        if (coords) { // Se as coordenadas existirem
          try {
            const data = await fetchWeather(coords.lat, coords.lon); // Chama a função da API (mockada ou real)
            const rain = data.rain && data.rain['1h'] ? data.rain['1h'] : 0; // Volume de chuva na última hora
            weatherData[bairro] = { ...data, rain }; // Armazena os dados no objeto
          } catch (error) {
            console.error(`Erro ao buscar previsão do tempo para ${bairro}:`, error); // Loga erro
            weatherData[bairro] = { rain: 0 }; // Define padrão em caso de erro
          }
        } else {
          console.warn(`Coordenadas não encontradas para ${bairro}`); // Aviso se não houver coordenadas
          weatherData[bairro] = { rain: 0 }; // Define padrão
        }
      }
      onWeatherDataFetched(weatherData); // Passa os dados para o pai (Mapa.js)
    };
    fetchWeatherForBairros(); // Executa a busca ao montar o componente
  }, [map, onWeatherDataFetched]); // Dependências do efeito
  return null; // Não renderiza nada visível
};

// Componente principal do mapa
const Mapa = () => {
  // Estados para controlar a interface
  const [category, setCategory] = useState(''); // Categoria selecionada no filtro
  const [order, setOrder] = useState('recent'); // Ordem das postagens (recente ou antigo)
  const [bairrosWeather, setBairrosWeather] = useState({}); // Dados climáticos por bairro
  const [isForumExpanded, setIsForumExpanded] = useState(false); // Controla se a sidebar está aberta ou fechada
  const [mapMode, setMapMode] = useState('weather'); // Modo do mapa: "weather" ou "posts"
  const [posts, setPosts] = useState([ // Lista inicial de postagens mockadas
    {
      id: 1,
      title: 'Alagamento grave',
      description: 'Rua Exemplo, 123',
      author: 'Colaborador',
      bairro: 'Boa Viagem',
      category: 'alagamento',
      time: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      imageUrl: 'https://via.placeholder.com/50',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
      lat: -8.1135,
      lon: -34.8912,
    },
    {
      id: 2,
      title: 'Problema na via',
      description: 'Avenida Teste, 456',
      author: 'Usuario2',
      bairro: 'Madalena',
      category: 'outros',
      time: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      imageUrl: 'https://via.placeholder.com/50',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80',
      lat: -8.0578,
      lon: -34.9045,
    },
  ]);

  const navigate = useNavigate(); // Hook para navegar entre páginas
  const isAuthenticated = !!localStorage.getItem('userId'); // Verifica se o usuário está logado

  // Função para buscar postagens (mockada para apresentação)
  const fetchPostsFromBackend = async () => {
    try {
      // Simulação de chamada ao backend (poderia ser fetch('/api/posts'))
      let filteredPosts = [...posts]; // Cria uma cópia dos posts mockados
      if (category) { // Se houver categoria selecionada
        filteredPosts = filteredPosts.filter((post) => post.category === category); // Filtra por categoria
      }
      if (order === 'recent') { // Ordena por mais recente
        filteredPosts.sort((a, b) => new Date(b.time) - new Date(a.time));
      } else if (order === 'oldest') { // Ordena por mais antigo
        filteredPosts.sort((a, b) => new Date(a.time) - new Date(b.time));
      }
      setPosts(filteredPosts); // Atualiza os posts exibidos
      setMapMode('posts'); // Muda o modo do mapa para "posts"
    } catch (error) {
      console.error('Erro ao buscar posts:', error); // Loga erro
      setPosts([]); // Limpa os posts em caso de erro
      setMapMode('weather'); // Volta para o modo "weather"
    }
  };

  // Função para abrir a página de nova postagem
  const handleNewPostClick = () => {
    if (!isAuthenticated) { // Se não estiver logado
      alert('Faça login para criar uma postagem!'); // Alerta o usuário
      navigate('/login'); // Redireciona para login
      return;
    }
    navigate('/mapa/nova-postagem'); // Se logado, vai para a página de nova postagem
  };

  // Função para curtir um post
  const handleLike = async (postId) => {
    if (!isAuthenticated) { // Se não estiver logado
      alert('Faça login para curtir!'); // Alerta o usuário
      navigate('/login'); // Redireciona para login
      return;
    }
    try {
      const userId = localStorage.getItem('userId'); // Pega o ID do usuário logado
      const response = await fetch(`/api/posts/${postId}/like`, { // Simula chamada ao backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }), // Envia o userId
      });
      if (response.ok) { // Se a requisição der certo
        setPosts(prevPosts => // Atualiza o estado local
          prevPosts.map(post =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post // Incrementa likes
          )
        );
      }
      // [Nota para backend]: Aqui o backend deve validar o userId e persistir o like
    } catch (error) {
      console.error('Erro ao curtir o post:', error); // Loga erro
    }
  };

  // Função para descurtir um post
  const handleDislike = async (postId) => {
    if (!isAuthenticated) { // Se não estiver logado
      alert('Faça login para descurtir!'); // Alerta o usuário
      navigate('/login'); // Redireciona para login
      return;
    }
    try {
      const userId = localStorage.getItem('userId'); // Pega o ID do usuário logado
      const response = await fetch(`/api/posts/${postId}/dislike`, { // Simula chamada ao backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }), // Envia o userId
      });
      if (response.ok) { // Se a requisição der certo
        setPosts(prevPosts => // Atualiza o estado local
          prevPosts.map(post =>
            post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post // Incrementa dislikes
          )
        );
      }
      // [Nota para backend]: Aqui o backend deve validar o userId e persistir o dislike
    } catch (error) {
      console.error('Erro ao descurtir o post:', error); // Loga erro
    }
  };

  // Define a cor dos marcadores de chuva com base na intensidade
  const getColor = (intensity) => {
    if (intensity > 7.6) return '#ff4d4d'; // Vermelho para chuva forte
    if (intensity >= 2.5) return '#ffaa33'; // Laranja para chuva moderada
    return '#33cc33'; // Verde para chuva leve ou sem chuva
  };

  return (
    <div className="mapa-container"> {/* Container principal com sidebar e mapa */}
      <aside className={`sidebar ${isForumExpanded ? 'expanded' : 'collapsed'}`}> {/* Sidebar */}
        {isForumExpanded ? ( // Se a sidebar estiver expandida
          <>
            <div className="forum-header"> {/* Cabeçalho da sidebar */}
              <span>Relate um problema</span> {/* Título */}
              <button
                className="toggle-forum-btn" // Botão para fechar a sidebar
                onClick={() => setIsForumExpanded(false)} // Fecha a sidebar
              >
                <img
                  src="https://img.icons8.com/material-outlined/20/ffffff/chevron-left.png"
                  alt="Fechar Fórum"
                />
              </button>
            </div>
            <ForumFilter // Componente de filtro
              category={category} // Categoria atual
              setCategory={setCategory} // Função para mudar categoria
              order={order} // Ordem atual
              setOrder={setOrder} // Função para mudar ordem
              onFilter={fetchPostsFromBackend} // Função para aplicar filtro
            />
            <button className="new-post-btn" onClick={handleNewPostClick}> {/* Botão de nova postagem */}
              Nova postagem
            </button>
            <div className="forum-section"> {/* Seção de postagens */}
              <h3 className="forum-title">Fórum da região</h3> {/* Título da seção */}
              <div className="forum-posts-container"> 
                {posts.length > 0 ? ( // Se houver posts
                  posts.map((post) => ( // Mapeia cada post
                    <ForumPost
                      key={post.id} // Chave única para cada post
                      post={post} // Dados do post
                      onLike={handleLike} // Função para curtir
                      onDislike={handleDislike} // Função para descurtir
                    />
                  ))
                ) : (
                  <p className="no-posts">Nenhum post encontrado.</p> // Mensagem se não houver posts
                )}
              </div>
            </div>
          </>
        ) : ( // Se a sidebar estiver colapsada
          <div className="forum-header"> {/* Cabeçalho reduzido */}
            <button
              className="toggle-forum-btn" // Botão para abrir a sidebar
              onClick={() => setIsForumExpanded(true)} // Abre a sidebar
            >
              <img
                src="https://img.icons8.com/material-outlined/20/ffffff/chevron-right.png"
                alt="Abrir Fórum"
              />
            </button>
          </div>
        )}
      </aside>

      <section className="map-section"> {/* Seção do mapa */}
        <MapContainer // Componente do Leaflet para o mapa
          center={[RECIFE_LAT, RECIFE_LON]} // Centro do mapa (Recife)
          zoom={12} // Nível de zoom inicial
          className="map" // Classe CSS para estilização
          zoomControl={false} // Desativa controles de zoom padrão
        >
          <TileLayer // Camada base do mapa (OpenStreetMap)
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <CustomZoomControl /> {/* Adiciona controles de zoom personalizados */}
          <WeatherData onWeatherDataFetched={setBairrosWeather} /> {/* Busca dados climáticos */}

          {mapMode === 'weather' ? ( // Modo clima: exibe marcadores de chuva
            bairrosRecife.map((bairro) => { // Mapeia cada bairro
              const coords = coordenadasBairros[bairro]; // Pega coordenadas
              const weather = bairrosWeather[bairro]; // Pega dados climáticos
              const intensity = weather ? weather.rain || 0 : 0; // Intensidade da chuva
              if (!coords) return null; // Ignora se não houver coordenadas
              return (
                <Marker // Marcador no mapa
                  key={bairro} // Chave única
                  position={[coords.lat, coords.lon]} // Posição do marcador
                  icon={L.divIcon({ // Ícone personalizado (círculo colorido)
                    className: 'weather-marker',
                    html: `<div style="background-color: ${getColor(intensity)}; width: 16px; height: 16px; border-radius: 50%;"></div>`,
                    iconSize: [16, 16],
                    iconAnchor: [8, 8],
                  })}
                >
                  <Popup> {/* Popup com informações climáticas */}
                    <div className="weather-info-popup">
                      <h4>Previsão do Tempo</h4>
                      <p><strong>Local:</strong> {bairro}</p>
                      <p><strong>Temperatura:</strong> {weather?.main?.temp || 'N/A'}°C</p>
                      <p>
                        <strong>Condição:</strong>{' '}
                        {weather?.weather?.[0] ? formatWeatherCondition(weather.weather[0].description) : 'N/A'}
                      </p>
                      <p className="rain-info">
                        <strong>Volume de Chuva (Última Hora):</strong>{' '}
                        {weather?.rain?.['1h'] || 0} mm
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })
          ) : ( // Modo posts: exibe marcadores de postagens
            posts.map((post) => ( // Mapeia cada post
              <Marker
                key={post.id} // Chave única
                position={[post.lat, post.lon]} // Posição do marcador
                icon={postMarkerIcon} // Ícone personalizado
              >
                <Popup> {/* Popup com informações do post */}
                  <div className="post-info-popup">
                    <h4>{post.title}</h4>
                    <p><strong>Descrição:</strong> {post.description}</p>
                    <div className="post-meta">
                      <img
                        src={post.avatarUrl || 'https://via.placeholder.com/20'}
                        alt="Avatar do usuário"
                        className="user-icon"
                      />
                      <span><strong>Autor:</strong> {post.author}</span>
                    </div>
                    <p><strong>Local:</strong> {post.bairro}</p>
                    <p><strong>Postagem:</strong> {new Date(post.time).toLocaleString()}</p>
                    <div className="post-actions">
                      <button onClick={(e) => { e.stopPropagation(); handleLike(post.id); }} className="action-btn">
                        <img src="/like.png" alt="Like" /> {post.likes}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDislike(post.id); }} className="action-btn">
                        <img src="/deslike.png" alt="Dislike" /> {post.dislikes}
                      </button>
                    </div>
                    {!isAuthenticated && ( // Mensagem se não estiver logado
                      <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>
                        Faça login para interagir!
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))
          )}
          <MapLegend /> {/* Componente de legenda */}
        </MapContainer>
      </section>
    </div>
  );
};

export default Mapa;