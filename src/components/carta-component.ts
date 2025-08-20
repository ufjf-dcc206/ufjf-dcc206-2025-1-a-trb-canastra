/***********************************************
 Cria a div que vai conter a carta como um componente customizado
para facilitar os estilos e definições que cada carta 
deve ter ao  cria-las dinamicamente no typescript
Além disso, inclui a lógica para selecionar e manipular as cartas
*************************************************/

class CartaComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.build();
    }

    // Constrói o conteúdo e estilos do componente
    build() {
        const carta = document.createElement('div');
        carta.classList.add('carta');

        // Clona todos os nós filhos do componente para dentro da carta
        Array.from(this.childNodes).forEach(node => {
            carta.appendChild(node.cloneNode(true));
        });
        const style = this.styles();
        
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(style);
            this.shadowRoot.appendChild(carta);
        }

        carta.addEventListener('click', () => {
            this.selecionar();
        });
    }
        styles (){
            const style = document.createElement('style');
        style.textContent = `
            .carta {
            display: inline-block;
            transition: all 0.3s ease;
            position: relative;
            cursor: url('./src/recursos/imagens/meu-cursorCLICK.png'), pointer;
            }
            
            .carta img {
            height: 12vmin;
            width: 12vmin;
            max-height: 192px;
            max-width: 192px;
            min-height: 128px;
            min-width: 128px;
            image-rendering: crisp-edges;
            image-rendering: pixelated;
            border-radius: 8px;
            transition: all 0.3s ease;
        
            }
            
            .carta:hover img {
            transform: translateY(-5px);
            }
            
            .carta.selecionada img {
            transform: scale(1.2);
            filter: brightness(1) drop-shadow(0 0 5px rgba(30, 255, 0, 1)) ;
            }
            
            .carta.negado img {
            animation: negado 2s ease-in-out;
            }
            
            @keyframes negado {
            0% { transform: rotate(-15deg); }
            20% { transform: rotate(15deg); }
            40% { transform: rotate(-15deg); }
            60% { transform: rotate(15deg); }
            80% { transform: rotate(-15deg); }
            100% { transform: rotate(0deg); }
            }
            
            @keyframes cresce {
            from { transform: scale(1); }
            to { transform: scale(1.2); }
            }
        `;
        return style
        }

    /**********************************
 *   Método para selecionar a carta
    *********************************/    
    selecionar() {
     
        const cartasSelecionadas = document.querySelectorAll('carta-component.selecionada');
        
        // Se já houver 5 cartas selecionadas e esta não estiver selecionada, faz animação de negação
        if (cartasSelecionadas.length >= 5 && !this.classList.contains('selecionada')) {
            const carta = this.shadowRoot?.querySelector('.carta');
            if (carta) {
                carta.classList.remove('negado'); // Remove a classe para reiniciar a animação
                void (carta as HTMLElement).offsetWidth; // Força reflow para reiniciar animação
                carta.classList.add('negado'); // Adiciona a classe para animar
            }
            
        }else{

        // Alterna o estado de seleção
        this.classList.toggle('selecionada');
        
        // Sincroniza o estado visual da carta interna com a seleção do componente.
        const carta = this.shadowRoot?.querySelector('.carta');
        if (carta) {
            if (this.classList.contains('selecionada')) {
            carta.classList.add('selecionada');
            } else {
            carta.classList.remove('selecionada');
            }
        }
    }
    }
}

customElements.define('carta-component', CartaComponent);