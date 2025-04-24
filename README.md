# 🛍️ Ecommerce Web App

## 📌 Sobre o Projeto
Este projeto consiste no desenvolvimento de um **E-commerce Web Responsivo** utilizando tecnologias modernas para garantir uma experiência fluida e intuitiva. O sistema inclui funcionalidades essenciais como autenticação, gestão de produtos, carrinho de compras e checkout.

## 🚀 Tecnologias Utilizadas
- **React.js** (para a interface do usuário)
- **Redux** (para gerenciamento de estado do carrinho)
- **Clerk** (para autenticação de usuários)
- **API de CEP** (para preenchimento automático de endereço no checkout)
- **TailwindCSS** (para estilização responsiva)
- **Fetch API** (para consumo de API)

## 🛠️ Arquitetura  
- **Gerenciamento de Estado**:  
  - Carrinho: Redux Toolkit (com persistência no localStorage).  
  - Tema: Context API (evitando renders desnecessários).  
- **Performance**:  
  - Lazy loading de rotas com `React.lazy`.  
  - Imagens otimizadas com `loading="lazy"`.  
  
## 📜 Funcionalidades Principais

### 1️⃣ **Header (Topo do Site)**
- Exibido em todas as páginas.
- Contém um banner promocional como uma navbar extra.
- Logotipo com nome do site.
- Menu de navegação:
  - **Home** → Direciona para a página inicial.
  - **Shop** → Direciona para a listagem de produtos.
  - **About** → Informações sobre o desenvolvedor.
- Ícone do **carrinho** com a quantidade de itens adicionados.
- Ícone de **perfil**:
  - Usuário não logado → Direciona para a página de login.
  - Usuário logado → Exibe foto de perfil (ou iniciais do nome) e direciona para a página de perfil.

### 2️⃣ **Footer (Rodapé do Site)**
- Exibido em todas as páginas.
- Seção **Join Our Newsletter** para cadastro de e-mails, com verificação via ZOD.
- Links de navegação:
  - **About Us** → Sobre o site.
  - **My Account** → Perfil do usuário.
  - **Checkout** → Finalização de compra.
  - **Cart** → Carrinho de compras.
- Mensagem de **copyright** com o ano atual (2025).

### 3️⃣ **Home (Página Inicial)**
- Botões "View Collection" e "Start Browsing" direcionam para a página de produtos.
- Listagem de produtos **Best Selling** e **On Offer**, obtidos via API.
- Mouse em cima dos produtos exibe um hover que exibe as funcionalidades: **Add to Cart** e **Favorite**
- Clique nos produtos redireciona para a página de detalhes do produto.

### 4️⃣ **Shop (Listagem de Produtos)**
- **Breadcrumb**: "Ecommerce > Search".
- **Filtros**:
  - **Categorias** (dinâmico via API).
  - **Preço** (slider ajustável com valores da API).
- **Campo de busca** por nome do produto.
- **Paginação**: Limitação de 9 produtos por página.
- **Cards de produtos** contendo:
  - Imagem
  - Nome
  - Estoque (In Stock / No Stock)
  - Preço

### 5️⃣ **Product (Detalhes do Produto)**
- **Breadcrumb**: "Ecommerce > [Nome do Produto]".
- Carrossel com **até 4 imagens** do produto.
- Exibição de:
  - Nome do produto
  - Avaliações
  - Estoque
  - Opções de cores e tamanhos (dinâmicos via API)
  - Quantidade selecionável (mínimo = 1)
- Botão **Adicionar ao Carrinho** (desabilitado se cor/tamanho não forem selecionados).
- **Produtos Relacionados** (até 4 produtos via API).

### 6️⃣ **Cart (Carrinho de Compras)**
- **Gerenciado com Redux**.
- **Breadcrumb**: "Ecommerce > Cart".
- Listagem de produtos no carrinho, incluindo:
  - Imagem, nome, cor, tamanho, preço e quantidade.
  - Opção para alterar quantidade ou remover produto.
- **Resumo da compra**:
  - Subtotal
  - Taxa de envio
  - Total
- Botão **Checkout** (disponível somente para usuários logados).
- Link "Continue Shopping" → Retorna para **Shop**.

### 7️⃣ **Autenticação (Clerk)**
- **Login**:
  - Via **e-mail e senha**.
  - Via **Google** (com **AuthenticateWithRedirectCallback** componente do clerk)
- **Cadastro**:
  - Via **e-mail e senha** ou **Google**.

### 8️⃣ **Checkout (Finalização da Compra)**
- **Breadcrumb**: "Ecommerce > Checkout".
- Formulário para dados de endereço (com preenchimento automático via API de CEP).
- Campos **Email** e **Full Name** preenchidos automaticamente com dados do usuário logado.
- **Resumo do Pedido**:
  - Subtotal
  - Taxa de envio
  - Total
- Botão **Place Order** (desabilitado até que o usuário complete as informações corretamente).
- Redireciona para **After Payment** após a finalização.

### 5️⃣ **Profile (Dados do Usuário)**
- **Breadcrumb**: "Ecommerce > Profie".
- Sidebar com 4 sections:
  - Orders: Para exibição dos pedidos feitos pelo usuário logado
  - Account Details: Para exibição dos detalhes do usuário (recuperados do clerk)
  - Wishlist: Para exibição dos itens favoritados pelo usuário
  - Logout: Para deslogar o usuário

## Aviso sobre Imagens
As imagens utilizadas neste projeto são apenas para fins **educacionais/demonstrativos** (portfólio).  
- Se você é o detentor dos direitos de alguma imagem e deseja sua remoção, entre em contato: [manuella.rodrigues.dev@gmail.com].

## 📂 Estrutura do Projeto
```
/ecommerce-app
│-- /src
│   │-- /api (centralização das requisições fetch HTTP)
│   │-- /assets (pasta de imagens do projeto)
│   │-- /components (componentes)
│   │-- /const (constantes)
│   │-- /contexts (para o themeContext)
│   │-- /hooks (hooks para o fetch, redux e theme)
│   │-- /lib (centralizando a config do clerk)
│   │-- /pages (paginas)
│   │-- /providers (para o themeProvider)
│   │-- /routes (centralização das rotas)
│   │-- /schemas (schemas para validação com ZOD)
│   │-- /store (configuração do redux e dos slices)
│   │-- /styles (css)
│   │-- /types (centralização das interfaces do projeto)
│   │-- /utils (configuração do cn para o concatenar tailwind)
│   │-- App.tsx
│   │-- main.tsx
│   │-- index.js
│   │-- index.js
│-- /public
│-- package.json
│-- README.md
│-- .env
│-- db.json
...
```

## 🛠️ Como Executar o Projeto
1. Clone este repositório:
   ```sh
   git clone https://github.com/manuellarodrigues/aws_react_dez24_d03
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd desafio-3-compass
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie a aplicação:
   ```sh
   npm run start (devido a dependencia concurrently que inicializa o server junto)
   ```

## 📧 Contato
Para mais informações sobre este projeto, entre em contato:
- **Nome:** Manuella da Silva Rodrigues
- **E-mail:** manuella.rodrigues.dev@gmail.com
- **GitHub:** https://github.com/manuellarodrigues

---

🛒 **Ecommerce Web App** | Desenvolvido por Manuella Rodrigues 🚀

