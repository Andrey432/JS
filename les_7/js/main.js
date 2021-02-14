const game = {
    config,
    snake,
    map,
    foodSpawner,
    gameManager,
    wallsSpawner,

    gameSpeed: null,
    currentDelay: null,
    time: null,
    stage: null,
    loop: null,

    // Инициализация игры и всех модулей
    init(settings={}) {
        this.config.init(settings);
        this.gameManager.init(this.config.getGameManagerElements());
        this.initMap();
        this.initSnake();
        this.initFoodSpawner();
        this.initWallsSpawner();
        this.initEventHandlers();
        this.resetStats();
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

    initWallsSpawner() {
        this.wallsSpawner.init(this.config.getWallsSpawnDelay(), this.config.getWallsLifeTime());
    },

    initEventHandlers() {
        document.addEventListener('keydown', (event) => this.handleKeydownEvent(event));
    },

    // Обработка нажатий клавиш клавиатуры для управления змейкой
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

    // Выбрать случайную пустую клетку на карте
    getRandomEmptyCell() {
        let pos = {x: null, y: null};
        do {
            pos.x = Math.floor(Math.random() * this.config.getTableWidth());
            pos.y = Math.floor(Math.random() * this.config.getTableHeight());
        } while (!this.map.isEmptyCell(pos));
        return pos;
    },

    // Обработка выхода за пределы игрового поля
    clampSnakePosition(position) {
        let tw = this.config.getTableWidth(), th = this.config.getTableHeight()
        
        if (position.x < 0)
            position.x = tw + position.x;
        if (position.y < 0)
            position.y = th + position.y;

        position.x %= tw;
        position.y %= th;
    },

    // Проверка клетки, куда двигается змея
    isFoodCell(pos) {
        return this.foodSpawner.isFoodCell(pos);
    },

    // Проверка, не пересекла ли змейка сама себя
    isSnakeCell(pos) {
        return this.snake.isSnakeBody(pos);
    },

    // Проверка, не столкнулась ли змейка со стеной
    isWallCell(pos) {
        return this.wallsSpawner.isWallCell(pos);
    },

    // Обрезать змейку, если она пересекла сама себя
    cutSnake(pos) {
        let counter = 0;
        for (const i of this.snake.cut(pos)) {
            counter++;
            if (counter % 2)  // Каждая 2-я отрезанная клетка становится едой
                this.foodSpawner.spawnFood(i);
            else
                this.map.resetCell(i);
        }
    },

    // Съесть еду
    snakeEat(pos) {
        this.foodSpawner.removeFood(pos);
        if (this.foodSpawner.isNotFilled())
            this.foodSpawner.spawnFood(this.getRandomEmptyCell());
    },

    // Перевести игру в начальное состояние
    reset() {
        this.gameManager.pauseGame();
        this.snake.reset();
        this.foodSpawner.reset();
        this.wallsSpawner.reset();
        this.map.reset();
        this.gameManager.resetGameInfo();
        
        this.initSnake();
        this.initFoodSpawner();
        this.render();
        this.resetStats();
    },

    // Восстановить начальные значения игры
    resetStats() {
        this.time = 0;
        this.stage = 1;
        this.gameSpeed = this.config.getStartingSpeed();
        this.currentDelay = 1000 / this.gameSpeed;
        this.resetLoop();
    },

    // Переустанавляивает интервал обновлений игры
    resetLoop() {
        if (this.loop !== null)
            clearInterval(this.loop);
        this.loop = setInterval(() => this.update(), this.currentDelay);
    },

    // Закончить игру и перевести в начальное состояние
    finishGame() {
        this.reset();
        this.gameManager.resetState();
    },

    // Проверка текущего статуса игры
    handleGameStatus() {
        switch (this.gameManager.getGameStatus()) {
            case "run":
                return true;
            case "reset":
                this.reset();
                break;
            case "finished":
                this.finishGame();
                break;
        }
        return false;
    },

    // Счётчик времени
    incrementTime() {
        this.time += this.currentDelay;

        let stageDelay = this.config.getStageTime();
        if (this.time + stageDelay > this.stage * stageDelay)
            this.nextStage();
    },

    // Ускорение змейки
    nextStage() {
        this.gameSpeed = Math.min(this.gameSpeed + 1, this.config.getMaxGameSpeed());
        this.currentDelay = 1000 / this.gameSpeed;
        this.stage++;
        this.resetLoop();
    },

    // Переместить змейку
    updateSnake() {
        let nextSnakePos = this.snake.getNextStep();
        this.clampSnakePosition(nextSnakePos);

        let deleteEnd = true;  // Если true, то змейка не будет удлиняться на текущем шаге

        if (this.isFoodCell(nextSnakePos)) {
            this.snakeEat(nextSnakePos);
            deleteEnd = false;
        }
        else if (this.isSnakeCell(nextSnakePos)) {
            this.cutSnake(nextSnakePos);
        }
        else if (this.isWallCell(nextSnakePos)) {
            this.gameOver();
        }

        if (deleteEnd)
            this.map.resetCell(this.snake.getLast());
        this.snake.moveTo(nextSnakePos, deleteEnd);
    },

    // Обновить игровую статистику
    updateGameManager() {
        this.gameManager.update(this.snake.length(), this.gameSpeed, this.time);
    },

    // Обновить спавнер стен
    updateWallsSpawner() {
        if (this.wallsSpawner.readyToSpawn(this.time)) {
            let pos = this.getRandomEmptyCell();
            this.wallsSpawner.spawnWall(this.time, pos);
            this.map.setCellClass(pos, this.config.getWallCellClass())
        }
            
        let destroy = this.wallsSpawner.update(this.time);
        for (const i of destroy) {
            this.map.resetCell(i);
        }
    },

    // Обновление игры
    update() {
        if (!this.handleGameStatus()) return;
        this.incrementTime();
        this.updateSnake();
        this.updateWallsSpawner();
        if (!this.handleGameStatus()) return;
        this.updateGameManager();
        this.render();
    },

    // Отрисовка игрового поля
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
    },

    // Игрок проиграл
    gameOver() {
        this.finishGame();
    },

    // Игрок выйграл
    gameWin() {
        this.finishGame();
    }
}
