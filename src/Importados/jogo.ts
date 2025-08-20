import { Carta,criarBaralho, pegarCarta } from './carta_baralho.js';
import { cartasSelecionadas } from './carta_baralho.js';
import { renderiza, atualizarPontuacaoInterface, atualizaMao, atualizarBaralhoContagem, atualizaMeta,
   atualizaRodada, transicaoDeRodadaNormal, perdeu, 
   renderizaMesaJogada,
   atualizajogada,
   atualizadescarte} from './interface.js';
import { efeitoCarta, TocaMusica } from './musica.js';
import { avaliarMao, calcularPontuacao } from './avaliador.js';

/**********************************************************************
 FUNÇÔES SOBRE O JOGO E JOGAR
************************************************************************/
let nmrJogadas = 4;
let nmrDescartes = 3;
let rodada = 1; 
let meta = 100; 
let pontos = 0;
let descarte: Carta[] = [];
let baralho: Carta[] = [];
let mao: Carta[] = [];

let botjoga = document.getElementById('botaojoga');
let botdesca = document.getElementById('botaodescarta');
let botoesInicializados = false;

export function inicializarEstado(novoBaralho:Carta[],novaMao:Carta[]):void{
  baralho = novoBaralho;
  mao= novaMao;
  atualizadescarte(nmrDescartes);
  atualizajogada(nmrJogadas);
}
export function inicializarBotoes(): void {
  if (!botoesInicializados) {
    botoesInicializados = true;
  
    botjoga?.addEventListener('click', ()=>{
      const selecionadas = cartasSelecionadas(mao);
      if(nmrJogadas > 0 && selecionadas.length > 0){
        jogacarta();
        efeitoCarta();
        nmrJogadas-=1;
        atualizajogada(nmrJogadas)
        verificaPontoMeta();
      }
    });
    botdesca?.addEventListener('click', () => {
      const selecionadas = cartasSelecionadas(mao);
      if(nmrDescartes > 0 && selecionadas.length > 0){
        descarta();
        efeitoCarta();
        nmrDescartes-=1;
        atualizadescarte(nmrDescartes);
      }
    });
  }
}

export function Monitoramento(): void {
  inicializarBotoes();
  setInterval(() => {
    TocaMusica();
    atualizarBaralhoContagem(baralho.length);
    const selecionadas = cartasSelecionadas(mao);
    if (selecionadas.length > 0) {  
      const resultado = avaliarMao(selecionadas);
      renderizaMesaJogada(resultado.cartas);
      const pontuacaoGanha = calcularPontuacao(resultado.pontuacao, resultado.cartas,rodada);
      atualizaMao(resultado.pontuacao  + ' = ' + pontuacaoGanha);
    }else{
        atualizaMao('')
        renderizaMesaJogada([]);
    }
  }, 100);
}

export function jogacarta() {
  
  const selecionadas = cartasSelecionadas(mao);
  const resultado = avaliarMao(selecionadas);
  const pontuacaoGanha = calcularPontuacao(resultado.pontuacao, resultado.cartas,rodada);
  
  pontos += pontuacaoGanha;
  atualizarPontuacaoInterface(pontos);
  descarta();
}

export function descarta(): void {
  const selecionadas = cartasSelecionadas(mao);
  for (let i = 0; i < selecionadas.length; i++) {
    const indice = mao.indexOf(selecionadas[i]);
    if (indice !== -1) {
      descarte.push(mao[indice]);
      const novaCarta = baralho.length > 0 ? baralho.pop()! : null;
      if (novaCarta) { 
        mao[indice] = novaCarta;
      } else {
        mao.splice(indice, 1);
      }
      }
  }
  renderiza(mao);
}

export async function verificaPontoMeta(): Promise<void> {
  if (pontos >= meta) {
    if(await transicaoDeRodadaNormal(rodada)){
      rodada += 1;
      meta *= 2;
      pontos = 0;
      nmrDescartes = 3;
      nmrJogadas = 4;
      baralho = criarBaralho();
      mao = pegarCarta(baralho, 8);
      atualizadescarte(nmrDescartes);
      atualizajogada(nmrJogadas);
      renderiza(mao);
      atualizarPontuacaoInterface(pontos);
      atualizaMeta(meta);
      atualizaRodada(rodada);
    }
  }
if (pontos < meta && nmrJogadas === 0) {
  if(await perdeu(rodada)){
    window.location.href = 'index.html';
  }
}
}
