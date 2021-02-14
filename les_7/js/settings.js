const DEFAULTS = {
    tableWidth: 35,
    tableHeight: 25,
    startingGameSpeed: 16,
    foodLimit: 5,

    moveUp: ['KeyW', 'ArrowUp'],
    moveLeft: ['KeyA', 'ArrowLeft'],
    moveRight: ['KeyD', 'ArrowRight'],
    moveDown: ['KeyS', 'ArrowDown'],

    wallsLifeTime: [3000, 10000],
    wallsSpawnDelay: [500, 3000],
    stageTime: 5000,
    maxGameSpeed: 50,

    tableContainerCls: 'game',
    tableCls: 'game_field',
    defaultCellCls: 'cell',
    snakeHeadCellCls: 'cell__snake_head',
    snakeCellCls: 'cell__snake',
    foodCellCls: 'cell__food',
    scoreLabelClass: 'info__score',
    speedLabelClass: 'info__game_speed',
    timeLabelClass: 'info__time',
    maxScoreLabelClass: 'info__maxscore',
    firstButtonId: 'firstButton',
    secondButtonId: 'secondButton',
}


const config = {
    settings: DEFAULTS,

    init(settings={}) {
        this.settings = Object.assign(DEFAULTS, settings);
    },

    getTableRootClass() {
        return this.settings.tableContainerCls;
    },

    getTableClass() {
        return this.settings.tableCls;
    },

    getCellClass() {
        return this.settings.defaultCellCls;
    },

    getSnakeHeadClass() {
        return this.settings.snakeHeadCellCls;
    },

    getSnakeBodyClass() {
        return this.settings.snakeCellCls;
    },

    getSnakeControlButtonsUp() {
        return this.settings.moveUp;
    },

    getSnakeControlButtonsRight() {
        return this.settings.moveRight;
    },

    getSnakeControlButtonsLeft() {
        return this.settings.moveLeft;
    },

    getSnakeControlButtonsDown() {
        return this.settings.moveDown;
    },

    getTableWidth() {
        return this.settings.tableWidth;
    },

    getTableHeight() {
        return this.settings.tableHeight;
    },

    getStartingSpeed() {
        return this.settings.startingGameSpeed;
    },

    getFoodCellClass() {
        return this.settings.foodCellCls;
    },

    getFoodLimit() {
        return this.settings.foodLimit;
    },

    getGameManagerElements() {
        return {
            scoreLabelClass: this.settings.scoreLabelClass,
            speedLabelClass: this.settings.speedLabelClass,
            maxScoreLabelClass: this.settings.maxScoreLabelClass,
            timeLabelClass: this.settings.timeLabelClass,
            firstButtonId: this.settings.firstButtonId,
            secondButtonId: this.settings.secondButtonId
        }
    },

    getWallsLifeTime() {
        return this.wallsLifeTime;
    },

    getWallsSpawnDelay() {
        return this.wallsSpawnDelay;
    },

    getStageTime() {
        return this.settings.stageTime;
    },

    getMaxGameSpeed() {
        return this.settings.maxGameSpeed;
    }
}
