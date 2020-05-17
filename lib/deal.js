const cardTypes = ['spade', 'heart', 'diamond', 'club']
const cardValues = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const cardPoints = {'A': 4, 'K': 3, 'Q': 2, 'J': 1, 'T': 0, '9': 0, '8': 0, '7': 0, '6': 0, '5': 0, '4': 0, '3': 0, '2': 0}

const configurations = {
    '1nt': {config: '15..17', majors: '2..4', minors: '2..5'},
    '2nt': {config: '20..21', majors: '2..4', minors: '2..5'},
    '2c':  {config: '23..40' }
}
export class Deck {
    constructor() {
        this.reset();
    }

    reset() {

        this.cards = [];
        cardValues.forEach(value => {
            cardTypes.forEach(type => {
                this.cards.push({ 'type': type, 'value': value, 'point': cardPoints[value] });
            })
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
    constructor(config) {
        this.deals = [];
        this.config = config;
    }
      
    generate(){
        for(var i=0;i<20;i++){
            var deal = new Deal(this.config);
            this.deals.push(deal.data) 
        }
    }
}

export class Deal {
    constructor(config) {
        const playerSeats = ['west', 'north', 'east', 'south']

        this.data = { hands: [], zone: 'none', dealer: 'west' };
        var deck = new Deck();
    
        var seats = _.map(config.seats, 'seat')
        _.union(seats, _.difference(playerSeats, seats)).forEach((seat) => {
            var hand = new Hand(deck, seat)
            var handData = hand.representer()
            for(var i=1;;i++){
                var seatConfig = _.find( config.seats, {seat: seat} );
                if ( i > 1500 || this.isValid( handData, seatConfig )){
                    this.data.hands.push(handData);
                    break;
                }
                else{
                    deck.resetHand(hand.cards)
                    hand = new Hand(deck, seat)
                    handData = hand.representer()
                }
            }
        });
    }

    isValid( handData, seatConfig ) {
        if (seatConfig == undefined )
            return true;

        var min = seatConfig.points.min;
        var max = seatConfig.points.max;

        if (  handData.points < min)
            return false;
        if ( handData.points > max )
            return false;

        return true
    }
}


