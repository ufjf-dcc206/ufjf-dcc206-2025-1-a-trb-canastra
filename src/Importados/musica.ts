import { menuMp3, partidaMp3 } from './assets importacao/music-assets.js';

const menuMusic = new Audio(menuMp3);
menuMusic.loop = true; // Coloca a música em loop
menuMusic.volume = 0.5;
menuMusic.autoplay = true; // Ajusta o volume da música do menu

const partidaMusic = new Audio(partidaMp3);
partidaMusic.loop = true; // Coloca a música da partida em loop
partidaMusic.volume = 0.5;
partidaMusic.autoplay = true; // Ajusta o volume da música da partida



//Música para meus ouvidos

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