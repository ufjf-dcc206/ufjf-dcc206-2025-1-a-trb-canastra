//importações
import "./style.css"; //Pra usar os estilos de forma global
import "./estilos/barra-lateral.css"
import "./estilos/botoes.css"
import "./estilos/modal.css"
import "./estilos/interface.css";
import "./components/carta-component"; //Importa o componente de carta
import "./assets-loader.js"; // Forçar carregamento dos assets das cartas
import { criarBaralho, pegarCarta } from './Importados/carta_baralho.js';
import { inicializarEstado, Monitoramento, inicializarBotoes } from './Importados/jogo.js';
import { renderiza, atualizarBaralhoContagem, atualizaMeta, inicializarCartaVerso, tocarPartida, tocarMenu, pararMusicas} from './Importados/interface.js';


/**********************************************************************
 CONSTANTES
************************************************************************/


/**********************************************************************
FUNÇÃO QUE INICIA TUDO
************************************************************************/
const caminhoAtual= window.location.pathname;
if (caminhoAtual.includes("index.html")) {
  // Se estiver na página inicial, toca a música de fundo
  console.log("o usuário está na página inicial, tocando música de fundo");
  pararMusicas(); // Para qualquer música que esteja tocando antes de iniciar o menu
  tocarMenu();
}
else if (caminhoAtual.includes("tutorial.html")) {
  // Se estiver na página de tutorial, toca a música de fundo
  console.log("o usuário está na página de tutorial, tocando música de fundo");
  tocarMenu();
}
else if (caminhoAtual.includes("partida.html")) {
  // Se estiver na página de partida, toca a música de fundo
  console.log("o usuário está na página de partida, tocando música de fundo");
  pararMusicas(); // Para qualquer música que esteja tocando antes de iniciar a partida
  tocarPartida();
} else {
  // Se não estiver em nenhuma das páginas esperadas, não faz nada
  console.log("o usuário não está em uma página válida, não tocando música de fundo");
}

function iniciarJogo(): void {
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


