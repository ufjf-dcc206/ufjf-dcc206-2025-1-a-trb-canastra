import { efeitoCard, menuMp3, partidaMp3 } from './assets importacao/music-assets.js';

const menuMusic = new Audio(menuMp3);
menuMusic.loop = true; 
menuMusic.volume = 0.3;
menuMusic.autoplay = true; 

const partidaMusic = new Audio(partidaMp3);
partidaMusic.loop = true; 
partidaMusic.volume = 0.3;
partidaMusic.autoplay = true; 

function tocarMenu(): void {
  partidaMusic.currentTime = 0;
  menuMusic.play();
}

function tocarPartida(): void {
  menuMusic.currentTime = 0;
  partidaMusic.play();
}

function pararMusicas(str: string): void {
  if (str === "menu") {
    menuMusic.pause();
    menuMusic.currentTime = 0;
  } else if (str === "partida") {
    partidaMusic.pause();
    partidaMusic.currentTime = 0;
  }
}

export function TocaMusica(): void {
const caminhoAtual= window.location.pathname;
if (caminhoAtual.includes("index.html") || caminhoAtual.includes("tutorial.html" )) {; // Para qualquer música que esteja tocando antes de iniciar o menu
  pararMusicas("partida");
  tocarMenu();
}
else if (caminhoAtual.includes("partida.html")) {
   pararMusicas("menu");
  tocarPartida();
}
}

export function efeitoCarta(): void {
  const efeito = new Audio(efeitoCard);
  efeito.volume = 0.5;
  efeito.play();
}