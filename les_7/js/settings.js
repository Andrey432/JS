const DEFAULTS = {
    tableWidth: 35,
    tableHeight: 25,
    startingGameSpeed: 1,

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

    getTableWidth() {
        return this.settings.tableWidth;
    },

    getTableHeight() {
        return this.settings.tableHeight;
    },

    getStartingSpeed() {
        return this.settings.startingGameSpeed;
    }
}
