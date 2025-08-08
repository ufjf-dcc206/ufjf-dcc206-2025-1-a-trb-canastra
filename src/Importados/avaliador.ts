import { Carta } from './carta_baralho.js';
import type { Naipe } from './carta_baralho.js';

/**********************************************************************
 FUNÇÕES DE AVALIAÇÃO E PONTUAÇÃO DE MÃOS
************************************************************************/

//função que vai avaliar as cartas selecionadas, contar naipes e cartas iguais ou sequenciais e retornar para a CalculaPontuação
//Retorna o tipo de mão e as cartas pontuantes
export function avaliarMao(selecionadas: Carta[]): { pontuacao: string, cartas: Carta[] } {  
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
  function eSequencia(cartas: number[]): boolean {
    if(cartas.length < 5) return false;
    // Verifica se todos os valores estão em ordem crescente
    for(let i = 1; i < cartas.length; i++){
      if(cartas[i] !== cartas[i-1] + 1){
        return false;
      }
    }
    return true;
  }
  function eFlush(cartas: number[]): boolean {
    // Retorna true se o naipe mais repetido aparece 5 vezes
    return (cartas[0] === 5);
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
export function calcularPontuacao(tipo: string, cartas: Carta[]): number {
  // usei record para criar um objetivo na qual sempre vai receber uma string, no caso
  //o tipo de mão e vai corresponder ao valor e multipicador dela no Balatro 
  const tabelaPontuacao: Record<string,number> = 
  {
    "Flush House": 14,
    "Royal Flush": 8 ,
    "Straight Flush": 8 ,
    "Quadra":  7 , 
    "Full House": 4 ,
    "Flush":  4 ,
    "Sequência":  4 , 
    "Trinca":  3 , 
    "Dois Pares":  2 , 
    "Par":  2 , 
    "Carta Alta":  1  
  };
  //aqui puxa o correspondente a mão recebida
  const config = tabelaPontuacao[tipo];

  // Só para garantir que não é nulo
  if (config) {
     
  let somaCartas = 0;

  cartas.forEach(c => {
    if (["K"].includes(c.valor) || ["Q"].includes(c.valor) || ["J"].includes(c.valor)) {
      somaCartas += 10; //substituir as figuras por valor númerico
    } else if(["A"].includes(c.valor)){
      somaCartas+=15; //mesma coisa com os aces
    }
    else {
      somaCartas += Number(c.valor); //aqui é so somar o numero direto
    }
  });

  // Fórmula do balatro: multiplicador * (valor base +  soma das cartas)
  const pontuacaoTotal = config * somaCartas;
  //tirar dps,mas so pra ver que ta funcionando
  console.log(`${tipo}: (${config} × ${somaCartas}) = ${pontuacaoTotal}`);
  
  return pontuacaoTotal;
}

  console.error(`Tipo de pontuação desconhecido: ${tipo}`);
  return 0;
}
