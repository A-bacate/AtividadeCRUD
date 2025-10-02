// Busca os dados dos usuários no server
function carregar(){
    fetch('http://localhost:3000/livros') // buscou no servidor
    .then(res => res.json()) // transformei a resposta em json (só pra garantir)
    .then(data => { // array com todos os dados que foram buscados (o professor gosta de chamar de 'data' porque são nossos dados :D )

        const tbody = document.getElementById('tabela')
        // limpar dados da tabela para ela não ficar repetindo toda vez que o site é carregado
        tbody.innerHTML = ""

        console.log(data);

        // titulo
        // autor
        // anoPublicacao
        // genero
        // idioma
        // preco

        // tristeza e dor e sofrimento
        data.forEach(livro => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td id="id">${livro.id}</td>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.anoPublicacao}</td>
                <td>${livro.genero}</td>
                <td>${livro.idioma}</td>
                <td>R$${livro.preco},00</td>
            `
            tbody.appendChild(tr)
        });
    })
}
// <td>
//     <button class="btn-excluir" onclick="excluir(${livro.id})">Excluir</button>
//     <button class="btn-editar" onclick="editar(${livro.id})">Editar</button>
// </td>
function voltar(){
    window.location.href = "../Home/Home.html"
}

function editarLista(){
    fetch('http://localhost:3000/livros')
    .then(res => res.json())
    .then(data => {
        const tbody = document.getElementById('tabela')
        tbody.innerHTML = ""

        console.log(data);
        data.forEach(livro => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td id="id">${livro.id}</td>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.anoPublicacao}</td>
                <td>${livro.genero}</td>
                <td>${livro.idioma}</td>
                <td>R$${livro.preco},00</td>
                <td>
                    <button class="btn-excluir" onclick="excluir(${livro.id})">Excluir</button>
                    <button class="btn-editar" onclick="editar(${livro.id})">Editar</button>
                </td>
            `
            tbody.appendChild(tr)
        });
    })
}

window.onload = function() {
    carregar();
    let btn = document.querySelector('.btn-editar-lista');
    if(btn) {
        btn.addEventListener('click', function() {
            if (btn.innerHTML === "Editar Lista") {
                btn.innerHTML = "Concluir Edição";
                document.querySelector('.btn-editar-lista').style.backgroundColor = '#3e8499ff';
                editarLista();
            } else {
                document.querySelector('.btn-editar-lista').style.backgroundColor = '#3a5280ff';
                btn.innerHTML = "Editar Lista";
                carregar();
            }
        });
    }
}