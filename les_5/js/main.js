'use strict';

const chessSettings = {
    tableSize: 8,
    figures: ['R', 'H', 'B', 'K', 'Q', 'B', 'H', 'R'],
    headers: {
        horizontal: 'ABCDEFGH',
        vertical: [1, 2, 3, 4, 5, 6, 7, 8]
    }
}


class Manager {
    constructor () {
        this.chess = new Chess(chessSettings);
        this.cart = new Cart();
        this.currentElement = null;
        this.root = null;
    }

    initialize() {
        let chess_btn = document.querySelector('#chess');
        let cart_btn = document.querySelector('#cart');
        this.root = document.querySelector('.main');
        
        // Без стрелочной фнкции контекст this переходит в кнопку
        // Да и удаление listener'ов не потребуется 
        chess_btn.addEventListener('click', () => this.showChess());
        cart_btn.addEventListener('click', () => this.showCart());
    }

    showChess() {
        if (this.currentElement)
            this.root.removeChild(this.currentElement);
        this.currentElement = this.chess.getBody();
        this.root.appendChild(this.currentElement);
    }

    showCart() {
        if (this.currentElement)
            this.root.removeChild(this.currentElement);
        this.currentElement = this.cart.getBody();
        this.root.appendChild(this.currentElement);
    }
}


const manager = new Manager();
manager.initialize();
