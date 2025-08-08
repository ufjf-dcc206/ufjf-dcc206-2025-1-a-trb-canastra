//importações
import "./style.css"; //Pra usar os estilos de forma global
import "./components/carta-component"; //Importa o componente de carta
import { criarBaralho, pegarCarta } from './Importados/carta_baralho.js';
import { jogacarta, descarta, inicializarEstado, Monitoramento } from './Importados/jogo.js';
import { renderiza, atualizarBaralhoContagem, atualizaMeta, atualizarPontuacaoInterface } from './Importados/interface.js';


/**********************************************************************
 CONSTANTES
************************************************************************/
let nmrJogadas = 4;
let nmrDescartes = 3;
const botjoga = document.getElementById('botaojoga');
const botdesc = document.getElementById('botaodescarta');

//faz os botões chamarem as funções correspondentes
botjoga?.addEventListener('click', ()=>{
  if(nmrJogadas>0){
    jogacarta();
      nmrJogadas-=1;
  }else{
    botjoga.classList.add('acabou');
  }
});
botdesc?.addEventListener('click', () => {
  if(nmrDescartes>0){
    descarta()
    nmrDescartes-=1;
  }
  botdesc.classList.add('acabou')
  }
);

/**********************************************************************
FUNÇÃO QUE INICIA TUDO
************************************************************************/
function iniciarJogo(): void {
  // Cria o baralho e distribui cartas
  const baralho = criarBaralho();
  const mao = pegarCarta(baralho, 8);
  
  // Inicializa o estado do jogo
  inicializarEstado(baralho, mao);
  
  // Renderiza as cartas na interface
  renderiza(mao);
  
  // Atualiza o contador de cartas restantes no baralho
  atualizarBaralhoContagem(baralho.length);


  // Inicia o monitoramento das cartas selecionadas
  Monitoramento();
}
//inicia o jogo
iniciarJogo();

