"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css"); //Pra usar os estilos de forma global

//Música para meus ouvidos
const menuMusic = new Audio('src/recursos/efeitos sonoros/musicas/menu.mp3');
menuMusic.loop = true; // Coloca a música em loop
menuMusic.volume = 0.5; // Ajusta o volume da música do menu

const partidaMusic = new Audio('src/recursos/efeitos sonoros/musicas/partida.mp3');
partidaMusic.loop = true; // Coloca a música da partida em loop
partidaMusic.volume = 0.5; // Ajusta o volume da música da partida

function tocarMenu() {
    partidaMusic.pause();
    partidaMusic.currentTime = 0;
    menuMusic.play();
}

function tocarPartida() {
    menuMusic.pause();
    menuMusic.currentTime = 0;
    partidaMusic.play();
}

function pararMusicas() {
    menuMusic.pause();
    partidaMusic.pause();
    menuMusic.currentTime = 0;
    partidaMusic.currentTime = 0;
}

var maocarta = document.getElementById('Cartas');
//const objetivo = document.getElementById('pontoMeta');
var jogador = document.getElementById('seuponto');
var pontos = 0;
var nmrJogadas = 4;
var nmrDescartes = 3;
//faz os botões chamarem as funções correspondentes
(_a = document.getElementById('botaojoga')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', jogacarta);
(_b = document.getElementById('botaodescarta')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', descarta);
// Variáveis globais do jogo
var baralho = [];
var mao = [];
var descarte = [];
//criando a classe da carta de forma geral, que vai construir cada carta de acordo com o naipe e a figura
var Carta = /** @class */ (function () {
    function Carta(naipe, valor) {
        this.naipe = naipe;
        this.valor = valor;
    }
    return Carta;
}());
/**********************************************************************
 FUNÇÃO QUE INICIA TUDO
************************************************************************/
function iniciar() {
    baralho = criarBaralho();
    mao = pegarCarta(baralho, 8);
    renderiza(mao);
    // Atualiza constantemente as cartas selecionadas e da o valor da mão
    setInterval(function () {
        var selecionadas = cartasSelecionadas(mao);
        if (selecionadas.length > 0) {
            console.log("Cartas selecionadas:", selecionadas);
            var resultado = avaliarMao(selecionadas);
            console.log("Avaliação da mão:", resultado);
        }
    }, 1000); // Atualiza a cada 1000ms
}
/**********************************************************************
 FUNÇÔES SOBRE BARALHO
************************************************************************/
function criarBaralho() {
    var naipes = ["copas", "paus", "espadas", "ouros"];
    var valores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    var baralho = [];
    for (var _i = 0, naipes_1 = naipes; _i < naipes_1.length; _i++) {
        var naipe = naipes_1[_i];
        for (var _a = 0, valores_1 = valores; _a < valores_1.length; _a++) {
            var valor = valores_1[_a];
            baralho.push(new Carta(naipe, valor));
        }
    }
    embaralhar(baralho);
    return baralho;
}
function embaralhar(baralho) {
    var _a;
    //copiando so para ter controle do normal x embaralhado(mexer dps)
    for (var i = baralho.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        /* a math random pega numero
        de 0 a 1 e multiplica pelo indice + 1 e
         em seguida esse numero é arredondado para o
        inteiro mais proximo pela math.flor*/
        _a = [baralho[j], baralho[i]], baralho[i] = _a[0], baralho[j] = _a[1];
    }
    return baralho;
}
/**********************************************************************
 FUNÇÔES SOBRE MANIPULAÇÂO DE CARTA
************************************************************************/
function pegarCarta(baralho, vezes) {
    var mao = [];
    for (var i = 0; i < vezes; i++) {
        var cartaPegada = baralho.pop();
        if (cartaPegada) {
            mao.push(cartaPegada);
        }
    }
    return mao;
}
function cartasSelecionadas(mao) {
    var selecionadas = [];
    var cartasselec = document.querySelectorAll('.selecionada');
    for (var i = 0; i < cartasselec.length; i++) {
        var indiceStr = cartasselec[i].getAttribute("value");
        if (indiceStr !== null) {
            var indice = Number(indiceStr);
            if (!isNaN(indice) && mao[indice]) { //checa que o indice é de fato um numero e se existe valor naquele indice.
                selecionadas.push(mao[indice]);
            }
        }
    }
    return selecionadas;
}
/**********************************************************************
 FUNÇÔES SOBRE O JOGO E JOGAR
************************************************************************/
//função que vai avaliar as cartas selecionadas, contar naipes e cartas iguais ou sequenciais e retornar para a CalculaPontuação
//Retorna o tipo de mão e as cartas pontuantes
function avaliarMao(selecionadas) {
    //transforma as strings de valor em numero para facilitar depois
    var numeravalor = { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
        "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14 };
    // Separa os valores e naipes em dois arrays diferentes (map é um 'atalho' pra isso, evitar fazer 'for')
    var valores = selecionadas.map(function (carta) { return numeravalor[carta.valor]; });
    var naipes = selecionadas.map(function (carta) { return carta.naipe; });
    // Ordena valores de forma crescente para facilitar ver se tem sequencia 
    var valoresNumericos = __spreadArray([], valores, true).sort(function (a, b) { return a - b; });
    //defino contaValor como um objeto que vincula um valor (número) à quantidade
    var contaValor = {};
    valores.forEach(function (v) { return contaValor[v] = (contaValor[v] || 0) + 1; });
    // Converte contaValor em array ordenado por quantidade (maior primeiro)
    var valorOrdenado = Object.values(contaValor).sort(function (a, b) { return b - a; });
    // mesma coisa do valor para o naipe
    var contaNaipe = { copas: 0, paus: 0, espadas: 0, ouros: 0 };
    naipes.forEach(function (n) { return contaNaipe[n]++; });
    // Conta os naipes e ordena para pegar o mais repetido no índice 0
    var ordenaNaipe = Object.values(contaNaipe).sort(function (a, b) { return b - a; });
    /******************************************************************************************
    Até aqui foi so preparação para organizar as cartas, agora que começa verificar a mão feita
    *******************************************************************************************/
    // Função para verificar sequência retornando true ou false
    function eSequencia(arr) {
        if (arr.length < 5)
            return false;
        // Verifica sequência normal
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                return false;
            }
        }
        return true;
    }
    //Função para verificar se sao todas do mesmo naipe
    function eFlush(arr) {
        return (arr[0] === 5); // Se o naipe mais repetido aparece 5 vezes
    }
    // Funções helper para encontrar cartas específicas
    function encontrarValorComQuantidade(quantidade) {
        return Number(Object.keys(contaValor).find(function (k) { return contaValor[Number(k)] === quantidade; }) || 0);
    }
    function cartasComValor(valorNumerico) {
        return selecionadas.filter(function (c) { return numeravalor[c.valor] === valorNumerico; });
    }
    //verifica todas as possibilidades com 5 cartas jogadas necessáriamente
    if (selecionadas.length === 5) {
        // Verifica Royal Flush: A, K, Q, J, 10 do mesmo naipe
        if (eFlush(ordenaNaipe) &&
            valoresNumericos.join(',') === '10,11,12,13,14') {
            return { pontuacao: "Royal Flush", cartas: selecionadas };
        }
        // Verifica Straight Flush: sequência do mesmo naipe
        if (eFlush(ordenaNaipe) && eSequencia(valoresNumericos)) {
            return { pontuacao: "Straight Flush", cartas: selecionadas };
        }
        // Verifica Flush House: todas do mesmo naipe e três de um valor, dois de outro
        if (eFlush(ordenaNaipe) && valorOrdenado[0] === 3 && valorOrdenado[1] === 2) {
            return { pontuacao: "Flush House", cartas: selecionadas };
        }
        // Verifica Full House: três de um valor, dois de outro
        if (valorOrdenado[0] === 3 && valorOrdenado[1] === 2) {
            return { pontuacao: "Full House", cartas: selecionadas };
        }
        // Verifica Flush: todas do mesmo naipe
        if (eFlush(ordenaNaipe)) {
            return { pontuacao: "Flush", cartas: selecionadas };
        }
        // Verifica Sequência: valores em ordem
        if (eSequencia(valoresNumericos)) {
            return { pontuacao: "Sequência", cartas: selecionadas };
        }
    }
    // Verifica Quadra (quatro cartas do mesmo valor)
    if (valorOrdenado[0] === 4) {
        var quadraValor = encontrarValorComQuantidade(4);
        return { pontuacao: "Quadra", cartas: cartasComValor(quadraValor) };
    }
    // Verifica Trinca
    if (valorOrdenado[0] === 3) {
        var trincaValor = encontrarValorComQuantidade(3);
        return { pontuacao: "Trinca", cartas: cartasComValor(trincaValor) };
    }
    // Verifica Dois Pares
    if (valorOrdenado[0] === 2 && valorOrdenado[1] === 2) {
        var paresCartas = selecionadas.filter(function (c) { return contaValor[numeravalor[c.valor]] === 2; });
        return { pontuacao: "Dois Pares", cartas: paresCartas };
    }
    // Verifica Par
    if (valorOrdenado[0] === 2) {
        var parValor = encontrarValorComQuantidade(2);
        return { pontuacao: "Par", cartas: cartasComValor(parValor) };
    }
    // Carta Alta
    var cartaAlta = selecionadas.reduce(function (a, b) { return numeravalor[a.valor] > numeravalor[b.valor] ? a : b; });
    return { pontuacao: "Carta Alta", cartas: [cartaAlta] };
    //acabou
}
// Função para calcular pontuação baseada na tabela oficial
function calcularPontuacao(tipo, cartas) {
    // usei record para criar um objetivo na qual sempre vai receber uma string, no caso
    //o tipo de mão e vai corresponder ao valor e multipicador dela no Balatro 
    var tabelaPontuacao = {
        "Flush House": { base: 140, multiplicador: 14 },
        "Royal Flush": { base: 100, multiplicador: 8 },
        "Straight Flush": { base: 100, multiplicador: 8 },
        "Quadra": { base: 60, multiplicador: 7 },
        "Full House": { base: 40, multiplicador: 4 },
        "Flush": { base: 35, multiplicador: 4 },
        "Sequência": { base: 30, multiplicador: 4 },
        "Trinca": { base: 30, multiplicador: 3 },
        "Dois Pares": { base: 20, multiplicador: 2 },
        "Par": { base: 10, multiplicador: 2 },
        "Carta Alta": { base: 5, multiplicador: 1 }
    };
    //aqui puxa o correspondente a mão recebida
    var config = tabelaPontuacao[tipo];
    // Só para garantir que não é nulo
    if (config) {
        var somaCartas_1 = 0;
        cartas.forEach(function (c) {
            if (["K", "Q", "J"].includes(c.valor)) {
                somaCartas_1 += 10; //substituir as figuras por valor númerico
            }
            if (["A"].includes(c.valor)) {
                somaCartas_1 += 15; //mesma coisa com os aces
            }
            else {
                somaCartas_1 += Number(c.valor); //aqui é so somar o numero direto
            }
        });
        // Fórmula do balatro: multiplicador * (valor base +  soma das cartas)
        var pontuacaoTotal = config.multiplicador * (config.base + somaCartas_1);
        //tirar dps,mas so pra ver que ta funcionando
        console.log("".concat(tipo, ": (").concat(config.multiplicador, " \u00D7  ").concat(config.base, " + ").concat(somaCartas_1, ") = ").concat(pontuacaoTotal));
        return pontuacaoTotal;
    }
    console.error("Tipo de pontua\u00E7\u00E3o desconhecido: ".concat(tipo));
    return 0;
}
function jogacarta() {
    if (nmrJogadas > 0) {
        var selecionadas = cartasSelecionadas(mao);
        var resultado = avaliarMao(selecionadas);
        // Calcula pontuação usando a nova tabela
        var pontuacaoGanha = calcularPontuacao(resultado.pontuacao, resultado.cartas);
        pontos += pontuacaoGanha;
        if (jogador)
            jogador.textContent = pontos.toString();
        nmrJogadas -= 1;
        // Descarta todas as cartas selecionadas
        descarta();
    }
    else {
        console.log('acabou as jogadas pai');
    }
}
function descarta() {
    if (nmrDescartes > 0) {
        // Seleciona as cartas marcadas como 'selecionada' na mão
        var selecionadas = cartasSelecionadas(mao);
        if (!Array.isArray(selecionadas) || selecionadas.length === 0)
            return;
        // Remove cartas selecionadas da mão, adiciona ao descarte e substitui por novas do baralho
        for (var i = 0; i < selecionadas.length; i++) {
            var indice = mao.indexOf(selecionadas[i]); //função que procura o indice da selecionada[i] na mao e retorna, 
            // se n tiver retorna -1(checado no if embaixo aqui)
            if (indice !== -1) {
                // Substitui por nova carta do baralho, se houver
                descarte.push(mao[indice]);
                // Tenta pegar uma nova carta do baralho, se houver
                var novaCarta = baralho.length > 0 ? baralho.pop() : null;
                if (novaCarta) {
                    // Se conseguiu pegar uma nova carta, substitui a carta descartada pela nova
                    mao[indice] = novaCarta;
                }
                else {
                    // Se não houver mais cartas no baralho, remove a carta descartada da mão
                    mao.splice(indice, 1);
                }
            }
        }
        nmrDescartes -= 1;
        renderiza(mao);
    }
    else
        (console.log('acabou os descartes chefe'));
}
/**********************************************************************
 FUNÇÂO SOBRE MOSTRAR ALGO
************************************************************************/
function renderiza(mao) {
    if (!maocarta) {
        console.error("Elemento 'Cartas' não encontrado.");
    }
    else {
        maocarta.innerHTML = ' ';
        var _loop_1 = function (i) {
            var carta = document.createElement('div');
            carta.classList.add('carta');
            carta.setAttribute('value', "".concat(i));
            carta.innerHTML = "<img src=\"src/recursos/Cartas Grandes/".concat(mao[i].valor, "-").concat(mao[i].naipe, ".png\" alt=\"\">");
            carta.onclick = function () { return selecionar(carta); };
            maocarta.appendChild(carta);
        };
        for (var i = 0; i < mao.length; i++) {
            _loop_1(i);
        }
    }
}
//interatividade de selecionar carta
function selecionar(carta) {
    var nmr = document.querySelectorAll('.selecionada'); //pega todas as cartas seleciondas 
    if (nmr.length === 5 && !carta.classList.contains('selecionada')) { //verifica se ja tem 5  e se não ja foi selecionada
        carta.style.animation = 'none'; //zera as animações da carta para poder repetir o negado
        void carta.offsetWidth; //força "recarregar" o css da carta
        carta.style.animation = 'negado 2s'; //ativa a animação
    }
    else {
        carta.classList.toggle('selecionada'); // tira e coloca a classe selecionada
    }
}
/**********************************************************************
 CONSOLES para testar
************************************************************************/
iniciar();
