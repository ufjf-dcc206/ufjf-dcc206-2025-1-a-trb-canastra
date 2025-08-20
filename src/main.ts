//importações
import "./style.css"; //Pra usar os estilos de forma global
import "./estilos/barra-lateral.css"
import "./estilos/botoes.css"
import "./estilos/modal.css"
import "./estilos/interface.css";
import "./components/carta-component"; //Importa o componente de carta
import "./assets-loader.js"; // Forçar carregamento dos assets das cartas
import { initializeCursors } from './cursor-assets.js';
import { criarBaralho, pegarCarta } from './Importados/carta_baralho.js';
import { inicializarEstado, Monitoramento, inicializarBotoes } from './Importados/jogo.js';
import { renderiza, atualizarBaralhoContagem, atualizaMeta, inicializarCartaVerso} from './Importados/interface.js';


/**********************************************************************
 CONSTANTES
************************************************************************/


/**********************************************************************
FUNÇÃO QUE INICIA TUDO
************************************************************************/


function iniciarJogo(): void {
  // Inicializar cursores personalizados
  initializeCursors();
  
  // Cria o baralho e distribui cartas
  const baralho = criarBaralho();
  const mao = pegarCarta(baralho, 8);
  
  // Inicializa o estado do jogo
  inicializarEstado(baralho, mao);
  atualizaMeta(100);
  inicializarBotoes();
  
  // Inicializar a carta do verso no baralho
  inicializarCartaVerso();
  
  // Inicializa o estado do jogo
  inicializarEstado(baralho, mao);
  atualizaMeta(100);
  inicializarBotoes();
  // Renderiza as cartas na interface
  renderiza(mao);
  
  // Atualiza o contador de cartas restantes no baralho
  atualizarBaralhoContagem(baralho.length);


  // Inicia o monitoramento das cartas selecionadas
  Monitoramento();
}
//inicia o jogo
iniciarJogo();


