import io from 'socket.io-client';
import Card from '../helpers/card';
import Dealer from "../helpers/dealer";
import Zone from '../helpers/zone';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('cyanCardFront', 'src/assets/CyanCardFront.png');
        this.load.image('cyanCardBack', 'src/assets/CyanCardBack.png');
        this.load.image('magentaCardFront', 'src/assets/magentaCardFront.png');
        this.load.image('magentaCardBack', 'src/assets/magentaCardBack.png');
        this.load.image('2C', 'src/assets/2C.png');
        this.load.image('2D', 'src/assets/2D.png');
        this.load.image('2H', 'src/assets/2H.png');
        this.load.image('2S', 'src/assets/2S.png');
        this.load.image('4C', 'src/assets/4C.png');
        this.load.image('4D', 'src/assets/4D.png');
        this.load.image('4H', 'src/assets/4H.png');
        this.load.image('4S', 'src/assets/4S.png');
        this.load.image('3C', 'src/assets/3C.png');
        this.load.image('3D', 'src/assets/3D.png');
        this.load.image('3H', 'src/assets/3H.png');
        this.load.image('3S', 'src/assets/3S.png');
        this.load.image('5C', 'src/assets/5C.png');
        this.load.image('5D', 'src/assets/5D.png');
        this.load.image('5H', 'src/assets/5H.png');
        this.load.image('5S', 'src/assets/5S.png');
        this.load.image('6C', 'src/assets/6C.png');
        this.load.image('6D', 'src/assets/6D.png');
        this.load.image('6H', 'src/assets/6H.png');
        this.load.image('6S', 'src/assets/6S.png');
        this.load.image('7C', 'src/assets/7C.png');
        this.load.image('7D', 'src/assets/7D.png');
        this.load.image('7H', 'src/assets/7H.png');
        this.load.image('7S', 'src/assets/7S.png');
        this.load.image('8C', 'src/assets/8C.png');
        this.load.image('8D', 'src/assets/8D.png');
        this.load.image('8H', 'src/assets/8H.png');
        this.load.image('8S', 'src/assets/8S.png');
        this.load.image('9C', 'src/assets/9C.png');
        this.load.image('9D', 'src/assets/9D.png');
        this.load.image('9H', 'src/assets/9H.png');
        this.load.image('9S', 'src/assets/9S.png');
        this.load.image('TC', 'src/assets/TC.png');
        this.load.image('TD', 'src/assets/TD.png');
        this.load.image('TH', 'src/assets/TH.png');
        this.load.image('TS', 'src/assets/TS.png');
        this.load.image('JC', 'src/assets/JC.png');
        this.load.image('JD', 'src/assets/JD.png');
        this.load.image('JH', 'src/assets/JH.png');
        this.load.image('JS', 'src/assets/JS.png');
        this.load.image('QC', 'src/assets/QC.png');
        this.load.image('QD', 'src/assets/QD.png');
        this.load.image('QH', 'src/assets/QH.png');
        this.load.image('QS', 'src/assets/QS.png');
        this.load.image('KC', 'src/assets/KC.png');
        this.load.image('KD', 'src/assets/KD.png');
        this.load.image('KH', 'src/assets/KH.png');
        this.load.image('KS', 'src/assets/KS.png');
        this.load.image('AD', 'src/assets/AD.png');
        this.load.image('AC', 'src/assets/AC.png');
        this.load.image('AS', 'src/assets/AS.png');
        this.load.image('AH', 'src/assets/AH.png');
        this.load.image('cardBack', 'src/assets/cardBack.png');
    }

    create() {
        this.isPlayerA = false;
        this.opponentCards = [];

        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        this.dealer = new Dealer(this);

        let self = this;

        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
            console.log('Connected!');
        });

        this.socket.on('isPlayerA', function () {
            self.isPlayerA = true;
        })

        this.socket.on('dealCards', function () {
            self.dealer.dealCards();
            self.dealText.disableInteractive();
        })

        this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
            if (isPlayerA !== self.isPlayerA) {
                let sprite = gameObject.textureKey;
                self.opponentCards.shift().destroy();
                self.dropZone.data.values.cards++;
                let card = new Card(self);
                card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), sprite).disableInteractive();
            }
        })

        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        this.dealText.on('pointerdown', function () {
            self.socket.emit("dealCards");
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
        })
    }

    update() {

    }
}