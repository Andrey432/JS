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

    // Обработка выхода змейки за пределы игрового поля
    clampSnakePosition(position) {
        let tw = this.config.getTableWidth(), th = this.config.getTableHeight()
        
        if (position.x < 0)
            position.x = tw + position.x;
        if (position.y < 0)
            position.y = th + position.y;

        position.x %= tw;
        position.y %= th;
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
        
        this.initSnake();  // Установить змейку в центр поля
        this.initFoodSpawner();  // Перегенерировать еду
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

    // Вызывает setInterval и удаляет предыдущий, если он был
    resetLoop() {
        if (this.loop !== null)
            clearInterval(this.loop);
        this.loop = setInterval(() => this.update(), this.currentDelay);
    },

    // Проверка текущего статуса игры
    handleGameStatus() {
        switch (this.gameManager.getGameStatus()) {
            case "run":
                return true;
            case "reset":
                this.reset();
                break;
            case "gameover":
                this.finishGame();
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

    // Увеличение скорости змейки
    nextStage() {
        this.gameSpeed = Math.min(this.gameSpeed + 1, this.config.getMaxGameSpeed());
        this.currentDelay = 1000 / this.gameSpeed;
        this.stage++;
        this.resetLoop(); // Уменьшается delay и пересоздаётся вызов setInterval
    },

    // Переместить змейку
    updateSnake() {
        let nextSnakePos = this.snake.getNextStep();
        this.clampSnakePosition(nextSnakePos);

        let deleteEnd = true;  // Если false, то змейка удлинится на текущем шаге

        if (this.foodSpawner.isFoodCell(nextSnakePos)) {  // Проверка, не попала ли змейка на еду
            this.snakeEat(nextSnakePos);
            deleteEnd = false;
        }
        else if (this.snake.isSnakeBody(nextSnakePos)) {  // Проверка, не пересекла ли змейка саму себя
            this.cutSnake(nextSnakePos);
        }
        else if (this.wallsSpawner.isWallCell(nextSnakePos)) {  // Проверка, не столкнулась ли змейка со стеной
            this.gameManager.gameOver();
        }

        if (deleteEnd)
            this.map.resetCell(this.snake.getLast());  // Удление хвоста змейки, если она не выросла
        this.snake.moveTo(nextSnakePos, deleteEnd);  // Обновление состояния змейки
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

    // Закончить игру и перевести всё в начальное состояние
    finishGame() {
        this.reset();
        this.gameManager.resetState();
    },
}
