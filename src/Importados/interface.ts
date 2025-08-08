import { Carta } from './carta_baralho.js';

/**********************************************************************
 FUNÇÕES E VARIÁVEIS DE INTERFACE
************************************************************************/

// Elementos do DOM
const maocarta = document.getElementById('Cartas');
const jogador = document.getElementById('seuponto');
const valorMao = document.getElementById('valor-mao');
const contaCartas = document.getElementById('contaCartas');
// Função para renderizar a mão na interface
export function renderiza(mao: Carta[]): void {
  if (!maocarta) {
    console.error("Elemento 'Cartas' não encontrado.");
  } else {
    maocarta.innerHTML = ' ';
    for (let i = 0; i < mao.length; i++) {
      const carta = document.createElement('carta-component');
      carta.setAttribute('value', `${i}`);
      carta.innerHTML = `<img src="src/recursos/Cartas Grandes/${mao[i].valor}-${mao[i].naipe}.png" alt="">`;
      // Removed onclick since it's now handled inside the Web Component
      maocarta.appendChild(carta);
    }
  }
}
export function atualizaMao(str: string): void {
    if (valorMao) {
        valorMao.innerHTML = str;
    }
}

export function atualizarBaralhoContagem(contagem: number): void { 
if(contaCartas) {
    contaCartas.textContent = `${contagem}`;
  }
}
// Função para atualizar pontuação na interface
export function atualizarPontuacaoInterface(pontos: number): void {
  if (jogador) {
    jogador.textContent = pontos.toString();
  } 
}

// Função para obter elemento da pontuação
export function obterElementoJogador(): HTMLElement | null {
  return jogador;
}
