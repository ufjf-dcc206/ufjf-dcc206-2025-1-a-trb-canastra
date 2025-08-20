import { Carta } from './carta_baralho.js';
import type { Naipe } from './carta_baralho.js';

/**********************************************************************
 FUNÇÕES DE AVALIAÇÃO E PONTUAÇÃO DE MÃOS
************************************************************************/

export function avaliarMao(selecionadas: Carta[]): { pontuacao: string, cartas: Carta[] } {  
  const numeravalor: Record<string, number> = 
  { "2": 2, "3": 3, "4": 4, "5": 5,
     "6": 6, "7": 7, "8": 8, "9": 9,
    "10": 10, "J": 11, "Q": 12, "K": 13,
     "A": 14 
  };
  
  const valores = selecionadas.map(carta => numeravalor[carta.valor]);
  const naipes = selecionadas.map(carta => carta.naipe);
  const valoresNumericos = [...valores].sort((a, b) => a - b);

  const contaValor: Record<number, number> = {};
  valores.forEach(v => contaValor[v] = (contaValor[v] || 0) + 1);

  const valorOrdenado = Object.values(contaValor).sort((a, b) => b - a);


  const contaNaipe: Record<Naipe, number> = { copas: 0, paus: 0, espadas: 0, ouros: 0 };
  naipes.forEach(n => contaNaipe[n]++);
  const ordenaNaipe = Object.values(contaNaipe).sort((a, b) => b - a);

  function eSequencia(cartas: number[]): boolean {
    if(cartas.length < 5) return false;
    for(let i = 1; i < cartas.length; i++){
      if(cartas[i] !== cartas[i-1] + 1){
        return false;
      }
    }
    return true;
  }
  function eFlush(cartas: number[]): boolean {
    return (cartas[0] === 5);
  }
  if(selecionadas.length === 5) { 
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
    
   
    if(eFlush(ordenaNaipe)) {
      return { pontuacao: "Flush", cartas: selecionadas };
    }
    if(eSequencia(valoresNumericos)) {
      return { pontuacao: "Sequencia", cartas: selecionadas };
    }
  }

  if (valorOrdenado[0] === 4) {
    const quadraValor = Object.keys(contaValor).find(v => contaValor[Number(v)] === 4);
    const cartasQuadra = selecionadas.filter(c => numeravalor[c.valor] === Number(quadraValor));
    return { pontuacao: "Quadra", cartas: cartasQuadra };
  }

  if (valorOrdenado[0] === 3) {
    const trincaValor = Object.keys(contaValor).find(v => contaValor[Number(v)] === 3);
    const cartastrinca = selecionadas.filter(c => numeravalor[c.valor] === Number(trincaValor));
    return { pontuacao: "Trinca", cartas: cartastrinca };
  }

  if (valorOrdenado[0] === 2 && valorOrdenado[1] === 2) {
    const pares = Object.keys(contaValor).filter(v => contaValor[Number(v)] === 2);
    const cartasDosPares = selecionadas.filter(c => pares.includes(numeravalor[c.valor].toString()));
    return { pontuacao: "Dois Pares", cartas: cartasDosPares };
  }

  if (valorOrdenado[0] === 2) {
    const parValor = Object.keys(contaValor).find(v => contaValor[Number(v)] === 2);
    const cartasdopar = selecionadas.filter(c => numeravalor[c.valor] === Number(parValor));
    return { pontuacao: "Par", cartas: cartasdopar };
  }
  const cartaAlta = selecionadas.reduce((a, b) => numeravalor[a.valor] > numeravalor[b.valor] ? a : b);
  return { pontuacao: "Carta Alta", cartas: [cartaAlta] };
}

export function calcularPontuacao(tipo: string, cartas: Carta[], rodada: number): number {
  const tabelaPontuacao: Record<string,number> = 
  {
    "Flush House": 14,
    "Royal Flush": 8 ,
    "Straight Flush": 8 ,
    "Quadra":  7 , 
    "Full House": 4 ,
    "Flush":  4 ,
    "Sequencia":  4 , 
    "Trinca":  3 , 
    "Dois Pares":  2 , 
    "Par":  2 , 
    "Carta Alta":  1  
  };
  const config = tabelaPontuacao[tipo];

  if (config) {
     
  let somaCartas = 0;

  cartas.forEach(c => {
    if (["K"].includes(c.valor) || ["Q"].includes(c.valor) || ["J"].includes(c.valor)) {
      somaCartas += 10;
    } else if(["A"].includes(c.valor)){
      somaCartas+=15;
    }
    else {
      somaCartas += Number(c.valor);
    }
  });
  const multiplicaRodada = (rodada: number): number => {
    let multi = 1;
    for(let i=1; i<rodada; i++){
      multi += 0.5;
    }
    return multi;
  };
  
  const pontuacaoTotal = Math.round(config * somaCartas * multiplicaRodada(rodada));
  console.log(`${tipo}: (${config} × ${somaCartas}) x ${multiplicaRodada(rodada)} = ${pontuacaoTotal}`);
  return pontuacaoTotal;
}
  return 0;
}
