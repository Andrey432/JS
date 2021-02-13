const config = {
    settings: null,

    init(settings) {
        this.settings = settings;
    },

    getHTMLRoot() {
        return this.settings.HTMLContainer;
    },

    getFieldWidth() {
        return this.settings.tableWidth;
    },

    getFieldHeight() {
        return this.settings.tableHeight;
    },
}


const game = {
    config,
    gameField: [],

    init(settings) {
        this.config.init(settings);
        this.createGameField();
    },

    createGameField() {
        let body = document.querySelector(this.config.getHTMLRoot());
        
        let table = document.createElement('table');
        table.className = 'game_field';
        body.appendChild(table);

        for (let i = 0; i < this.config.getFieldHeight(); ++i) {
            let tr = document.createElement('tr');
            for (let j = 0; j < this.config.getFieldWidth(); ++j) {
                let td = document.createElement('td');
                td.className = 'game_field__cell';
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    },

    convertPosition(x, y) {
        return y * this.config.getFieldWidth() + x;
    },

    getCell(x, y) {
        return this.gameField[this.convertPosition(x, y)];
    }
}