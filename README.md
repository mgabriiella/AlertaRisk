## Funcionalidades

### 🌍 Mapa
A seção **Mapa** é o coração do **AlertRisk**, permitindo a visualização de dados climáticos e postagens no mapa de Recife.

#### Funcionalidades Principais
- **Visualização de Dados Climáticos**:
  - Exibe marcadores nos bairros de Recife com informações sobre temperatura, condições climáticas e volume de chuva na última hora.
  - Os marcadores são coloridos com base na intensidade da chuva:
    - **Verde**: Chuva fraca (< 2.5 mm/h)
    - **Laranja**: Chuva moderada (2.5 - 7.6 mm/h)
    - **Vermelho**: Chuva forte (> 7.6 mm/h)
  - Ao clicar em um marcador, um popup exibe detalhes climáticos, como temperatura e condição do tempo.

- **Visualização de Postagens**:
  - Alterna para o modo "posts" ao aplicar filtros no fórum, exibindo marcadores das postagens dos usuários no mapa.
  - Cada marcador de postagem mostra um popup com título, descrição, autor, bairro, data e botões de interação (curtir/descurtir).

- **Legenda**:
  - Uma legenda no canto inferior direito explica as cores dos marcadores de chuva.

- **Controles de Zoom**:
  - Controles personalizados de zoom no canto superior esquerdo do mapa.

#### Como Usar
1. Acesse a página `/mapa`.
2. Por padrão, o mapa exibe os dados climáticos dos bairros de Recife.
3. Clique em um marcador para ver os detalhes climáticos.
4. Para ver postagens, expanda a sidebar à esquerda e use os filtros do fórum para selecionar uma categoria (ex.: "alagamento").
5. Clique em um marcador de postagem para ver os detalhes e interagir (curtir/descurtir).

#### Integração com o Backend
- Os dados climáticos são obtidos via API (mockada para a apresentação, mas pronta para integração real com uma API como OpenWeather).
- As postagens são mockadas, mas a estrutura está pronta para integração com um backend real (ex.: chamadas a `/api/posts`).

---

### 💬 Fórum
O **Fórum** é uma seção integrada à sidebar do mapa, permitindo que os usuários relatem problemas e interajam com postagens da comunidade.

#### Funcionalidades Principais
- **Visualização de Postagens**:
  - Lista de postagens com título, descrição, autor, data, curtidas e descurtidas.
  - Rolagem vertical para navegar por várias postagens (ajustada para aparecer ao lado direito da sidebar quando expandida).

- **Criação de Postagens**:
  - Botão **"Nova postagem"** leva à página `/mapa/nova-postagem`.
  - Formulário em duas etapas:
    1. **Endereço**: Informações do local (rua, bairro, cidade, estado, ponto de referência).
    2. **Postagem**: Categoria, título, conteúdo e anexo de imagem (opcional).
  - Autenticação necessária: usuários não logados são redirecionados para `/login`.

- **Filtros**:
  - Filtro por categoria (ex.: alagamento, bueiro, deslizamento) e ordem (mais recente ou mais antigo).
  - Ao aplicar um filtro, o mapa alterna para o modo "posts" e exibe apenas as postagens filtradas.

- **Interação**:
  - Botões de curtir e descurtir em cada postagem.
  - Autenticação necessária para interagir (usuários não logados são redirecionados para `/login`).

#### Como Usar
1. Na página `/mapa`, clique no botão de expandir a sidebar (ícone de chevron direito).
2. Use os filtros para selecionar uma categoria ou ordem.
3. Clique em **"Nova postagem"** para criar um relato (faça login se necessário).
4. Preencha o formulário de endereço e postagem, e clique em **"Publicar"**.
5. Interaja com as postagens clicando nos botões de curtir/descurtir (faça login se necessário).

#### Integração com o Backend
- A criação de postagens usa **FormData** para enviar dados e imagens, pronta para integração com um endpoint como `/api/posts`.
- Curtidas e descurtidas simulam chamadas a `/api/posts/:id/like` e `/api/posts/:id/dislike`.

---

### 🏠 Home
A página **Home** é a página inicial do **AlertRisk**, servindo como ponto de entrada para os usuários.

#### Funcionalidades Principais
- **Apresentação do Projeto**:
  - Breve descrição do **AlertRisk** e seu objetivo de monitorar riscos climáticos e promover a colaboração comunitária.

- **Links de Navegação**:
  - Botão para acessar o mapa (`/mapa`).
  - Links para outras seções (ex.: orientações de segurança, políticas, sobre nós).

- **Design Intuitivo**:
  - Layout simples e direto, com foco em direcionar o usuário para o mapa e o fórum.

#### Como Usar
1. Acesse a página inicial (`/`).
2. Leia a descrição do projeto.
3. Clique no botão **"Acessar o Mapa"** para ir para `/mapa`.

#### Integração com o Backend
- A página **Home** é estática e não requer integração com backend, mas pode ser expandida para exibir dados dinâmicos (ex.: alertas recentes).

---

## Tecnologias Utilizadas
- **React**: Biblioteca para construção da interface.
- **React-Leaflet**: Integração do Leaflet com React para o mapa.
- **Leaflet**: Biblioteca para mapas interativos.
- **React Router**: Gerenciamento de rotas (ex.: `/mapa`, `/mapa/nova-postagem`).
- **CSS**: Estilização personalizada com foco em responsividade.
- **LocalStorage**: Simulação de autenticação (mockada para a apresentação).
