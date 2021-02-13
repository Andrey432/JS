const game = {
    config,
    snake,
    map,

    init(settings={}) {
        this.config.init(settings);

        let tableRoot = this.config.getTableRootClass();
        let th = this.config.getTableWidth(), tw = this.config.getTableHeight();
        this.map.init(document.querySelector(`.${tableRoot}`), this.config.getCellClass(), th, tw);

        this.initSnake();

        this.loop = setInterval(() => this.update(), 1000 / this.config.getStartingSpeed())
    },

    reset() {
        this.snake.reset();
        this.map.reset();
    },

    initSnake() {
        let x = Math.floor(this.config.getTableWidth() / 2);
        let y = Math.floor(this.config.getTableHeight() / 2);
        this.snake.init(x, y);
        this.map.toggleCellClass(x, y, this.config.getSnakeHeadClass());
    },

    updateSnake() {
    },

    update() {
        this.updateSnake();
    },

    render() {
        
    }
}