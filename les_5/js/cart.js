class Cart {
    constructor (products) {
        this.body = null;
        this.emptyMsg = null;
        this.productsInfoMsg = null;
        this.products = products;
        this.initialize();
        this.genCatalog();
    }

    initialize() {
        this.body = document.createElement('div');
        this.emptyMsg = document.createElement('h1');
        this.productsInfoMsg = document.createElement('h1');
        this.catalog = document.createElement('div')

        this.emptyMsg.innerText = 'Корзина пуста';
        this.emptyMsg.classList.add('unvisible');
        this.catalog.classList.add('catalog');
        this.body.classList.add('cart');

        this.body.appendChild(this.emptyMsg);
        this.body.appendChild(this.catalog);
        this.body.appendChild(this.productsInfoMsg);
    }

    countProductsPrice() {
        return this.products.reduce((current, item) => current + item.quantity * item.price, 0);
    }

    genCatalog() {
        if (this.products.length === 0) {
            this.productsInfoMsg.classList.add('unvisible');
            this.emptyMsg.classList.remove('unvisible');
            return;
        }
        let end = '';
        if (5 <= this.products.length && this.products.length <= 20)
            end = 'ов';
        else {
            switch (this.products.length % 10) {
                case 1:
                    break;
                case 2:
                case 3:
                case 4:
                    end = 'а';
                    break;
                default:
                    end = 'ов';
            }
        }
        this.productsInfoMsg.innerText = `В корзине ${this.products.length} товар${end} на сумму ${this.countProductsPrice()} рублей`;
    }

    getBody() {
        return this.body;
    }
}