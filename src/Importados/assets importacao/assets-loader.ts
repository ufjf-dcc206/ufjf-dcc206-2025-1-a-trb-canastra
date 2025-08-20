// Este arquivo força o Vite a incluir todas as cartas como assets
import cardBack from '../../recursos/Cartas Grandes/card_back.png'
import empty from '../../recursos/Cartas Grandes/empty.png'

// Cartas de Copas
import copa2 from '../../recursos/Cartas Grandes/2-copas.png'
import copa3 from '../../recursos/Cartas Grandes/3-copas.png'
import copa4 from '../../recursos/Cartas Grandes/4-copas.png'
import copa5 from '../../recursos/Cartas Grandes/5-copas.png'
import copa6 from '../../recursos/Cartas Grandes/6-copas.png'
import copa7 from '../../recursos/Cartas Grandes/7-copas.png'
import copa8 from '../../recursos/Cartas Grandes/8-copas.png'
import copa9 from '../../recursos/Cartas Grandes/9-copas.png'
import copa10 from '../../recursos/Cartas Grandes/10-copas.png'
import copaJ from '../../recursos/Cartas Grandes/J-copas.png'
import copaQ from '../../recursos/Cartas Grandes/Q-copas.png'
import copaK from '../../recursos/Cartas Grandes/K-copas.png'
import copaA from '../../recursos/Cartas Grandes/A-copas.png'

// Cartas de Espadas
import espada2 from '../../recursos/Cartas Grandes/2-espadas.png'
import espada3 from '../../recursos/Cartas Grandes/3-espadas.png'
import espada4 from '../../recursos/Cartas Grandes/4-espadas.png'
import espada5 from '../../recursos/Cartas Grandes/5-espadas.png'
import espada6 from '../../recursos/Cartas Grandes/6-espadas.png'
import espada7 from '../../recursos/Cartas Grandes/7-espadas.png'
import espada8 from '../../recursos/Cartas Grandes/8-espadas.png'
import espada9 from '../../recursos/Cartas Grandes/9-espadas.png'
import espada10 from '../../recursos/Cartas Grandes/10-espadas.png'
import espadaJ from '../../recursos/Cartas Grandes/J-espadas.png'
import espadaQ from '../../recursos/Cartas Grandes/Q-espadas.png'
import espadaK from '../../recursos/Cartas Grandes/K-espadas.png'
import espadaA from '../../recursos/Cartas Grandes/A-espadas.png'

// Cartas de Ouros
import ouro2 from '../../recursos/Cartas Grandes/2-ouros.png'
import ouro3 from '../../recursos/Cartas Grandes/3-ouros.png'
import ouro4 from '../../recursos/Cartas Grandes/4-ouros.png'
import ouro5 from '../../recursos/Cartas Grandes/5-ouros.png'
import ouro6 from '../../recursos/Cartas Grandes/6-ouros.png'
import ouro7 from '../../recursos/Cartas Grandes/7-ouros.png'
import ouro8 from '../../recursos/Cartas Grandes/8-ouros.png'
import ouro9 from '../../recursos/Cartas Grandes/9-ouros.png'
import ouro10 from '../../recursos/Cartas Grandes/10-ouros.png'
import ouroJ from '../../recursos/Cartas Grandes/J-ouros.png'
import ouroQ from '../../recursos/Cartas Grandes/Q-ouros.png'
import ouroK from '../../recursos/Cartas Grandes/K-ouros.png'
import ouroA from '../../recursos/Cartas Grandes/A-ouros.png'

// Cartas de Paus
import pau2 from '../../recursos/Cartas Grandes/2-paus.png'
import pau3 from '../../recursos/Cartas Grandes/3-paus.png'
import pau4 from '../../recursos/Cartas Grandes/4-paus.png'
import pau5 from '../../recursos/Cartas Grandes/5-paus.png'
import pau6 from '../../recursos/Cartas Grandes/6-paus.png'
import pau7 from '../../recursos/Cartas Grandes/7-paus.png'
import pau8 from '../../recursos/Cartas Grandes/8-paus.png'
import pau9 from '../../recursos/Cartas Grandes/9-paus.png'
import pau10 from '../../recursos/Cartas Grandes/10-paus.png'
import pauJ from '../../recursos/Cartas Grandes/J-paus.png'
import pauQ from '../../recursos/Cartas Grandes/Q-paus.png'
import pauK from '../../recursos/Cartas Grandes/K-paus.png'
import pauA from '../../recursos/Cartas Grandes/A-paus.png'

// Jokers
import jokerBlack from '../../recursos/Cartas Grandes/joker-black.png'
import jokerRed from '../../recursos/Cartas Grandes/joker-red.png'

// Mapa para acesso dinâmico
export const cartasAssets: Record<string, string> = {
  'card_back': cardBack,
  'empty': empty,
  '2-copas': copa2,
  '3-copas': copa3,
  '4-copas': copa4,
  '5-copas': copa5,
  '6-copas': copa6,
  '7-copas': copa7,
  '8-copas': copa8,
  '9-copas': copa9,
  '10-copas': copa10,
  'J-copas': copaJ,
  'Q-copas': copaQ,
  'K-copas': copaK,
  'A-copas': copaA,
  '2-espadas': espada2,
  '3-espadas': espada3,
  '4-espadas': espada4,
  '5-espadas': espada5,
  '6-espadas': espada6,
  '7-espadas': espada7,
  '8-espadas': espada8,
  '9-espadas': espada9,
  '10-espadas': espada10,
  'J-espadas': espadaJ,
  'Q-espadas': espadaQ,
  'K-espadas': espadaK,
  'A-espadas': espadaA,
  '2-ouros': ouro2,
  '3-ouros': ouro3,
  '4-ouros': ouro4,
  '5-ouros': ouro5,
  '6-ouros': ouro6,
  '7-ouros': ouro7,
  '8-ouros': ouro8,
  '9-ouros': ouro9,
  '10-ouros': ouro10,
  'J-ouros': ouroJ,
  'Q-ouros': ouroQ,
  'K-ouros': ouroK,
  'A-ouros': ouroA,
  '2-paus': pau2,
  '3-paus': pau3,
  '4-paus': pau4,
  '5-paus': pau5,
  '6-paus': pau6,
  '7-paus': pau7,
  '8-paus': pau8,
  '9-paus': pau9,
  '10-paus': pau10,
  'J-paus': pauJ,
  'Q-paus': pauQ,
  'K-paus': pauK,
  'A-paus': pauA,
  'joker-black': jokerBlack,
  'joker-red': jokerRed
}

export function getCartaAsset(valor: string, naipe: string): string {
  return cartasAssets[`${valor}-${naipe}`] || empty
}

export function getCardBack(): string {
  return cartasAssets['card_back']
}
