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
var maocarta = document.getElementById('Cartas');
//criando a classe da carta de forma geral, que vai construir cada carta de acordo com o naipe e a figura
var Carta = /** @class */ (function () {
    function Carta(naipe, valor) {
        this.naipe = naipe;
        this.valor = valor;
    }
    return Carta;
}());
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
// Função para avaliar a mão de cartas selecionadas e retornar o nome da combinação
function avaliarMao(selecionadas) {
    // Record<Valor, number> é um tipo TypeScript que cria um objeto onde as chaves são do tipo Valor
    // e os valores são números. Isso garante type safety - só aceita chaves válidas ("2", "3"..."A")
    var valorMap = {
        "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7,
        "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14
    };
    // .map() percorre cada carta e transforma o valor string em número usando valorMap
    // Ex: carta com valor "J" vira 11. .sort() ordena os números do menor para maior
    var valores = selecionadas.map(function (c) { return valorMap[c.valor]; }).sort(function (a, b) { return a - b; });
    // .map() extrai apenas a propriedade 'naipe' de cada carta, criando um array de strings
    var naipes = selecionadas.map(function (c) { return c.naipe; });
    // Record<number, number> cria um objeto para contar quantas vezes cada valor aparece
    // Inicializado vazio, será preenchido no forEach seguinte
    var valorConta = {};
    // .forEach() executa uma função para cada valor no array 'valores'
    // (valorConta[v] || 0) retorna o valor atual ou 0 se não existir
    // + 1 incrementa a contagem. Resultado: conta quantas vezes cada número aparece
    valores.forEach(function (v) { return valorConta[v] = (valorConta[v] || 0) + 1; });
    // Similar ao anterior, mas conta quantas cartas de cada naipe existem
    var naipeConta = {
        copas: 0,
        paus: 0,
        espadas: 0,
        ouros: 0
    };
    naipes.forEach(function (n) {
        naipeConta[n] = (naipeConta[n] || 0) + 1;
    });
    // Object.values() pega todos os valores do objeto (ignora as chaves)
    // .some() retorna true se PELO MENOS UM valor satisfaz a condição
    // Aqui verifica se algum naipe aparece 5 vezes (todas as cartas do mesmo naipe)
    var isFlush = Object.values(naipeConta).some(function (count) { return count === 5; });
    // Verifica se é uma sequência (straight). Duas condições:
    // 1. selecionadas.length === 5: deve ter exatamente 5 cartas
    // 2. valores.every(): TODAS as cartas devem satisfazer a condição
    //    - i === 0: primeira carta sempre passa (não tem anterior para comparar)
    //    - v === arr[i - 1] + 1: cada carta deve ser 1 número maior que a anterior
    // 3. || verifica caso especial: A-2-3-4-5 (ás baixo)
    //    JSON.stringify() converte arrays em string para comparar facilmente
    var isStraight = selecionadas.length === 5 && (valores.every(function (v, i, arr) {
        return i === 0 || v === arr[i - 1] + 1;
    }) || (JSON.stringify(valores) === JSON.stringify([2, 3, 4, 5, 14])) // Ace baixo
    );
    // Object.values() pega as contagens de valorConta (ex: [2, 3] se tiver um par e uma trinca)
    // .sort((a, b) => b - a) ordena do MAIOR para o MENOR
    // Isso facilita identificar combinações: [4] = quadra, [3, 2] = full house, etc.
    var counts = Object.values(valorConta).sort(function (a, b) { return b - a; });
    // Série de if's que verifica combinações da MAIOR para MENOR valor
    // Royal Flush: flush + straight + carta mais alta é Ás (14)
    if (isFlush && isStraight && valores[4] === 14)
        return "Royal Flush";
    // Straight Flush: flush (mesmo naipe) + straight (sequência)
    if (isFlush && isStraight)
        return "Straight Flush";
    // Quadra: counts[0] === 4 significa que o valor mais repetido aparece 4 vezes
    if (counts[0] === 4)
        return "Quadra";
    // Full House: 3 iguais + 2 iguais (counts fica [3, 2])
    if (counts[0] === 3 && counts[1] === 2)
        return "Full House";
    // Flush: todas do mesmo naipe (mas não em sequência)
    if (isFlush)
        return "Flush";
    // Straight: sequência (mas não do mesmo naipe)
    if (isStraight)
        return "Sequência";
    // Trinca: 3 cartas iguais (counts fica [3, 1, 1])
    if (counts[0] === 3)
        return "Trinca";
    // Dois Pares: counts fica [2, 2, 1]
    if (counts[0] === 2 && counts[1] === 2)
        return "Dois Pares";
    // Um Par: counts fica [2, 1, 1, 1]
    if (counts[0] === 2)
        return "Um Par";
    // Se nenhuma condição anterior foi atendida, não há combinação especial
    return "Carta Alta";
}
/**********************************************************************
 FUNÇÂO SOBRE MOSTRAR ALGO
************************************************************************/
function renderiza(mao) {
    if (!maocarta) {
        console.error("Elemento 'Cartas' não encontrado.");
    }
    else {
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
var baralho = criarBaralho();
baralho = embaralhar(baralho);
console.log("Baralho embaralhado:", baralho);
var mao = pegarCarta(baralho, 8);
console.log("mao do jogador:", mao);
renderiza(mao);
// Atualiza constantemente as cartas selecionadas
setInterval(function () {
    var selecionadas = cartasSelecionadas(mao);
    if (selecionadas.length > 0) {
        console.log("Cartas selecionadas:", selecionadas);
        // Avalia a mão apenas se tiver exatamente 5 cartas selecionadas
        var resultado = avaliarMao(selecionadas);
        console.log("Avaliação da mão:", resultado);
    }
}, 1000); // Atualiza a cada 1000ms
