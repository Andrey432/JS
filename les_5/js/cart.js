class Cart {
    constructor () {
        this.body = null;
        this.initialize();
    }

    initialize() {
        this.body = document.createElement('h1');
        this.body.innerText = 'Coming soon...';
    }

    getBody() {
        return this.body;
    }
}