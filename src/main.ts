import './style.css'; //Pra usar os estilos de forma global 

//definindo os "tipos" de naipes e valores de carta que podem ter com |
type Naipe = "copas" | "paus" | "espadas" | "ouros";
type Valor = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K"| "A";

//criando a classe da carta de forma geral, que vai construir cada carta de acordo com o naipe e a figura
class Carta {
  naipe: Naipe;
  valor: Valor;

  constructor(naipe: Naipe, valor: Valor) {
    this.naipe = naipe;
    this.valor = valor;
  }
}
function criarBaralho() {
  const naipes: Naipe[] = ["copas", "paus", "espadas", "ouros"];
  const valores: Valor[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  let baralho = [];
  for (const naipe of naipes) {
    for (const valor of valores) {
      baralho.push(new Carta(naipe, valor));
    }
  }
  return baralho;
}

function embaralhar(baralho: Carta[]): Carta[] {
    // Loop em todos os elementos
    let novoBaralho = [...baralho];
    for (let i = novoBaralho.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [novoBaralho[i], novoBaralho[j]] = [novoBaralho[j], novoBaralho[i]];
    }
    // Retornando novoBaralho com aleatoriedade
    return novoBaralho;
}
let baralho = criarBaralho();
console.log("Baralho original:", baralho);
let baralhoEmbaralhado = embaralhar(baralho);
console.log("Baralho embaralhado:", baralhoEmbaralhado);