'use strict';
// Этот класс позволяет с помощью кнопок выбрать, что просматривать (для удобства)
// Он генерирует кнопки и вставляет пресгенерированную в скриптах вёрстку по их нажатию
// Шахматы и корзина находятся в соответствующих файлах и с данным классом не связаны


const chessSettings = {
    tableSize: 8,
    figures: ['R', 'H', 'B', 'Q', 'K', 'B', 'H', 'R'],
    headers: {
        horizontal: 'ABCDEFGH',
        vertical: [1, 2, 3, 4, 5, 6, 7, 8]
    }
}

const cartProducts = [
    {
        name: 'item1',
        quantity: 4,
        price: 4999
    },
    {
        name: 'item2',
        quantity: 10,
        price: 500
    },
    {
        name: 'item3',
        quantity: 6,
        price: 1200
    },
    {
        name: 'item4',
        quantity: 1,
        price: 78800
    }
]

const modules = {
    'Chess': new Chess(chessSettings),
    'Cart': new Cart(cartProducts),
}


class Manager {
    constructor (modules) {
        this.modules = modules;
        this.currentElement = null;
        this.root = null;
    }

    initialize() {
        let container = document.querySelector('.container');

        for (const md in this.modules) {
            let button = document.createElement('button');
            button.innerText = md;
            button.addEventListener('click', () => this.showModule(md));
            container.appendChild(button);
        }

        this.root = document.createElement('div');
        this.root.classList.add('main');
        container.appendChild(this.root);
    }

    showModule(module) {
        let cur = this.currentElement;
        if (cur !== module) {
            if (cur !== null)
                this.root.removeChild(this.modules[cur].getBody());
            this.currentElement = module;
            this.root.appendChild(this.modules[module].getBody());
        }
    }
}


const manager = new Manager(modules);
manager.initialize();
