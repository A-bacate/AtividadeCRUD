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
window.onload = carregar