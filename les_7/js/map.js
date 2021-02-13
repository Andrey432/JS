const map = {
    gameField: [],
    width: null,
    height: null,

    init(container, cellCls, rows, columns) {
        this.width = rows;
        this.height = columns;
        this.createTable(container, cellCls);
    },

    reset(cellCls) {
        for (const i of this.gameField) {
            i.className = cellCls;
        }
    },

    createTable(tableContainer, cellCls) {
        let table = document.createElement('table');
        table.className = 'game_field';
        tableContainer.appendChild(table);

        for (let i = 0; i < this.height; ++i) {
            let tr = document.createElement('tr');
    
            for (let j = 0; j < this.width; ++j) {
                let td = document.createElement('td');
                td.className = cellCls;
                this.gameField.push(td);
                tr.appendChild(td);
            }

            table.appendChild(tr);
        }
    },

    convertPosition(x, y) {
        return y * this.width + x;
    },

    getCell(x, y) {
        return this.gameField[this.convertPosition(x, y)];
    },

    toggleCellClass(x, y, cls) {
        let cell = this.getCell(x, y);
        cell.classList.toggle(cls);
    },

    isEmptyCell(x, y) {
        return this.getCell(x, y).classList.length === 1;
    }
}