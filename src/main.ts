import "./style.css"; //Pra usar os estilos de forma global

//definindo os "tipos" de naipes e valores de carta que podem ter com |
type Naipe = "copas" | "paus" | "espadas" | "ouros";
type Valor =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";
  const maocarta = document.getElementById('Cartas');
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
  const valores: Valor[] = [  
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
  let baralho = [];
  for (const naipe of naipes) {
    for (const valor of valores) {
      baralho.push(new Carta(naipe, valor));
    }
  }
  return baralho;
}

function embaralhar(baralho: Carta[]): Carta[] {
  let novoBaralho = [...baralho]; //copiando so para ter controle do normal x embaralhado(mexer dps)
  for (let i = novoBaralho.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    /* a math random pega numero 
    de 0 a 1 e multiplica pelo indice + 1 e
     em seguida esse numero é arredondado para o
    inteiro mais proximo pela math.flor*/
    [novoBaralho[i], novoBaralho[j]] = [novoBaralho[j], novoBaralho[i]];
  }
  return novoBaralho;
}
function pegarCarta(baralho: Carta[], vezes: number): Carta[] {
  let mao: Carta[] = [];
  for (let i = 0; i < vezes; i++) {
    const cartaPegada = baralho.pop();
    if (cartaPegada) {
      mao.push(cartaPegada);
    }
  }
  return mao;
}
function selecionar(carta: HTMLElement) {
  const nmr = document.querySelectorAll('.selecionada');
  if (nmr.length === 5 && !carta.classList.contains('selecionada')) {
    carta.style.animation = 'none';
    // Força o reflow para reiniciar a animação
    void carta.offsetWidth;
    carta.style.animation = 'negado 2s';
  } else {
    carta.classList.toggle('selecionada');
  }
}

function renderiza(mao: Carta[]): void {
  for (let i = 0; i < mao.length; i++) {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.innerHTML = `<img src="src/recursos/Cartas Grandes/${mao[i].valor}-${mao[i].naipe}.png" alt="">`;
    carta.onclick = () => selecionar(carta);
    maocarta.appendChild(carta);
  }
}

//nao funciona tem arrumar
function cartasSelecionadas(mao: Carta[]): Carta[] {
  const selecionadas: Carta[] = [];
  const cartasDivs = document.querySelectorAll('.carta');
  cartasDivs.forEach((div, i) => {
    if (div.classList.contains('selecionada')) {
      selecionadas.push(mao[i]);
    }
  });
  return selecionadas;
}

let baralho = criarBaralho();
baralho = embaralhar(baralho);
console.log("Baralho embaralhado:", baralho);
let mao = pegarCarta(baralho, 8);
console.log("mao do jogador:", mao);
renderiza(mao);
