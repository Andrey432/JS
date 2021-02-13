const DEFAULTS = {
    tableWidth: 35,
    tableHeight: 25,
    startingGameSpeed: 2,
    foodLimit: 5,

    tableContainerCls: 'game',
    tableCls: 'game_field',
    defaultCellCls: 'cell',
    snakeHeadCellCls: 'cell__snake_head',
    snakeCellCls: 'cell__snake',
    foodCellCls: 'cell__food',
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
    }
}
