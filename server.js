const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Função para calcular o valor baseado na idade, sexualidade e tipo de carro
function calcularValor(idade, sexualidade, tipoCarro) {
    let valorBase = 1000; // Valor base inicial

    // Aumenta o valor dependendo da idade
    if(idade < 18){
        return null; // Menores não podem dirigir
    }else if (idade >= 18 && idade < 25) {
        valorBase += 2000; // Adiciona R$2000 para menores de idade
    } else if (idade >= 25 && idade < 30) {
        valorBase += 1000; // Adiciona R$1000 para idade entre 18 e 29
    } else {
        valorBase += 500; // Adiciona R$500 para 30 anos ou mais
    }

    // Aumenta o valor dependendo da sexualidade
    if (sexualidade === 'homem') {
        valorBase += 1500; // Adiciona R$1500 para homens
    } else if (sexualidade === 'mulher') {
        valorBase += 1000; // Adiciona R$1000 para mulheres
    } else {
        valorBase += 500; // Adiciona R$500 para outras identidades
    }

    // Aumenta ou diminui o valor dependendo do tipo de carro
    switch (tipoCarro) {
        case 'luxo':
            valorBase += 3000; // Adiciona R$3000 para carros de luxo
            break;
        case 'suv':
            valorBase += 2000; // Adiciona R$2000 para SUVs
            break;
        case 'compacto':
            valorBase -= 1000; // Diminui R$1000 para carros compactos
            break;
        default:
            break;
    }

    return valorBase;
}

// Dados já alimentados
const pessoas = [
    { nome: 'Carlos', carro: 'Fusca', idade: 18, sexualidade: 'homem', tipoCarro: 'compacto' },
    { nome: 'Maria', carro: 'Civic', idade: 28, sexualidade: 'mulher', tipoCarro: 'luxo' },
    { nome: 'João', carro: 'Corolla', idade: 35, sexualidade: 'homem', tipoCarro: 'suv' },
    { nome: 'Ana', carro: 'Palio', idade: 22, sexualidade: 'mulher', tipoCarro: 'compacto' },
    { nome: 'Lucas', carro: 'Range Rover', idade: 40, sexualidade: 'outro', tipoCarro: 'luxo' }
];

// Calculando valores
const dados = pessoas.map(pessoa => ({
    nome: pessoa.nome,
    valor: calcularValor(pessoa.idade, pessoa.sexualidade.toLowerCase(), pessoa.tipoCarro.toLowerCase())
}));

// Rota para servir o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para obter os dados em formato JSON
app.get('/dados', (req, res) => {
    res.json(dados);
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
