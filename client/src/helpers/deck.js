const SUITS = new Set(['S', 'D', 'H', 'C']);
const VALUES = new Set(['2','3','4','5','6','7','8','9','T','K','A','Q','J']);

export default class Deck {
    constructor(scene) {
    	this.deck = [];

    	// Insert all cards and shuffle them
    	SUITS.forEach(suit => {
    		VALUES.forEach(value => {
    			const card = `${value}${suit}`
    			console.log(card);
    			this.deck.push(card)
    		})
    	})

    	shuffle(this.deck);
    	console.log('finsihed', this.deck);	

    	// pop a single card from deck;
	    this.dealCard = () => {
    		return this.deck.pop();
    	}
	}
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}