import { Carta,criarBaralho, pegarCarta } from './carta_baralho.js';
import { cartasSelecionadas } from './carta_baralho.js';
import { renderiza, atualizarPontuacaoInterface, atualizaMao, atualizarBaralhoContagem, atualizaMeta,
   atualizaRodada, transicaoDeRodadaNormal, perdeu, 
   renderizaMesaJogada,
   atualizajogada,
   atualizadescarte} from './interface.js';
import { avaliarMao, calcularPontuacao } from './avaliador.js';

/**********************************************************************
 FUNÇÔES SOBRE O JOGO E JOGAR
************************************************************************/
//
let nmrJogadas = 4;
let nmrDescartes = 3;
let rodada = 1; // Contador de rodadas
let meta = 100; // Meta de pontos para vencer
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
    
    //faz os botões chamarem as funções correspondentes
    botjoga?.addEventListener('click', ()=>{
      const selecionadas = cartasSelecionadas(mao);
      if(!(botjoga.classList.contains('acabou')) && selecionadas.length > 0){
        jogacarta();
        nmrJogadas-=1;
        atualizajogada(nmrJogadas)
        verificaPontoMeta();
        atualizarEstadoBotoes();
      }
    });
    botdesca?.addEventListener('click', () => {
      const selecionadas = cartasSelecionadas(mao);
      if(!(botdesca.classList.contains('acabou')) && selecionadas.length > 0){
        descarta();
        nmrDescartes-=1;
        atualizadescarte(nmrDescartes);
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

  // Calcula pontuação usando a nova tabela
  const pontuacaoGanha = calcularPontuacao(resultado.pontuacao, resultado.cartas,rodada);
  
  pontos += pontuacaoGanha;
  atualizarPontuacaoInterface(pontos);

  // Descarta todas as cartas selecionadas
  descarta();
}

export function descarta(): void {
  // Seleciona as cartas marcadas como 'selecionada' na mão
  const selecionadas = cartasSelecionadas(mao);
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
    // Redireciona para página inicial após derrota
    window.location.href = 'index.html';
  }
}
}
