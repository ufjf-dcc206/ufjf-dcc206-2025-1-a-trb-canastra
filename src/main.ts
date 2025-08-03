import "./style.css"; //Pra usar os estilos de forma global
/**********************************************************************
 CONSTANTES,TIPOS e CLASSES
************************************************************************/
//definindo os "tipos" de naipes e valores de carta que podem ter com |
type Naipe = "copas" | "paus" | "espadas" | "ouros";

type Valor = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

const maocarta = document.getElementById('Cartas');
//const objetivo = document.getElementById('pontoMeta');
const jogador = document.getElementById('seuponto');
let pontos = 0;
let nmrJogadas = 4;
let nmrDescartes =3;

//faz os botões chamarem as funções correspondentes
document.getElementById('botaojoga')?.addEventListener('click', jogacarta);
document.getElementById('botaodescarta')?.addEventListener('click', descarta);
// Variáveis globais do jogo
let baralho: Carta[] = [];
let mao: Carta[] = [];
let descarte: Carta[] = [];
//criando a classe da carta de forma geral, que vai construir cada carta de acordo com o naipe e a figura
class Carta {
  naipe: Naipe;
  valor: Valor;

  constructor(naipe: Naipe, valor: Valor) {
    this.naipe = naipe;
    this.valor = valor;
  }
}
/**********************************************************************
 FUNÇÃO QUE INICIA TUDO
************************************************************************/
function iniciar():void
{
  baralho = criarBaralho();
  mao = pegarCarta(baralho,8);
  renderiza(mao);
 

  // Atualiza constantemente as cartas selecionadas e da o valor da mão
setInterval(() => {
  const selecionadas = cartasSelecionadas(mao);
  if (selecionadas.length > 0) {
    console.log("Cartas selecionadas:", selecionadas);  
  const resultado = avaliarMao(selecionadas);
  console.log("Avaliação da mão:", resultado);
    
  }
}, 1000); // Atualiza a cada 1000ms




}

/**********************************************************************
 FUNÇÔES SOBRE BARALHO
************************************************************************/
function criarBaralho() {
  const naipes: Naipe[] = ["copas", "paus", "espadas", "ouros"];
  const valores: Valor[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  let baralho = [];
  for (const naipe of naipes) {
    for (const valor of valores) {
      baralho.push(new Carta(naipe, valor));
    }
  }
  embaralhar(baralho);
  return baralho;
}

function embaralhar(baralho: Carta[]): Carta[] {
   //copiando so para ter controle do normal x embaralhado(mexer dps)
  for (let i = baralho.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    /* a math random pega numero 
    de 0 a 1 e multiplica pelo indice + 1 e
     em seguida esse numero é arredondado para o
    inteiro mais proximo pela math.flor*/
    [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
  }
  return baralho;
}

/**********************************************************************
 FUNÇÔES SOBRE MANIPULAÇÂO DE CARTA
************************************************************************/
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
function cartasSelecionadas(mao: Carta[]): Carta[] {
  const selecionadas: Carta[] = [];
  const cartasselec = document.querySelectorAll('.selecionada');
  for (let i = 0; i < cartasselec.length; i++) {
    const indiceStr = cartasselec[i].getAttribute("value");
    if (indiceStr !== null) {
      const indice = Number(indiceStr);
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
function avaliarMao(selecionadas: Carta[]): { pontuacao: string, cartas: Carta[] } {  
  //transforma as strings de valor em numero para facilitar depois
  const numeravalor: Record<string, number> = { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
    "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14 };
  
  // Separa os valores e naipes em dois arrays diferentes (map é um 'atalho' pra isso, evitar fazer 'for')
  const valores = selecionadas.map(carta => numeravalor[carta.valor]);
  const naipes = selecionadas.map(carta => carta.naipe);
  // Ordena valores de forma crescente para facilitar ver se tem sequencia 
  const valoresNumericos = [...valores].sort((a, b) => a - b);
  
  //defino contaValor como um objeto que vincula um valor (número) à quantidade
  const contaValor: Record<number, number> = {};
  valores.forEach(v => contaValor[v] = (contaValor[v] || 0) + 1);
  
  // Converte contaValor em array ordenado por quantidade (maior primeiro)
  const valorOrdenado = Object.values(contaValor).sort((a, b) => b - a);

  // mesma coisa do valor para o naipe
  const contaNaipe: Record<Naipe, number> = { copas: 0, paus: 0, espadas: 0, ouros: 0 };
  naipes.forEach(n => contaNaipe[n]++);
  // Conta os naipes e ordena para pegar o mais repetido no índice 0
  const ordenaNaipe = Object.values(contaNaipe).sort((a, b) => b - a);

/****************************************************************************************** 
Até aqui foi so preparação para organizar as cartas, agora que começa verificar a mão feita
*******************************************************************************************/
// Função para verificar sequência retornando true ou false
function eSequencia(arr: number[]): boolean {
  if(arr.length < 5) return false;
  
  // Verifica sequência normal
  for(let i = 1; i < arr.length; i++){
    if(arr[i] < arr[i-1]){
      return false;
    }
  }
  return true;
}

function eFlush(arr: number[]): boolean {
  return (arr[0] === 5); // Se o naipe mais repetido aparece 5 vezes
}

// Funções helper para encontrar cartas específicas
function encontrarValorComQuantidade(quantidade: number): number {
  return Number(Object.keys(contaValor).find(k => contaValor[Number(k)] === quantidade) || 0);
}

function cartasComValor(valorNumerico: number): Carta[] {
  return selecionadas.filter(c => numeravalor[c.valor] === valorNumerico);
}

//verifica todas as possibilidades com 5 cartas jogadas necessáriamente
if(selecionadas.length === 5) { 
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
  if(eFlush(ordenaNaipe)) {
    return { pontuacao: "Flush", cartas: selecionadas };
  }
  
  // Verifica Sequência: valores em ordem
  if(eSequencia(valoresNumericos)) {
    return { pontuacao: "Sequência", cartas: selecionadas };
  }
}

// Verifica Quadra (quatro cartas do mesmo valor)
if (valorOrdenado[0] === 4) {
  const quadraValor = encontrarValorComQuantidade(4);
  return { pontuacao: "Quadra", cartas: cartasComValor(quadraValor) };
}

// Verifica Trinca
if (valorOrdenado[0] === 3) {
  const trincaValor = encontrarValorComQuantidade(3);
  return { pontuacao: "Trinca", cartas: cartasComValor(trincaValor) };
}

// Verifica Dois Pares
if (valorOrdenado[0] === 2 && valorOrdenado[1] === 2) {
  const paresCartas = selecionadas.filter(c => contaValor[numeravalor[c.valor]] === 2);
  return { pontuacao: "Dois Pares", cartas: paresCartas };
}

// Verifica Par
if (valorOrdenado[0] === 2) {
  const parValor = encontrarValorComQuantidade(2);
  return { pontuacao: "Par", cartas: cartasComValor(parValor) };
}

// Carta Alta
const cartaAlta = selecionadas.reduce((a, b) => numeravalor[a.valor] > numeravalor[b.valor] ? a : b);
return { pontuacao: "Carta Alta", cartas: [cartaAlta] };
//acabou
}

// Função para calcular pontuação baseada na tabela oficial
function calcularPontuacao(tipo: string, cartas: Carta[]): number {
  // usei record para criar um objetivo na qual sempre vai receber uma string, no caso
  //o tipo de mão e vai corresponder ao valor e multipicador dela no Balatro 
  const tabelaPontuacao: Record<string, { base: number, multiplicador: number }> = 
  {
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
  const config = tabelaPontuacao[tipo];

  // Só para garantir que não é nulo
  if (config) {
     
  let somaCartas = 0;

  cartas.forEach(c => {
    if (["K", "Q", "J"].includes(c.valor)) {
      somaCartas += 10; //substituir as figuras por valor númerico
    } 
    if(["A"].includes(c.valor)){
      somaCartas+=15; //mesma coisa com os aces
    }
    else {
      somaCartas += Number(c.valor); //aqui é so somar o numero direto
    }
  });

  // Fórmula do balatro: multiplicador * (valor base +  soma das cartas)
  const pontuacaoTotal = config.multiplicador * (config.base + somaCartas);
  //tirar dps,mas so pra ver que ta funcionando
  console.log(`${tipo}: (${config.multiplicador} ×  ${config.base} + ${somaCartas}) = ${pontuacaoTotal}`);
  
  return pontuacaoTotal;
}

  console.error(`Tipo de pontuação desconhecido: ${tipo}`);
  return 0;
}

function jogacarta() {
  if(nmrJogadas>0){
  const selecionadas = cartasSelecionadas(mao);
  const resultado = avaliarMao(selecionadas);

  // Calcula pontuação usando a nova tabela
  const pontuacaoGanha = calcularPontuacao(resultado.pontuacao, resultado.cartas);
  
  pontos += pontuacaoGanha;
  if (jogador) jogador.textContent = pontos.toString();

  nmrJogadas-=1;
  // Descarta todas as cartas selecionadas
  descarta();
  }else{
    console.log('acabou as jogadas pai')
  }
}

function descarta(): void {
  if(nmrDescartes>0){
  // Seleciona as cartas marcadas como 'selecionada' na mão
  const selecionadas = cartasSelecionadas(mao);
  if (!Array.isArray(selecionadas) || selecionadas.length === 0) return;

  // Remove cartas selecionadas da mão, adiciona ao descarte e substitui por novas do baralho
  for (let i = 0; i < selecionadas.length; i++) {
    const idx = mao.indexOf(selecionadas[i]);
    if (idx !== -1) {
      descarte.push(mao[idx]);
      // Substitui por nova carta do baralho, se houver
      const novaCarta = baralho.length > 0 ? baralho.pop()! : null;
      if (novaCarta) {
        mao[idx] = novaCarta;
      } else {
        // Se não houver mais cartas, remove da mão
        mao.splice(idx, 1);
      }
    }
  }
  nmrDescartes-=1;
  renderiza(mao);
}else(
  console.log('acabou os descartes chefe')
)
}
/**********************************************************************
 FUNÇÂO SOBRE MOSTRAR ALGO
************************************************************************/
function renderiza(mao: Carta[]): void {
  if (!maocarta) {
    console.error("Elemento 'Cartas' não encontrado.");
  }else{
  maocarta.innerHTML = ' ';
  for (let i = 0; i < mao.length; i++) {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.setAttribute('value', `${i}`);
    carta.innerHTML = `<img src="src/recursos/Cartas Grandes/${mao[i].valor}-${mao[i].naipe}.png" alt="">`;
    carta.onclick = () => selecionar(carta);
    maocarta.appendChild(carta);
  }
  }
}

//interatividade de selecionar carta
function selecionar(carta: HTMLElement) {
  const nmr = document.querySelectorAll('.selecionada'); //pega todas as cartas seleciondas 
  if (nmr.length === 5 && !carta.classList.contains('selecionada')) { //verifica se ja tem 5  e se não ja foi selecionada
    carta.style.animation = 'none'; //zera as animações da carta para poder repetir o negado
    void carta.offsetWidth; //força "recarregar" o css da carta
    carta.style.animation = 'negado 2s'; //ativa a animação
  } else {
    carta.classList.toggle('selecionada'); // tira e coloca a classe selecionada
  }
}


/**********************************************************************
 CONSOLES para testar
************************************************************************/
iniciar();

