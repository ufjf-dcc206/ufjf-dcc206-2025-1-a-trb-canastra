//importações
import "./style.css"; //Pra usar os estilos de forma global
import "./estilos/barra-lateral.css"
import "./estilos/botoes.css"
import "./estilos/modal.css"
import "./components/carta-component"; //Importa o componente de carta
import { criarBaralho, pegarCarta } from './Importados/carta_baralho.js';
import { inicializarEstado, Monitoramento, inicializarBotoes } from './Importados/jogo.js';
import { renderiza, atualizarBaralhoContagem} from './Importados/interface.js';


/**********************************************************************
 CONSTANTES
************************************************************************/


/**********************************************************************
FUNÇÃO QUE INICIA TUDO
************************************************************************/
function iniciarJogo(): void {
  // Cria o baralho e distribui cartas
  const baralho = criarBaralho();
  const mao = pegarCarta(baralho, 8);
  
  // Inicializa o estado do jogo
  inicializarEstado(baralho, mao);
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

