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


var maocarta = document.getElementById('Cartas');
var jogador = document.getElementById('seuponto');
var pontos = 0;
var nmrJogadas = 4;
var nmrDescartes = 3;

(_a = document.getElementById('botaojoga')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', jogacarta);
(_b = document.getElementById('botaodescarta')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', descarta);
var baralho = [];
var mao = [];
var descarte = [];
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
    setInterval(function () {
        var selecionadas = cartasSelecionadas(mao);
        if (selecionadas.length > 0) {
            console.log("Cartas selecionadas:", selecionadas);
            var resultado = avaliarMao(selecionadas);
            console.log("Avaliação da mão:", resultado);
        }
    }, 1000);
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

    for (var i = baralho.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
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
            if (!isNaN(indice) && mao[indice]) { 
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
   
    var numeravalor = { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
        "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14 };
    
    var naipes = selecionadas.map(function (carta) { return carta.naipe; });
   
    var valoresNumericos = __spreadArray([], valores, true).sort(function (a, b) { return a - b; });
   
    var contaValor = {};
    valores.forEach(function (v) { return contaValor[v] = (contaValor[v] || 0) + 1; });
   
    var valorOrdenado = Object.values(contaValor).sort(function (a, b) { return b - a; });
   
    var contaNaipe = { copas: 0, paus: 0, espadas: 0, ouros: 0 };
    naipes.forEach(function (n) { return contaNaipe[n]++; });

    var ordenaNaipe = Object.values(contaNaipe).sort(function (a, b) { return b - a; });

    /******************************************************************************************
    Até aqui foi so preparação para organizar as cartas, agora que começa verificar a mão feita
    *******************************************************************************************/

    function eSequencia(arr) {
        if (arr.length < 5)
            return false;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                return false;
            }
        }
        return true;
    }

    function eFlush(arr) {
        return (arr[0] === 5);
    }

    function encontrarValorComQuantidade(quantidade) {
        return Number(Object.keys(contaValor).find(function (k) { return contaValor[Number(k)] === quantidade; }) || 0);
    }
    function cartasComValor(valorNumerico) {
        return selecionadas.filter(function (c) { return numeravalor[c.valor] === valorNumerico; });
    }

    if (selecionadas.length === 5) {
 
        if (eFlush(ordenaNaipe) &&
            valoresNumericos.join(',') === '10,11,12,13,14') {
            return { pontuacao: "Royal Flush", cartas: selecionadas };
        }

        if (eFlush(ordenaNaipe) && eSequencia(valoresNumericos)) {
            return { pontuacao: "Straight Flush", cartas: selecionadas };
        }

        if (eFlush(ordenaNaipe) && valorOrdenado[0] === 3 && valorOrdenado[1] === 2) {
            return { pontuacao: "Flush House", cartas: selecionadas };
        }

        if (valorOrdenado[0] === 3 && valorOrdenado[1] === 2) {
            return { pontuacao: "Full House", cartas: selecionadas };
        }

        if (eFlush(ordenaNaipe)) {
            return { pontuacao: "Flush", cartas: selecionadas };
        }

        if (eSequencia(valoresNumericos)) {
            return { pontuacao: "Sequência", cartas: selecionadas };
        }
    }

    if (valorOrdenado[0] === 4) {
        var quadraValor = encontrarValorComQuantidade(4);
        return { pontuacao: "Quadra", cartas: cartasComValor(quadraValor) };
    }

    if (valorOrdenado[0] === 3) {
        var trincaValor = encontrarValorComQuantidade(3);
        return { pontuacao: "Trinca", cartas: cartasComValor(trincaValor) };
    }

    if (valorOrdenado[0] === 2 && valorOrdenado[1] === 2) {
        var paresCartas = selecionadas.filter(function (c) { return contaValor[numeravalor[c.valor]] === 2; });
        return { pontuacao: "Dois Pares", cartas: paresCartas };
    }

    if (valorOrdenado[0] === 2) {
        var parValor = encontrarValorComQuantidade(2);
        return { pontuacao: "Par", cartas: cartasComValor(parValor) };
    }

    var cartaAlta = selecionadas.reduce(function (a, b) { return numeravalor[a.valor] > numeravalor[b.valor] ? a : b; });
    return { pontuacao: "Carta Alta", cartas: [cartaAlta] };

}

function calcularPontuacao(tipo, cartas) {

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

    var config = tabelaPontuacao[tipo];
    if (config) {
        var somaCartas_1 = 0;
        cartas.forEach(function (c) {
            if (["K", "Q", "J"].includes(c.valor)) {
                somaCartas_1 += 10; 
            }
            if (["A"].includes(c.valor)) {
                somaCartas_1 += 15;
            }
            else {
                somaCartas_1 += Number(c.valor);
            }
        });

        var pontuacaoTotal = config.multiplicador * (config.base + somaCartas_1);
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
        var pontuacaoGanha = calcularPontuacao(resultado.pontuacao, resultado.cartas);
        pontos += pontuacaoGanha;
        if (jogador)
            jogador.textContent = pontos.toString();
        nmrJogadas -= 1;
        descarta();
    }
    else {
        console.log('acabou as jogadas pai');
    }
}
function descarta() {
    if (nmrDescartes > 0) {

        var selecionadas = cartasSelecionadas(mao);
        if (!Array.isArray(selecionadas) || selecionadas.length === 0)
            return;

        for (var i = 0; i < selecionadas.length; i++) {
            var indice = mao.indexOf(selecionadas[i]); 

            if (indice !== -1) {

                descarte.push(mao[indice]);

                var novaCarta = baralho.length > 0 ? baralho.pop() : null;
                if (novaCarta) {

                    mao[indice] = novaCarta;
                }
                else {

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

function selecionar(carta) {
    var nmr = document.querySelectorAll('.selecionada');  
    if (nmr.length === 5 && !carta.classList.contains('selecionada')) { 
        carta.style.animation = 'none'; 
        void carta.offsetWidth; 
        carta.style.animation = 'negado 2s'; 
    }
    else {
        carta.classList.toggle('selecionada'); 
    }
}
/**********************************************************************
 CONSOLES para testar
************************************************************************/
iniciar();
