// ===========================
// Script unificado Dashboard
// ===========================

document.addEventListener('DOMContentLoaded', () => {

    // -------------------- Logout --------------------
    function logout() {
        window.location.href = "/sair/";
    }
    document.querySelector('.logout')?.addEventListener('click', logout);

    // -------------------- Data/Hora dinâmica --------------------
    function updateDateTime() {
        const elem = document.getElementById('datetime');
        if (!elem) return;
        const now = new Date();
        const formatted = now.toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'medium' });
        elem.innerText = formatted;
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // -------------------- Submenus Dashboard --------------------
    const menus = document.querySelectorAll('.menu-item.has-submenu > .menu-link');
    menus.forEach(menu => {
        const submenu = menu.nextElementSibling;
        if (!submenu) return;

        submenu.style.overflow = 'hidden';
        submenu.style.maxHeight = '0';
        submenu.style.display = 'none';
        submenu.style.transition = 'max-height 0.3s ease';

        menu.addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelectorAll('.submenu').forEach(sm => {
                if (sm !== submenu) {
                    sm.style.maxHeight = '0';
                    setTimeout(() => sm.style.display = 'none', 300);
                }
            });

            if (submenu.style.maxHeight === '0px' || submenu.style.maxHeight === '') {
                submenu.style.display = 'flex';
                submenu.style.flexDirection = 'column';
                const height = submenu.scrollHeight;
                submenu.style.maxHeight = height + 'px';
            } else {
                submenu.style.maxHeight = '0';
                setTimeout(() => submenu.style.display = 'none', 300);
            }
        });
    });

    // -------------------- Links do menu CRUD --------------------
    const linkMoradores = document.getElementById('link-moradores');
    const linkPets = document.getElementById('link-pets');
    const linkVeiculos = document.getElementById('link-veiculos');
    const contentArea = document.getElementById('content-area');

    // -------------------- URLs da API --------------------
    const API_BASE = '/api/';
    const endpoints = {
        moradores: API_BASE + 'moradores/',
        pets: API_BASE + 'pets/',
        veiculos: API_BASE + 'veiculos/'
    };

    // -------------------- Função para pegar o CSRF Token --------------------
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // -------------------- Funções auxiliares CRUD --------------------
    function createModal(title, fields, callback) {
        const oldModal = document.getElementById('crud-modal');
        if (oldModal) oldModal.remove();

        const modal = document.createElement('div');
        modal.id = 'crud-modal';
        modal.className = 'modal';
        modal.style.display = 'flex';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = `<h2>${title}</h2>`;

        const form = document.createElement('form');
        fields.forEach(f => {
            const label = document.createElement('label');
            label.textContent = f.label;

            const input = document.createElement('input');
            input.type = 'text';
            input.name = f.name;
            input.value = f.value || '';
            input.required = true;

            label.appendChild(input);
            form.appendChild(label);
        });

        const submit = document.createElement('button');
        submit.type = 'submit';
        submit.textContent = 'Salvar';
        form.appendChild(submit);

        form.addEventListener('submit', e => {
            e.preventDefault();
            const formData = {};
            fields.forEach(f => {
                formData[f.name] = form.elements[f.name].value;
            });
            callback(formData);
            modal.remove();
        });

        modalContent.appendChild(form);

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => modal.remove());
        modalContent.appendChild(closeBtn);

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    // -------------------- CRUD e renderização --------------------
    function renderTable(entity, data) {
        let html = '';

        html += `<div class="tabela-container">`;

        if (data.length > 0) {
            html += `<table class="tabelas">
                        <thead><tr>`;
            for (const key in data[0]) html += `<th>${key}</th>`;
            html += `<th>Ações</th></tr></thead><tbody>`;
            data.forEach(item => {
                html += `<tr>`;
                for (const key in item) html += `<td>${item[key]}</td>`;
                html += `<td>
                            <button class="edit-btn action-btn" data-id="${item.id}" data-entity="${entity}">Editar</button>
                            <button class="delete-btn action-btn" data-id="${item.id}" data-entity="${entity}">Excluir</button>
                         </td>`;
                html += `</tr>`;
            });
            html += `</tbody></table>`;
        } else {
            html += '<p>Nenhum dado encontrado.</p>';
        }

        html += `</div>`;
        html += `<button id="create-${entity}" class="action-btn" style="margin-top:15px;">Criar Novo ${entity}</button>`;

        contentArea.innerHTML = html;

        // Eventos
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const item = data.find(d => d.id == id);
                const fields = Object.keys(item)
                    .filter(k => k !== 'id')
                    .map(k => ({ name: k, label: k, value: item[k] }));
                createModal(`Editar ${entity}`, fields, formData => updateItem(entity, id, formData));
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteItem(btn.dataset.entity, btn.dataset.id));
        });

        document.getElementById(`create-${entity}`).addEventListener('click', () => {
            const fields = data.length > 0
                ? Object.keys(data[0]).filter(k => k !== 'id').map(k => ({ name: k, label: k }))
                : [{ name: 'nome', label: 'nome' }];
            createModal(`Criar ${entity}`, fields, formData => createItem(entity, formData));
        });
    }

    async function loadData(entity) {
        try {
            const res = await fetch(endpoints[entity], { credentials: 'include' });
            const data = await res.json();
            renderTable(entity, data);
        } catch (err) {
            console.error(err);
            contentArea.innerHTML = '<p>Erro ao carregar dados.</p>';
        }
    }

    // -------------------- CRUD com CSRF seguro --------------------
    async function createItem(entity, data) {
        try {
            const res = await fetch(endpoints[entity], {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            if (res.ok) loadData(entity);
            else console.error(await res.json());
        } catch (err) { console.error(err); }
    }

    async function updateItem(entity, id, data) {
        try {
            const res = await fetch(endpoints[entity] + id + '/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            if (res.ok) loadData(entity);
            else console.error(await res.json());
        } catch (err) { console.error(err); }
    }

    async function deleteItem(entity, id) {
        if (!confirm(`Deseja excluir este ${entity}?`)) return;
        try {
            const res = await fetch(endpoints[entity] + id + '/', {
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                credentials: 'include'
            });
            if (res.ok) loadData(entity);
            else console.error(await res.json());
        } catch (err) { console.error(err); }
    }

    // -------------------- Eventos dos links --------------------
    linkMoradores?.addEventListener('click', e => { e.preventDefault(); loadData('moradores'); });
    linkPets?.addEventListener('click', e => { e.preventDefault(); loadData('pets'); });
    linkVeiculos?.addEventListener('click', e => { e.preventDefault(); loadData('veiculos'); });

});

// -------------------- versão escura --------------------
document.getElementById('toggle-dark').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    // Salva a preferência no navegador
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('tema', 'escuro');
    } else {
      localStorage.setItem('tema', 'claro');
    }
  });

  // Mantém o tema escolhido entre recarregamentos
  window.addEventListener('load', () => {
    if (localStorage.getItem('tema') === 'escuro') {
      document.body.classList.add('dark-mode');
    }
  });