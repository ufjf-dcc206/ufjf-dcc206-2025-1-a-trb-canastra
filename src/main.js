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
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css"); //Pra usar os estilos de forma global
//criando a classe da carta de forma geral, que vai construir cada carta de acordo com o naipe e a figura
var Carta = /** @class */ (function () {
    function Carta(naipe, valor) {
        this.naipe = naipe;
        this.valor = valor;
    }
    return Carta;
}());
function criarBaralho() {
    var naipes = ["copas", "paus", "espadas", "ouros"];
    var valores = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
    ];
    var baralho = [];
    for (var _i = 0, naipes_1 = naipes; _i < naipes_1.length; _i++) {
        var naipe = naipes_1[_i];
        for (var _a = 0, valores_1 = valores; _a < valores_1.length; _a++) {
            var valor = valores_1[_a];
            baralho.push(new Carta(naipe, valor));
        }
    }
    return baralho;
}
function embaralhar(baralho) {
    var _a;
    var novoBaralho = __spreadArray([], baralho, true); //copiando so para ter controle do normal x embaralhado(mexer dps)
    for (var i = novoBaralho.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        /* a math random pega numero
        de 0 a 1 e multiplica pelo indice + 1 e
         em seguida esse numero é arredondado para o
        inteiro mais proximo pela math.flor*/
        _a = [novoBaralho[j], novoBaralho[i]], novoBaralho[i] = _a[0], novoBaralho[j] = _a[1];
    }
    return novoBaralho;
}
function pegarCarta(baralho, vezes) {
    var mao = [];
    for (var i = 0; i < vezes; i++) {
        var cartapegada = baralho.pop();
        mao.push(cartapegada);
    }
    return mao;
}
var baralho = criarBaralho();
console.log("Baralho original:", baralho);
var baralhoEmbaralhado = embaralhar(baralho);
console.log("Baralho embaralhado:", baralhoEmbaralhado);
var mao = pegarCarta(baralhoEmbaralhado, 4);
console.log("mao do jogador:", mao);
