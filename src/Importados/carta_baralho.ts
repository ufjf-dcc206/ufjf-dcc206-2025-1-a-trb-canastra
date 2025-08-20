export type Naipe = "copas" | "paus" | "espadas" | "ouros";

export type Valor = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export class Carta {
  naipe: Naipe;
  valor: Valor;
  constructor(naipe: Naipe, valor: Valor) {
    this.naipe = naipe;
    this.valor = valor;
  }
}

/**********************************************************************
 FUNÇÔES SOBRE BARALHO
************************************************************************/
export function criarBaralho() {
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

export function embaralhar(baralho: Carta[]): Carta[] {
  for (let i = baralho.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
  }
  return baralho;
}

/**********************************************************************
 FUNÇÔES SOBRE MANIPULAÇÂO DE CARTA
************************************************************************/
export function pegarCarta(baralho: Carta[], vezes: number): Carta[] {
  let mao: Carta[] = [];
  for (let i = 0; i < vezes; i++) {
    const cartaPegada = baralho.pop();
    if (cartaPegada) {
      mao.push(cartaPegada);
    }
  }
  return mao;
}
export function cartasSelecionadas(mao: Carta[]): Carta[] {
  const selecionadas: Carta[] = [];
  const cartasselec = document.querySelectorAll('.selecionada');
  for (let i = 0; i < cartasselec.length; i++) {
    const indiceStr = cartasselec[i].getAttribute("value");
    if (indiceStr !== null) {
      const indice = Number(indiceStr);
      if (!isNaN(indice) && mao[indice]) { 
        selecionadas.push(mao[indice]);
      }
    }
  }
  return selecionadas;
}

