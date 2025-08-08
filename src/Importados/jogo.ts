import { Carta,criarBaralho, pegarCarta } from './carta_baralho.js';
import { cartasSelecionadas } from './carta_baralho.js';
import { renderiza, atualizarPontuacaoInterface, atualizaMao, atualizarBaralhoContagem, atualizaMeta,
   atualizaRodada, transicaoDeRodadaNormal, rodadaFinal, 
   renderizaMesaJogada} from './interface.js';
import { avaliarMao, calcularPontuacao } from './avaliador.js';

/**********************************************************************
 FUNÇÔES SOBRE O JOGO E JOGAR
************************************************************************/
//
let nmrJogadas = 4;
let nmrDescartes = 3;
let rodada = 1; // Contador de rodadas
let meta = 50; // Meta de pontos para vencer
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
}
export function inicializarBotoes(): void {
  if (!botoesInicializados) {
    botoesInicializados = true;
    
    //faz os botões chamarem as funções correspondentes
    botjoga?.addEventListener('click', ()=>{
      if(!botjoga.classList.contains('acabou')){
        jogacarta();
        nmrJogadas-=1;
        atualizarEstadoBotoes();
      }
    });
    botdesca?.addEventListener('click', () => {
      if(!botdesca.classList.contains('acabou')){
        descarta();
        nmrDescartes-=1;
        atualizarEstadoBotoes();
      }
    });
  }
}

function atualizarEstadoBotoes(): void {
  nmrDescartes > 0 ? botdesca?.classList.remove('acabou') : botdesca?.classList.add('acabou');
  nmrJogadas > 0 ? botjoga?.classList.remove('acabou') : botjoga?.classList.add('acabou');
}

// Função para iniciar o monitoramento das cartas selecionadas
export function Monitoramento(): void {
  inicializarBotoes();
  // Atualiza constantemente as cartas selecionadas e da o valor da mão
  setInterval(() => {
    atualizarEstadoBotoes();
    atualizarBaralhoContagem(baralho.length);
    const selecionadas = cartasSelecionadas(mao);
    if (selecionadas.length > 0) {
      console.log("Cartas selecionadas:", selecionadas);  
      const resultado = avaliarMao(selecionadas);
      renderizaMesaJogada(resultado.cartas);
      const pontuacaoGanha = calcularPontuacao(resultado.pontuacao, resultado.cartas);
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

  // Calcula pontuação usando a nova tabela
  const pontuacaoGanha = calcularPontuacao(resultado.pontuacao, resultado.cartas);
  
  pontos += pontuacaoGanha;
  atualizarPontuacaoInterface(pontos);
  verificaPontoMeta();

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

export async function verificaPontoMeta(): Promise<void> {
  if (pontos >= meta && rodada < 10) {
    if(await transicaoDeRodadaNormal(rodada)){
      rodada += 1;
      meta = 50 * rodada;
      pontos = 0;
      nmrDescartes = 3;
      nmrJogadas = 4;
      baralho = criarBaralho();
      mao = pegarCarta(baralho, 8);
      renderiza(mao);
      atualizarPontuacaoInterface(pontos);
      atualizaMeta(meta);
      atualizaRodada(rodada);
    }
  }else if (pontos >= meta && rodada === 10) {
    if(await rodadaFinal(rodada)){
      // Redireciona para página de vitória
      window.location.href = 'vitoria.html';
    }
}
}
