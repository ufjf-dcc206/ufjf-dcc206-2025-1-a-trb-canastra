import { Carta } from './carta_baralho.js';
import { cartasSelecionadas } from './carta_baralho.js';
import { renderiza, atualizarPontuacaoInterface, atualizaMao } from './interface.js';
import { avaliarMao, calcularPontuacao } from './avaliador.js';

/**********************************************************************
 FUNÇÔES SOBRE O JOGO E JOGAR
************************************************************************/
//const objetivo = document.getElementById('pontoMeta');
let pontos = 0;
let descarte: Carta[] = [];
let baralho: Carta[] = [];
let mao: Carta[] = [];

// Função para receber o baralho criado na main e utilizar eles nas outras
export function inicializarEstado(novoBaralho: Carta[], novaMao: Carta[]): void {
  baralho = novoBaralho;
  mao = novaMao;
}

// Função para iniciar o monitoramento das cartas selecionadas
export function Monitoramento(): void {
  // Atualiza constantemente as cartas selecionadas e da o valor da mão
  setInterval(() => {
    const selecionadas = cartasSelecionadas(mao);
    if (selecionadas.length > 0) {
      console.log("Cartas selecionadas:", selecionadas);  
      const resultado = avaliarMao(selecionadas);
      atualizaMao(resultado.pontuacao);
    }else{
        atualizaMao('')
    }
  }, 1000);
}

export function jogacarta() {
  
  const selecionadas = cartasSelecionadas(mao);
  const resultado = avaliarMao(selecionadas);

  // Calcula pontuação usando a nova tabela
  const pontuacaoGanha = calcularPontuacao(resultado.pontuacao, resultado.cartas);
  
  pontos += pontuacaoGanha;
  atualizarPontuacaoInterface(pontos);

  // Descarta todas as cartas selecionadas
  descarta();
}

export function descarta(): void {
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