const form = document.getElementById('form-Atividade');
const inputNomeAtividade = document.getElementById('nome-Atividade');
const inputNotaAtividade = document.getElementById('nota-Atividade');

const spanAprovado = `<span class="resultado aprovado">Aprovado</span>`
const spanReprovado = `<span class="resultado reprovado">Reprovado</span>`
const imgAprovado = `<img src="/doc/aprovado.png" alt="emoji-aprovado"></img>`
const imgReprovado = `<img src="/doc/reprovado.png" alt="emoji-reprovado"></img>`

const notaMinima = parseFloat(prompt('Digite a nota minima para ser aprovado '))
const atividades = []
const notas = []

let linhas = ''

form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    adicionarLinha();
    atualizaTabela();
    atualizaNotaFinal();

});


function adicionarLinha() {

if (atividades.includes(inputNomeAtividade.value)) {
    alert(`A atividade ${inputNomeAtividade.value} ja foi adicionada antes, tente outro nome`)
} else {
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));


    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
    linha += '</tr>';

    linhas += linha;
}

limpaCampos();

};


function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}


function limpaCampos() {
    inputNomeAtividade.value = ''
    inputNotaAtividade.value = ''
}


function atualizaNotaFinal () {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(1);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}


function calculaMediaFinal () {
    const somaTotal = notas.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0)
    return (somaTotal / atividades.length )
}