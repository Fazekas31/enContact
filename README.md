# Desafio Office 365 Webmail Clone - Enki Group

Este projeto consiste em uma réplica de alta fidelidade da interface de webmail do **Office 365**, desenvolvida como um desafio técnico com foco total na excelência visual, fidelidade de layout, espaçamento preciso, alinhamento pixel-perfect e transições/micro-interações premium.

## 🚀 Tecnologias Utilizadas

- **React.js 19**: Componentes funcionais e Hooks modernos.
- **TypeScript**: Tipagem estrita de todas as respostas de API e propriedades de componentes para robustez do código.
- **SCSS (Sass)**: Organizado seguindo o conceito de Design Tokens (`_variables.scss` e `_mixins.scss`), sem utilizar frameworks utilitários como Tailwind ou CSS-in-JS.
- **Context API**: Para gerenciamento de estado global reativo (como troca dinâmica de Tema Claro/Escuro, idioma Português/Inglês, termos de busca e seleção de e-mails).
- **Lucide React**: Biblioteca de ícones modernos e limpos.

---

## 🎨 Funcionalidades e Micro-interações Desenvolvidas

1. **Layout Shell Responsivo**:
   - Barra superior (**Topbar**) inspirada no visual real do Office 365, com campo de busca com transição ao receber foco e avatar do usuário logado.
   - Menu lateral (**Sidebar**) responsivo que colapsa em telas menores (tablet/mobile).

2. **Menu Lateral Recursivo (Sidebar)**:
   - Busca dinamicamente os itens no endpoint `/menus` da API.
   - Renderiza uma estrutura de diretórios aninhada (contas e pastas).
   - Possui submenus colapsáveis com rotação suave do chevron.
   - Exibe o estado ativo destacando a pasta atual com borda esquerda e cor estilizada.
   - Mapeia ícones adequados (Inbox, Sent, VIP, Trash) com base no nome de cada pasta.

3. **Lista de E-mails Interativa (Mail List - Alta Prioridade)**:
   - Carrega e-mails dinamicamente do endpoint `/items/{id}` baseado na pasta ativa.
   - **Estado Padrão**: Mostra as iniciais do remetente (Owner) em um círculo colorido grande e avatares dos participantes (Users) sobrepostos no lado direito.
   - **Hover State**: Ao passar o mouse sobre uma linha, o círculo de iniciais do remetente transiciona suavemente (via CSS transition) para um Checkbox do Fluent UI.
   - **Active State (Modo de Seleção)**: Ao marcar pelo menos um e-mail da lista, todas as linhas entram no modo de seleção, ocultando permanentemente os avatares dos proprietários para exibir os checkboxes de seleção múltipla.
   - Assuntos longos são truncados elegantemente com `text-overflow: ellipsis`.
   - Barra de busca dinâmica que filtra a lista local em tempo real.

4. **Barra de Ações (Action Toolbar)**:
   - Possui o botão **Arquivar** (Archive), que fica desabilitado por padrão.
   - Quando um ou mais e-mails são marcados pelos checkboxes, o botão torna-se visualmente ativo e clicável.
   - Clicar em "Arquivar" remove localmente os itens selecionados da visualização.

5. **Skeleton Shimmer Loading**:
   - Enquanto a API busca os dados de e-mails, um visualizador fantasma (Skeleton Row) com animação de shimmer (pulsação de gradiente) é exibido para aprimorar a experiência de usuário (UX).

6. **Dropdown de Perfil Animado**:
   - Ao clicar no avatar do usuário no Topbar, um menu suspenso de perfil é aberto com animação suave de escala e fade-in.
   - Permite alternar dinamicamente o tema global (Claro/Escuro) e o idioma (PT/EN) da interface.
   - Fecha automaticamente ao clicar em qualquer lugar fora do dropdown.

---

## 📂 Estrutura do Projeto

```
src/
├── types/
│   └── index.ts                 # Interfaces TypeScript estritas
├── context/
│   └── AppContext.tsx           # Contexto global (Tema, Idioma, E-mails e Seleções)
├── styles/
│   ├── _variables.scss          # Design Tokens (Cores, Fontes, Sombras)
│   ├── _mixins.scss             # Breakpoints responsivos, Scrollbars finos
│   ├── main.scss                # Reset CSS global e animações shimmer
│   └── App.scss                 # Estilos específicos do layout e componentes
├── components/
│   ├── atoms/
│   │   ├── Avatar.tsx           # Círculos de iniciais coloridos
│   │   ├── Checkbox.tsx         # Checkbox estilo Fluent UI
│   │   └── SkeletonRow.tsx      # Skeleton para efeito de carregamento
│   ├── molecules/
│   │   ├── ProfileDropdown.tsx  # Dropdown de opções de perfil
│   │   └── MailRow.tsx          # Linha de e-mail com hover e lógica de seleção
│   ├── organisms/
│   │   ├── Topbar.tsx           # Cabeçalho da aplicação
│   │   ├── Sidebar.tsx          # Menu de navegação recursivo
│   │   ├── ActionToolbar.tsx    # Barra de ações (Arquivar)
│   │   └── MailList.tsx         # Renderizador de e-mails com Skeletons
│   └── templates/
│       └── Layout.tsx           # Estruturação e Grid de Layout
├── App.tsx                      # Componente Raiz
└── main.tsx                     # Ponto de Entrada do Vite
```

---

## 🛠️ Como Executar o Projeto Localmente

### 1. Pré-requisitos
Certifique-se de possuir o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 2. Instalar dependências
Na raiz do projeto, execute:
```bash
npm install
```

### 3. Rodar em modo de desenvolvimento
Para iniciar o servidor de desenvolvimento local, execute:
```bash
npm run dev
```
O console exibirá a URL local (geralmente `http://localhost:5173`) para acessar a aplicação em seu navegador.

### 4. Compilar para produção (Build)
Para compilar o código de forma otimizada para produção e validar as tipagens do TypeScript:
```bash
npm run build
```
O build criará a pasta `/dist` com todo o bundle estático pronto para implantação.
