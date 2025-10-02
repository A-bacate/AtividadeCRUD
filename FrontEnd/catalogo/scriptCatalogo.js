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

// excluir
function excluir(id){
    fetch(`http://localhost:3000/livros/${id}`, {
        'method': 'DELETE'
    })
    .then(() => carregar())
}

function editar(id){
    let novoTitulo = prompt("Digite o novo título: ")
    let novoAutor = prompt("Digite o novo autor: ")
    let novoAnoPublicacao = prompt("Digite o novo ano de publicação: ")
    let novoGenero = prompt("Digite o novo gênero: ")
    let novoIdioma = prompt("Digite o novo idioma: ")
    let novoPreco = prompt("Digite o novo preço: ")

    if(novoTitulo<1){
        alert("Titulo não pode estar vazio!")
        return
    }
    if(novoAutor<1){
        alert("Autor não pode estar vazio!")
        return
    }
    if(novoAnoPublicacao<1){
        alert("Ano de publicação não pode estar vazia!")
        return
    }
    if(novoGenero<1){
        alert("Gênero não pode estar vazio!")
        return
    }
    if(novoIdioma<1){
        alert("Idioma não pode estar vazio!")
        return
    }
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