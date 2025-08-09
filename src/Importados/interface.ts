import { Carta } from './carta_baralho.js';

/**********************************************************************
 FUNÇÕES E VARIÁVEIS DE INTERFACE
************************************************************************/

// Elementos do DOM
const maocarta = document.getElementById('Cartas');
const jogador = document.getElementById('ponto');
const meta = document.getElementById('meta');
const valorMao = document.getElementById('valor-mao');
const contaCartas = document.getElementById('contaCartas');
const rodada = document.getElementById('rodada');
const mesajogada = document.getElementById('mesa-jogada');
const jogadasnmr = document.getElementById('Jogadas');
const descartenmr = document.getElementById('Descartes');


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

export function atualizaMeta(nmr:number): void {
  if (meta) {
    meta.textContent = `${nmr}`;
  }
} 
export function atualizaRodada(nmr:number):void{
  if(rodada)
  {
    rodada.textContent = `${nmr}`;
  }
}
export function transicaoDeRodadaNormal(nmr: number): Promise<boolean> {
  return new Promise((resolve) => {
    const janela = document.createElement('div');
    janela.id = 'transicao';
    const modal = document.createElement('div');
    modal.id = 'modal';
    janela.appendChild(modal);
    document.body.appendChild(janela);
    const bot = document.createElement('button');
    modal.innerHTML = `<h1>Parabéns! Você atingiu a meta da rodada ${nmr}!</h1><p>Iniciando a próxima rodada com uma meta maior</p>`;
    modal.appendChild(bot);
    bot.id = 'botaoModal';
    bot.textContent = 'Continuar';
    bot.onclick = () => {
      document.body.removeChild(janela);
      resolve(true);
    };
  });
}
export function rodadaFinal(nmr: number): Promise<boolean> {
  return new Promise((resolve) => {
    const janela = document.createElement('div');
    janela.id = 'transicao';
    const modal = document.createElement('div');
    modal.id = 'modal';
    janela.appendChild(modal);
    document.body.appendChild(janela);
    const bot = document.createElement('button');
    modal.innerHTML = `<h1>Parabéns! Você atingiu a meta da rodada ${nmr}!</h1><p>Você venceu o jogo!</p>`;
    modal.appendChild(bot);
    bot.id = 'botaoModal';
    bot.textContent = 'Continuar';
    bot.onclick = () => {
      document.body.removeChild(janela);
      resolve(true);
    };
  });
}

export function renderizaMesaJogada(arr: Carta[]): void {
  if (!mesajogada) {
    console.error("Elemento 'mesa-jogada' não encontrado.");
  } else {
    mesajogada.innerHTML = ' ';
    for (let i = 0; i < arr.length; i++) {
      const carta = document.createElement('div');
      carta.innerHTML = `<img src="src/recursos/Cartas Grandes/${arr[i].valor}-${arr[i].naipe}.png" alt="">`;
      mesajogada.appendChild(carta);
    }
  }
}
export function atualizajogada(nmr:number): void {
  if (jogadasnmr) {
    jogadasnmr.textContent = `${nmr}`;
  }
}

export function atualizadescarte(nmr:number): void {
  if (descartenmr) {
    descartenmr.textContent = `${nmr}`;
  }
}