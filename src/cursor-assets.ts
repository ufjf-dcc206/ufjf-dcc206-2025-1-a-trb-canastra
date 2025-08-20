// Cursor assets para forçar inclusão no Vite
import meuCursor1 from './recursos/imagens/meu-cursor1.png';
import meuCursorClick from './recursos/imagens/meu-cursorCLICK.png';

// Definir variáveis CSS personalizadas para os cursores
export function initializeCursors() {
  // Forçar o Vite a incluir essas imagens no bundle
  console.log('Loading cursors:', meuCursor1, meuCursorClick);
  
  const root = document.documentElement;
  root.style.setProperty('--cursor-normal', `url(${meuCursor1}), auto`);
  root.style.setProperty('--cursor-click', `url(${meuCursorClick}), pointer`);
}

export { meuCursor1, meuCursorClick };
