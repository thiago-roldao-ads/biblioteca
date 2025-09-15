const API_URL = 'http://localhost:5000/api/livros';

async function adicionarLivro() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const ano = document.getElementById('ano').value;

    const livro = { titulo, autor, ano: parseInt(ano) };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livro)
    });

    if (res.ok) {
        alert('Livro adicionado!');
        listarLivros();

        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('ano').value = '';

        document.getElementById('titulo').focus();
    } else {
        const erro = await res.json();
        alert(`Erro: ${erro.erro}`);
    }
}

async function listarLivros() {
    const res = await fetch(API_URL);
    const livros = await res.json();

    const lista = document.getElementById('listaLivros');
    lista.innerHTML = '';

    livros.forEach(livro => {
        const li = document.createElement('li');
        li.textContent = `${livro.titulo} - ${livro.autor} (${livro.ano || 'Sem ano'})`;

        const btnDel = document.createElement('button');
        btnDel.textContent = 'Excluir';
        btnDel.onclick = () => deletarLivro(livro._id);

        li.appendChild(btnDel);
        lista.appendChild(li);
    });
}

async function buscarLivros() {
    const termo = document.getElementById('busca').value;
    const res = await fetch(`${API_URL}/buscar?termo=${encodeURIComponent(termo)}`);
    const livros = await res.json();

    const lista = document.getElementById('listaLivros');
    lista.innerHTML = '';

    livros.forEach(livro => {
        const li = document.createElement('li');
        li.textContent = `${livro.titulo} - ${livro.autor} (${livro.ano || 'Sem ano'})`;

        const btnDel = document.createElement('button');
        btnDel.textContent = 'Excluir';
        btnDel.onclick = () => deletarLivro(livro._id);

        li.appendChild(btnDel);
        lista.appendChild(li);
    });
}

async function deletarLivro(id) {
    const confirmacao = confirm('Tem certeza que deseja excluir este livro?');
    if (!confirmacao) return;

    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    alert('Livro deletado!');
    listarLivros();
}

// Carrega livros ao abrir a página
window.onload = listarLivros;