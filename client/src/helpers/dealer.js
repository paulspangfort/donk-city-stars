import Card from './card';
import Deck from './deck';

export default class Dealer {
    constructor(scene) {
        this.deck = new Deck(scene);
        this.dealCards = () => {
            let playerSprite;
            let opponentSprite = 'cardBack';
            if (scene.isPlayerA) {
                playerSprite = 'cyanCardFront';
            } else {
                playerSprite = 'magentaCardFront';
            };
            for (let i = 0; i < 5; i++) {
                let playerCard = new Card(scene);
                const card = this.deck.dealCard();
                console.log('dealt card', card);
                playerCard.render(475 + (i * 100), 650, this.deck.dealCard());

                let opponentCard = new Card(scene);
                scene.opponentCards.push(opponentCard.render(475 + (i * 100), 125, opponentSprite).disableInteractive());
            }
        }
    }
}