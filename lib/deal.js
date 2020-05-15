const cardTypes = ['spade', 'heart', 'diamond', 'club']
const cardValues = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const cardPoints = {'A': 4, 'K': 3, 'Q': 2, 'J': 1, 'T': 0, '9': 0, '8': 0, '7': 0, '6': 0, '5': 0, '4': 0, '3': 0, '2': 0}

export class Deck {
    constructor() {
        this.reset();
    }

    reset() {

        this.cards = [];
        cardTypes.forEach((type) => {
            cardValues.forEach((value => {
                this.cards.push({ 'type': type, 'value': value, 'point': cardPoints[value] });
            }))
        })
    }

    pick() {
        return this.cards.splice(Math.floor(Math.random()*this.cards.length), 1)[0];
    }

    resetHand(cards) {
        this.cards.push.apply(this.cards, cards );
    }
}

export class Hand {
    constructor(deck, seat) {
        this.cards = [];
        this.seat  = seat;
        this.points = 0;
        this.deck = deck;
        this.dealSeat();
        this.sortCards();
    }

    dealSeat() {
        for(var i=1;i<=13;i++){
            var card = this.deck.pick()
            this.cards.push(card);
            this.points += card['point']
        }
    }

    sortCards() {
        this.cards.sort(function(a, b){
            return cardValues.indexOf(a['value']) - cardValues.indexOf(b['value'])
        })
    }

    representer() {
        return({ 'seat': this.seat, 'cards': this.cards, 'points': this.points })
    }
}

export class Sample {
    constructor(range) {
        this.deals = [];
        this.range = range;
    }
      
    generate(){
        for(var i=0;i<20;i++){
            var deal = new Deal(this.range);
            this.deals.push(deal.data) 
        }
    }
}

export class Deal {
    constructor(range) {
        const playerSeats = ['west', 'north', 'east', 'south']

        this.data = { hands: [], zone: 'none', dealer: 'west' };
        var deck = new Deck();
    
        playerSeats.forEach((seat) => {
            var hand = new Hand(deck, seat)
            var handData = hand.representer()
            if (seat == "west"){
                for(;;){
                    if (this.inRange( range, handData)){
                        this.data.hands.push(handData);
                        break;
                    }
                    else{
                        deck.resetHand(hand.cards)
                        hand = new Hand(deck, seat)
                        handData = hand.representer()
                    }
                }

            }else{
                this.data.hands.push(handData);
            }
        });
    }

    inRange( range, handData ) {
        var result = range.split('..');

        if (  handData.points < result[0])
            return false;
        if ( handData.points > result[1] )
            return false;

        return true
    }
}


