import "./style.css"; 
import "./estilos/barra-lateral.css"
import "./estilos/botoes.css"
import "./estilos/modal.css"
import "./estilos/interface.css";
import "./components/carta-component";
import "./Importados/assets importacao/assets-loader.js"; 
import { initializeCursors } from './Importados/assets importacao/cursor-assets.js';
import { criarBaralho, pegarCarta } from './Importados/carta_baralho.js';
import { inicializarEstado, Monitoramento, inicializarBotoes } from './Importados/jogo.js';
import { renderiza, atualizarBaralhoContagem, atualizaMeta, inicializarCartaVerso} from './Importados/interface.js';

//import

/**************************************************************************
FUNÇÃO QUE INICIA TUDO
***************************************************************************/


function iniciarJogo(): void {
  initializeCursors();
  
  const baralho = criarBaralho();
  const mao = pegarCarta(baralho, 8);
  
  inicializarEstado(baralho, mao);
  atualizaMeta(100);
  inicializarBotoes();
  
  inicializarCartaVerso();
  
  inicializarEstado(baralho, mao);
  atualizaMeta(100);
  inicializarBotoes();
  renderiza(mao);
  

  atualizarBaralhoContagem(baralho.length);


  Monitoramento();
}

iniciarJogo();


