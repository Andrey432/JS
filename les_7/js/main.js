const game = {
    config,
    snake,
    map,
    foodSpawner,

    init(settings={}) {
        this.config.init(settings);
        this.initMap();
        this.initSnake();
        this.initFoodSpawner();
        this.loop = setInterval(() => this.update(), 1000 / this.config.getStartingSpeed());
    },

    initMap() {
        let tableRoot = document.querySelector(`.${this.config.getTableRootClass()}`);
        let th = this.config.getTableWidth(), tw = this.config.getTableHeight();
        let cell = this.config.getCellClass();
        let table = this.config.getTableClass();
        this.map.init(tableRoot, table, cell, th, tw);
    },

    initSnake() {
        let x = Math.floor(this.config.getTableWidth() / 2);
        let y = Math.floor(this.config.getTableHeight() / 2);
        this.snake.init(x, y);
        this.map.setCellClass(x, y, this.config.getSnakeHeadClass());
    },

    initFoodSpawner() {
        this.foodSpawner.init(this.config.getFoodLimit());
        while (this.foodSpawner.isNotFilled()) {
            let pos = this.getRandomEmptyCell();
            this.foodSpawner.spawnFood();
            this.map.setCellClass(pos.x, pos.y, this.config.getFoodCellClass());
        }
    },

    reset() {
        this.snake.reset();
        this.map.reset();
    },

    getRandomEmptyCell() {
        let x, y;
        do {
            x = Math.floor(Math.random() * this.config.getTableWidth());
            y = Math.floor(Math.random() * this.config.getTableHeight());
        } while (!this.map.isEmptyCell(x, y));
        return {x: x, y: y};
    },

    moveSnake(position, deleteEnd) {
        let snakeOldPos = this.snake.getHead(), end = this.snake.getLast();
        this.map.setCellClass(snakeOldPos.x, snakeOldPos.y, this.config.getSnakeBodyClass());
        this.map.setCellClass(position.x, position.y, this.config.getSnakeHeadClass());
        if (deleteEnd)
            this.map.resetCell(end.x, end.y);
        this.snake.moveTo(position);
    },

    updateSnake() {
        let nextSnakePos = this.snake.getNextStep();
        let deleteEnd = !this.foodSpawner.isFoodCell(nextSnakePos);
        this.moveSnake(nextSnakePos, deleteEnd);
    },

    update() {
        this.updateSnake();
    },

    render() {
        
    }
}