# Sistema de Gestão de Condomínios - Projeto Integrador UNIvesp II

Sistema desenvolvido para o Projeto Integrador II da Universidade Univesp.
Sistema completo para gestão de condomínios residenciais com painel administrativo moderno e responsivo.

## 🚀 Funcionalidades Principais

    - Login e logout de usuários com autenticação segura (Django Auth);
    - Dashboard interativo com cards dinâmicos e data/hora atualizadas em tempo real;
    - Gerenciamento de:
        Moradores
        Veículos
        Pets
        Funcionários
    - Submenus expansíveis para melhor organização.
    - Interface responsiva: desktop, tablet e mobile.

## Pontos em melhoria

    - Possibilidade de expansão em módulos separados;
    - Sistema de comunicaçao entre portaria e condôminios;
    - Sistemas de avisos gerais;

## Integração via API REST

Foram criadas e projetadas apis para requisiçoes realizadas no banco de dados

```python
🔗 Endereços das APIs
    Geral:      http://localhost:8000/api/
    Moradores:  http://localhost:8000/api/moradores/
    Pets:       http://localhost:8000/api/pets/
    Veículos:   http://localhost:8000/api/veiculos/
```

## 🛠 Tecnologias Utilizadas

Categoria Ferramenta / Tecnologia
Backend Python, Django 4.x
Banco de Dados SQLite (padrão Django)
Frontend HTML5, CSS3, JavaScript
Framework CSS Personalizado / Flexbox
Ícones Font Awesome
Versionamento Git, GitHub
IDE / Editor VSCode, Windows 11

## ⚙ Estrutura do Projeto

SistemaCondominioPython/
├── manage.py
├── app/
│ ├── migrations/
│ ├── static/
│ │ ├── css/
│ │ └── js/
│ ├── templates/
│ │ ├── index.html
│ │ └── dashboard.html
│ ├── views.py
│ └── urls.py
├── db.sqlite3
└── README.md

## 💻 Como Executar o Projeto

```python
Clone o repositório:
git clone https://github.com/diegpo/SistemaCondominioPython.git

Acesse a pasta do projeto:
cd SistemaCondominioPython

Crie e ative o ambiente virtual:
python -m venv venv
venv\Scripts\activate

Instale as dependências:
pip install -r requirements.txt

Aplique as migrações:
python manage.py migrate

Crie um superusuário:
python manage.py createsuperuser

Inicie o servidor:
python manage.py runserver

Abra o endereço em um browser
http://127.0.0.1:8000/
```

## 🎨 Observações de Design

Dashboard inspirado em sistemas modernos, com submenus animados.
Data e hora atualizadas dinamicamente.
Logout seguro via Django.
Estilo e cores personalizadas para melhor experiência do usuário.

## 🔒 Autenticação

Sistema baseado em Django Auth.
Dashboard protegido com @login_required.
Logout seguro via botão no dashboard.

## 📚 Referências

Documentação Django
Font Awesome
W3Schools – HTML/CSS/JS

## Tela de login

<p align="center">
  <img src="https://i.imgur.com/igu99pQ.png" alt="Tela de login" width="400"/>
</p>

## Alguns Menus

<p align="center">
  <img src="https://i.imgur.com/aBUhsFV.png" alt="menus" width="400"/>
</p>

## Cadastro Simples

<p align="center">
  <img src="https://i.imgur.com/mUItjDi.png" alt="cadastro" width="400"/>
</p>

## Exemplo de API Rest GET/POST(PETS)

<p align="center">
  <img src="https://i.imgur.com/EY15pBD.png" alt="api pet" width="400"/>
</p>

## Exemplo de API Rest GET/POST(MORADORES)

<p align="center">
  <img src="https://i.imgur.com/2Id5nW8.png" alt="api pet" width="400"/>
</p>

## Acesso ao banco de dados e tabelas específicas direto pelo Python

<p align="center">
  <img src="https://i.imgur.com/T1oetoO.png" alt="api pet" width="400"/>
</p>
