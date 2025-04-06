const form = document.getElementById('form-contato');
const lista = document.getElementById('lista-contatos');

// Para carregar os contatos quando a página abrir
window.addEventListener('DOMContentLoaded', () => {
    fetchContatos();
});

// Função para buscar os contatos no server
function fetchContatos() {
    fetch('/contatos')
        .then(response => response.json())
        .then(data => {
            lista.innerHTML = ''; // Limpa antes de adicionar
            data.forEach(contato => {
                const li = document.createElement('li');
                li.textContent = `${contato.nome} - ${contato.telefone}`;
                lista.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar contatos:', error));
}

// Para enviarum contato novo para o server
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    await fetch('/add', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, telefone })
    });

    form.reset();
    fetchContatos();
});
