const DEFAULTS = {
    tableWidth: 35,
    tableHeight: 25,
    startingGameSpeed: 16,
    foodLimit: 5,

    moveUp: ['KeyW', 'ArrowUp'],
    moveLeft: ['KeyA', 'ArrowLeft'],
    moveRight: ['KeyD', 'ArrowRight'],
    moveDown: ['KeyS', 'ArrowDown'],

    tableContainerCls: 'game',
    tableCls: 'game_field',
    defaultCellCls: 'cell',
    snakeHeadCellCls: 'cell__snake_head',
    snakeCellCls: 'cell__snake',
    foodCellCls: 'cell__food',
    scoreLabelClass: 'info__score',
    speedLabelClass: 'info__game_speed',
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
            firstButtonId: this.settings.firstButtonId,
            secondButtonId: this.settings.secondButtonId
        }
    }
}
