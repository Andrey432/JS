class Cart {
    constructor (products) {
        this.body = null;
        this.emptyMsg = null;
        this.emptyFlag = false;
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
        this.productsInfoMsg.classList.add('cart__info');
        this.catalog.classList.add('catalog');
        this.body.classList.add('cart');

        this.body.appendChild(this.emptyMsg);
        this.body.appendChild(this.catalog);
        this.body.appendChild(this.productsInfoMsg);
    }

    countProductsPrice() {
        return this.products.reduce((current, item) => current + item.quantity * item.price, 0);
    }

    genProductsInfo() {
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

    toggleInfo() {
        this.productsInfoMsg.classList.toggle('unvisible');
        this.emptyMsg.classList.toggle('unvisible');
        this.emptyFlag = !this.emptyFlag;
    }

    genCatalog() {
        if (this.products.length === 0 && !this.emptyFlag) {
            this.toggleInfo();
            return;
        }

        for (const p of this.products) {
            let body = document.createElement('div');
            let name = document.createElement('h3');
            let info = document.createElement('p');

            name.innerText = p.name;
            info.innerHTML = `Цена: ${p.price}<br>Количество: ${p.quantity}<br>К оплате: ${p.price * p.quantity}`;
            
            body.appendChild(name);
            body.appendChild(info);
            body.id = p.id;
            body.classList.add('cart__item');

            this.catalog.appendChild(body);
        }

        this.genProductsInfo();
    }

    getBody() {
        return this.body;
    }
}