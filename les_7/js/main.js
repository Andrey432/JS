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
        this.initEventHandlers();
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
    },

    initFoodSpawner() {
        this.foodSpawner.init(this.config.getFoodLimit());
        while (this.foodSpawner.isNotFilled()) {
            this.foodSpawner.spawnFood(this.getRandomEmptyCell());
        }
    },

    initEventHandlers() {
        document.addEventListener('keydown', (event) => this.handleKeydownEvent(event));
    },

    handleKeydownEvent(event) {
        if (this.config.getSnakeControlButtonsUp().indexOf(event.code) != -1) {
            this.snake.setDirection(0, -1);
        }
        else if (this.config.getSnakeControlButtonsDown().indexOf(event.code) != -1) {
            this.snake.setDirection(0, 1);
        }
        else if (this.config.getSnakeControlButtonsLeft().indexOf(event.code) != -1) {
            this.snake.setDirection(-1, 0);
        }
        else if (this.config.getSnakeControlButtonsRight().indexOf(event.code) != -1) {
            this.snake.setDirection(1, 0);
        }
    },

    reset() {
        this.snake.reset();
        this.map.reset();
    },

    getRandomEmptyCell() {
        let pos = {x: null, y: null};
        do {
            pos.x = Math.floor(Math.random() * this.config.getTableWidth());
            pos.y = Math.floor(Math.random() * this.config.getTableHeight());
        } while (!this.map.isEmptyCell(pos));
        return pos;
    },

    checkSnakePosition(position) {
        let tw = this.config.getTableWidth(), th = this.config.getTableHeight()
        
        if (position.x < 0)
            position.x = tw + position.x;
        if (position.y < 0)
            position.y = th + position.y;

        position.x %= tw;
        position.y %= th;
    },

    updateSnake() {
        let nextSnakePos = this.snake.getNextStep();
        this.checkSnakePosition(nextSnakePos);

        if (this.snake.isSnakeBody(nextSnakePos)) {
            for (const i of this.snake.cut(nextSnakePos)) {
                this.foodSpawner.spawnFood(i);
            }
        }

        let deleteEnd = true;

        if (this.foodSpawner.isFoodCell(nextSnakePos)) {
            this.foodSpawner.removeFood(nextSnakePos);
            if (this.foodSpawner.isNotFilled())
                this.foodSpawner.spawnFood(this.getRandomEmptyCell());
            deleteEnd = false;
        } else {
            this.map.resetCell(this.snake.getLast());
        }

        this.snake.moveTo(nextSnakePos, deleteEnd);
    },

    update() {
        this.updateSnake();
        this.render();
    },

    render() {
        let snakeBody = this.snake.getBody()
        for (const i in snakeBody) {
            if (i == snakeBody.length - 1)
                this.map.setCellClass(snakeBody[i], this.config.getSnakeHeadClass());
            else
                this.map.setCellClass(snakeBody[i], this.config.getSnakeBodyClass());
        }
        for (const i of this.foodSpawner.getFoodList()) {
            this.map.setCellClass(i, this.config.getFoodCellClass());
        }
    }
}