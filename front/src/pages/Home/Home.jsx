import { Link } from "react-router-dom";
import "./home.css";

// Página inicial que apresenta o propósito da aplicação e suas funcionalidades
function Home() {
  return (
    <div className="home">
      {/* Seção de banner principal */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Receba Alerta e Previna-se Contra Enchentes e Alagamentos!</h1>
            {/* Botão que leva à página de cadastro de alertas */}
            <Link to="/cadastro">
              <button className="hero-btn">CADASTRE-SE AGORA</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de passos para uso da aplicação */}
      <section className="steps">
        <div className="container">
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Esteja Sempre Alerta</h3>
              <p>
                Cadastre seu número e ative as notificações do WhatsApp para
                receber alertas importantes diretamente no celular, sem
                instalações.
              </p>
              <div className="step-divider"></div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Sempre um passo à frente</h3>
              <p>
                Com apenas alguns cliques, você terá um canal direto para
                notificações de emergência, garantindo que nunca seja pego de
                surpresa.
              </p>
              <div className="step-divider"></div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Mapeando sua segurança</h3>
              <p>
                Explore o mapa interativo para visualizar em tempo real as
                regiões mais afetadas por alagamentos e enchentes.
              </p>
              <div className="step-divider"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de soluções oferecidas pela aplicação */}
      <section className="solutions">
        <div className="container">
          <div className="solutions-container">
            <div>
              <img src="transporte.png" alt="Pessoa usando o app" className="solutions-img" />
            </div>
            <div>
              <span className="solutions-tag">Proteja-se contra alagamentos!</span>
              <div className="solutions-intro">
                <h2>Soluções para Proteger sua Comunidade</h2>
                <p>
                  O AlertaRisk foi criado para ajudar você a se preparar e
                  proteger contra enchentes e alagamentos. Com tecnologia e um
                  design simples, oferecemos alertas precisos e fáceis de
                  entender.
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <img src="icone-alerta.png" alt="Ícone de alerta" />
                </div>
                <div className="feature-text">
                  <h3>Alertas em Tempo Real</h3>
                  <p>Receba avisos instantâneos sobre chuvas fortes e áreas de risco.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <img src="icone-security.png" alt="Ícone de segurança" />
                </div>
                <div className="feature-text">
                  <h3>Segurança para Todos</h3>
                  <p>Proteção para comunidades vulneráveis com informações acessíveis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de exploração do mapa */}
      <section className="explore-section">
        <div className="container">
          <div className="grid">
            <div className="text-content">
              <h2 className="map-title">EXPLORE O MAPA!</h2>
              <p className="map-description">Visualize áreas de risco em tempo real</p>
              {/* Botão que leva ao mapa interativo */}
              <button className="explore-btn">
                <Link to="/mapa" style={{ textDecoration: "none", color: "inherit" }}>
                  EXPLORAR
                </Link>
              </button>
            </div>
            <div className="image-wrapper">
              <div className="image-blur"></div>
              <img src="explore-mapa.png" alt="Mapa" className="map-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Seção de benefícios */}
      <section className="benefits">
        <div className="container">
          <h1>Benefícios de usar o AlertaRisk</h1>
          <p>Confira abaixo os principais benefícios!</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <img src="reducao-danos.png" alt="Redução de Danos" />
              </div>
              <h3>Redução de Danos Materiais</h3>
              <p>Proteja seus bens e evite perdas em situações de risco.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <img src="happy.png" alt="Melhoria da Qualidade de Vida" />
              </div>
              <h3>Melhoria da Qualidade de Vida</h3>
              <p>Sinta-se mais seguro e contribua para cidades sustentáveis.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <img src="proteger.png" alt="Proteção à Vida" />
              </div>
              <h3>Proteção à Vida</h3>
              <p>Receba alertas precoces para evacuar áreas de risco a tempo.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <img src="reducao-danos.png" alt="Gestão de Riscos" />
              </div>
              <h3>Gestão de Riscos</h3>
              <p>Tenha informações precisas para decisões seguras e planejamento estratégico. Identifique e previna riscos de forma eficiente.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <img src="recursos.png" alt="Otimização de Recursos Públicos" />
              </div>
              <h3>Otimização de Recursos Públicos</h3>
              <p>Ajuda governos a focar recursos em áreas vulneráveis, reduzindo custos e investindo na prevenção.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <img src="conexao.png" alt="Conexão em Tempo Real" />
              </div>
              <h3>Conexão em Tempo Real</h3>
              <p>Receba atualizações no WhatsApp e esteja sempre preparado para agir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de slogan */}
      <div id="slogan">
        <img src="slogan.png" alt="Slogan" />
      </div>
    </div>
  );
}

export default Home;