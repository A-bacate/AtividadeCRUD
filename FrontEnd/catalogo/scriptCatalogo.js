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
        const bt = document.getElementById('botao')
        bt.innerHTML = ""
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
        const bt = document.getElementById('botao')
        bt.innerHTML = `
            <button class="btn-adicionar" onclick="adicionar()">Adicionar</button>
        `
    })
}

// excluir
function excluir(id){
    fetch(`http://localhost:3000/livros/${id}`, {
        'method': 'DELETE'
    })
    .then(() => carregar())
}

function editar(id){
    let novoTitulo = prompt("Digite o novo título: ")
    if(novoTitulo<1){
        alert("Titulo não pode estar vazio!")
        return
    }

    let novoAutor = prompt("Digite o novo autor: ")
    if(novoAutor<1){
        alert("Autor não pode estar vazio!")
        return
    }

    let novoAnoPublicacao = prompt("Digite o novo ano de publicação: ")
    if(novoAnoPublicacao<1){
        alert("Ano de publicação não pode estar vazia!")
        return
    }

    let novoGenero = prompt("Digite o novo gênero: ")
    if(novoGenero<1){
        alert("Gênero não pode estar vazio!")
        return
    }

    let novoIdioma = prompt("Digite o novo idioma: ")
    if(novoIdioma<1){
        alert("Idioma não pode estar vazio!")
        return
    }

    let novoPreco = prompt("Digite o novo preço: ")
    if(novoPreco<1){
        alert("Preço não pode estar vazio!")
        return
    }

    fetch(`http://localhost:3000/livros/${id}`, {
        'method': 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            titulo: novoTitulo,
            autor: novoAutor,
            anoPublicacao: novoAnoPublicacao,
            genero: novoGenero,
            idioma: novoIdioma,
            preco: novoPreco 
        })   
    })
    .then(() => carregar())
}

function adicionar(){
    let novoTitulo = prompt("Digite o título: ")
    if(novoTitulo<1){
        alert("Titulo não pode estar vazio!")
        return
    }

    let novoAutor = prompt("Digite o autor: ")
    if(novoAutor<1){
        alert("Autor não pode estar vazio!")
        return
    }

    let novoAnoPublicacao = prompt("Digite o ano de publicação: ")
    if(novoAnoPublicacao<1){
        alert("Ano de publicação não pode estar vazia!")
        return
    }

    let novoGenero = prompt("Digite o gênero: ")
    if(novoGenero<1){
        alert("Gênero não pode estar vazio!")
        return
    }

    let novoIdioma = prompt("Digite o idioma: ")
    if(novoIdioma<1){
        alert("Idioma não pode estar vazio!")
        return
    }

    let novoPreco = prompt("Digite o preço: ")
    if(novoPreco<1){
        alert("Preço não pode estar vazio!")
        return
    }

    fetch(`http://localhost:3000/livros/`, {
        'method': 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            titulo: novoTitulo,
            autor: novoAutor,
            anoPublicacao: novoAnoPublicacao,
            genero: novoGenero,
            idioma: novoIdioma,
            preco: novoPreco 
        })
    })
    .then(() => carregar())
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