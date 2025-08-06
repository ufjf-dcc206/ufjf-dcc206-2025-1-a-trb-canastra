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
document.getElementById('botaodescarta')?.addEventListener('click', () => {
  if(nmrDescartes>0){
    descarta()
    nmrDescartes-=1;
  }
  console.log(nmrDescartes)
  }
);
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
  // Record para transformar os valores das cartas em números para facilitar comparações
  const numeravalor: Record<string, number> = { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
    "10": 10, "J": 11, "Q": 12, "K": 13, "A": 14 };
  
  // Separa os valores e naipes em arrays distintos
  const valores = selecionadas.map(carta => numeravalor[carta.valor]);
  const naipes = selecionadas.map(carta => carta.naipe);
  // Ordena os valores para facilitar a verificação de sequência
  const valoresNumericos = [...valores].sort((a, b) => a - b);
  
  // Conta quantas vezes cada valor aparece
  const contaValor: Record<number, number> = {};
  valores.forEach(v => contaValor[v] = (contaValor[v] || 0) + 1);
  // Ordena as quantidades dos valores (maior primeiro)
  const valorOrdenado = Object.values(contaValor).sort((a, b) => b - a);

  // Conta quantas vezes cada naipe aparece
  const contaNaipe: Record<Naipe, number> = { copas: 0, paus: 0, espadas: 0, ouros: 0 };
  naipes.forEach(n => contaNaipe[n]++);
  // Ordena as quantidades dos naipes (maior primeiro)
  const ordenaNaipe = Object.values(contaNaipe).sort((a, b) => b - a);

  /****************************************************************************************** 
  Funções auxiliares usadas para verificar tipos de mão:
  - eSequencia: verifica se os valores estão em ordem crescente (sequência)
  - eFlush: verifica se todas as cartas são do mesmo naipe
  *******************************************************************************************/
  function eSequencia(arr: number[]): boolean {
    if(arr.length < 5) return false;
    // Verifica se todos os valores estão em ordem crescente
    for(let i = 1; i < arr.length; i++){
      if(arr[i] !== arr[i-1] + 1){
        return false;
      }
    }
    return true;
  }
  function eFlush(arr: number[]): boolean {
    // Retorna true se o naipe mais repetido aparece 5 vezes
    return (arr[0] === 5);
  }

  // Verifica todas as possibilidades com 5 cartas selecionadas
  if(selecionadas.length === 5) { 
    // Royal Flush: sequência 10, J, Q, K, A do mesmo naipe
    if (eFlush(ordenaNaipe) && 
        valoresNumericos.join(',') === '10,11,12,13,14') {
      return { pontuacao: "Royal Flush", cartas: selecionadas };
    }

    // Straight Flush: sequência do mesmo naipe
    if (eFlush(ordenaNaipe) && eSequencia(valoresNumericos)) {
      return { pontuacao: "Straight Flush", cartas: selecionadas };
    }

    // Flush House: todas do mesmo naipe e três de um valor, dois de outro
    if (eFlush(ordenaNaipe) && valorOrdenado[0] === 3 && valorOrdenado[1] === 2) {
      return { pontuacao: "Flush House", cartas: selecionadas };
    }
    
    // Full House: três de um valor, dois de outro
    if (valorOrdenado[0] === 3 && valorOrdenado[1] === 2) {
      return { pontuacao: "Full House", cartas: selecionadas };
    }
    
    // Flush: todas do mesmo naipe
    if(eFlush(ordenaNaipe)) {
      return { pontuacao: "Flush", cartas: selecionadas };
    }
    
    // Sequência: valores em ordem
    if(eSequencia(valoresNumericos)) {
      return { pontuacao: "Sequência", cartas: selecionadas };
    }
  }

  // Quadra: quatro cartas do mesmo valor
  if (valorOrdenado[0] === 4) {
    const quadraValor = Object.keys(contaValor).find(v => contaValor[Number(v)] === 4);
    const cartasQuadra = selecionadas.filter(c => numeravalor[c.valor] === Number(quadraValor));
    return { pontuacao: "Quadra", cartas: cartasQuadra };
  }

  // Trinca: três cartas do mesmo valor
  if (valorOrdenado[0] === 3) {
    const trincaValor = Object.keys(contaValor).find(v => contaValor[Number(v)] === 3);
    const cartastrinca = selecionadas.filter(c => numeravalor[c.valor] === Number(trincaValor));
    return { pontuacao: "Trinca", cartas: cartastrinca };
  }

  // Dois Pares: dois valores aparecem duas vezes cada
  if (valorOrdenado[0] === 2 && valorOrdenado[1] === 2) {
    const pares = Object.keys(contaValor).filter(v => contaValor[Number(v)] === 2);
    const cartasDosPares = selecionadas.filter(c => pares.includes(numeravalor[c.valor].toString()));
    return { pontuacao: "Dois Pares", cartas: cartasDosPares };
  }

  // Par: um valor aparece duas vezes
  if (valorOrdenado[0] === 2) {
    const parValor = Object.keys(contaValor).find(v => contaValor[Number(v)] === 2);
    const cartasdopar = selecionadas.filter(c => numeravalor[c.valor] === Number(parValor));
    return { pontuacao: "Par", cartas: cartasdopar };
  }

  // Carta Alta: retorna a carta de maior valor
  const cartaAlta = selecionadas.reduce((a, b) => numeravalor[a.valor] > numeravalor[b.valor] ? a : b);
  return { pontuacao: "Carta Alta", cartas: [cartaAlta] };
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
  // Seleciona as cartas marcadas como 'selecionada' na mão
  const selecionadas = cartasSelecionadas(mao);
  if (!Array.isArray(selecionadas) || selecionadas.length === 0) return;

  // Remove cartas selecionadas da mão, adiciona ao descarte e substitui por novas do baralho
  for (let i = 0; i < selecionadas.length; i++) {
    const indice = mao.indexOf(selecionadas[i]); //função que procura o indice da selecionada[i] na mao e retorna, 
    // se n tiver retorna -1(checado no if embaixo aqui)
    if (indice !== -1) {
      // Substitui por nova carta do baralho, se houver
      descarte.push(mao[indice]);
      // Tenta pegar uma nova carta do baralho, se houver
      const novaCarta = baralho.length > 0 ? baralho.pop()! : null;
      if (novaCarta) { //verificando q tem valor 
        // Se conseguiu pegar uma nova carta, substitui a carta descartada pela nova
        mao[indice] = novaCarta;
      } else {
        // Se não houver mais cartas no baralho, remove a carta descartada da mão
        mao.splice(indice, 1);
      }
      }
  }
  renderiza(mao);
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

