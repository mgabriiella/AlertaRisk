import React from 'react';
import './sobre.css';

const Sobre = () => {
  // Lista completa de desenvolvedores com caminhos das imagens
  const desenvolvedores = [
    { 
      nome: "Cláudia Ribeiro",
      imagem: "../equipe/claudia.png", // Caminho corrigido
      link: "https://www.linkedin.com/in/claudia-ribeiroo"
    },
    { 
      nome: "Gabriel Ferreira",
      imagem: "../equipe/gabriel.png", // Caminho corrigido
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7308638117350035456" 
    },
    { 
      nome: "Luana Marques",
      imagem: "../equipe/luana.png", // Caminho corrigido
      link: "https://www.linkedin.com/in/luana-marques-b49521170/"
    },
    { 
      nome: "Maria Gabriella",
      imagem: "../equipe/gabriela.png", // Caminho corrigido
      link: "https://www.linkedin.com/in/maria-gabriella-a8a2a3211/" 
    },
    { 
      nome: "Matheus Alves",
      imagem: "../equipe/matheus.png", // Caminho corrigido
      link: "https://www.linkedin.com/in/theualves/"
    },
    { 
      nome: "Tarcillia Almeida",
      imagem: "../equipe/tarcila.png", // Caminho corrigido
      link: "https://www.linkedin.com/in/tarcilla-maria-0b22672bb/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    { 
      nome: "Victor Melo",
      imagem: "../equipe/vitor.png", // Caminho corrigido
      link: "https://www.linkedin.com/in/victor-hugomelo/"
    }
  ];

  return (
    <section className="sobre-nos">
      {/* Faixa superior com o título */}
      <div className="sobre-nos__title-bar">
        <h1>SOBRE NÓS</h1>
      </div>

      {/* Conteúdo principal: texto à esquerda e imagem à direita */}
      <div className="sobre-nos__content">
        <div className="sobre-nos__text">
          <div className="title-with-bar">
            <div className="verde-bar"></div>
            <h2>Quem somos</h2>
          </div>
          <p>
            O <strong>AlertaRisk</strong> é uma plataforma desenvolvida com o objetivo de
            proteger comunidades em risco de desastres naturais, utilizando tecnologia acessível
            para promover a segurança e o bem-estar social. Nossa missão é capacitar os
            moradores de áreas propensas a alagamentos e enchentes, fornecendo alertas em
            tempo real por meio de notificações via WhatsApp.
          </p>
          <p>
            Temos como objetivo transformar dados em ações, ajudando a mobilizar e educar
            comunidades para enfrentarem os desafios impostos pelas mudanças climáticas.
            Nossa plataforma é mais que uma solução tecnológica; é um compromisso com a
            segurança das pessoas e o fortalecimento das comunidades. Acreditamos que, com
            o uso da tecnologia, podemos criar um futuro mais seguro, justo e resiliente
            para todos.
          </p>
        </div>

        {/* Imagem representando o projeto */}
        <div className="sobre-nos__image">
          <img
            src="./Rectangle 168 (1).png" 
            alt="Comunidade protegida"
          />
        </div>
      </div>

      {/* Seção Nossa Equipe */}
      <section className="nossa-equipe">
        <div className="title-container">
          <h2>Nossa equipe</h2>
          <div className="title-underline"></div>
        </div>
        <div className="equipe-texto">
          <p>
            O AlertaRisk nasceu de um grupo de jovens participantes do <strong>Projeto Start da Rede Cidadã</strong>, 
            em Recife-PE. Somos uma equipe apaixonada, comprometida em usar nossas habilidades para 
            enfrentar desafios sociais significativos.
          </p>
          <p>
            Juntos, unimos nossos esforços para criar uma solução eficaz e acessível para comunidades 
            em risco de desastres naturais. Nosso objetivo é garantir que pessoas em áreas vulneráveis 
            recebam informações de forma rápida e eficiente, permitindo ações pró-ativas de proteção.
          </p>
        </div>
        <div className="team-photo">
          <img 
            src="../equipe/equipe.png" 
            alt="Equipe AlertaRisk" 
          />
        </div>
      </section>

      {/* Seção Desenvolvedores */}
      <section className="desenvolvedores">
        <div className="title-with-bar dev-title">
          <div className="verde-bar"></div>
          <h3>Conheça nossos desenvolvedores</h3>
        </div>
        <div className="dev-grid">
          {desenvolvedores.map((dev, index) => (
            dev.link ? (
              <a 
                href={dev.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="dev-card" 
                key={index}
              >
                <img 
                  src={dev.imagem} 
                  alt={`${dev.nome} - Desenvolvedor AlertaRisk`} // Corrigido
                  className="dev-avatar"
                />
                <h4 className="dev-name">{dev.nome}</h4>
              </a>
            ) : (
              <div className="dev-card" key={index}>
                <img 
                  src={dev.imagem} 
                  alt={`${dev.nome} - Desenvolvedor AlertaRisk`} // Corrigido
                  className="dev-avatar"
                />
                <h4 className="dev-name">{dev.nome}</h4>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Linha divisória com degradê de cores */}
      <div className="gradient-divider"></div>

      {/* Seção Call to Action */}
      <section className="cta">
        <h3>Ainda não ativou o <span className="highlight">AlertaRisk</span>?</h3>
        <p>Por que esperar?</p>
        <button className="register-button">CADASTRE-SE AGORA</button>
      </section>
    </section>
  );
};

export default Sobre;