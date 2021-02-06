'use strict';


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


const chessSettings = {
    tableSize: 8,
    figures: ['R', 'H', 'B', 'K', 'Q', 'B', 'H', 'R'],
    headers: {
        horizontal: 'ABCDEFGH',
        vertical: [1, 2, 3, 4, 5, 6, 7, 8]
    }
}


const modules = {
    'Chess': new Chess(chessSettings),
    'Cart': new Cart(),
}


const manager = new Manager(modules);
manager.initialize();
