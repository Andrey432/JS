const map = {
    gameField: [],
    defaultCellClass: null,
    width: null,
    height: null,

    init(container, tableClass, cellClass, rows, columns) {
        this.width = rows;
        this.height = columns;
        this.defaultCellClass = cellClass;
        this.createTable(container, tableClass);
    },

    reset(cellCls) {
        for (const i of this.gameField) {
            i.className = cellCls;
        }
    },

    createTable(tableContainer, tableClass) {
        let table = document.createElement('table');
        table.className = tableClass;
        tableContainer.appendChild(table);

        for (let i = 0; i < this.height; ++i) {
            let tr = document.createElement('tr');
    
            for (let j = 0; j < this.width; ++j) {
                let td = document.createElement('td');
                td.className = this.defaultCellClass;
                this.gameField.push(td);
                tr.appendChild(td);
            }

            table.appendChild(tr);
        }
    },

    getCell(x, y) {
        return this.gameField[y * this.width + x];
    },

    setCellClass(x, y, cls) {
        this.resetCell(x, y);
        this.getCell(x, y).classList.add(cls);
    },

    resetCell(x, y) {
        this.getCell(x, y).className = this.defaultCellClass;
    },

    isEmptyCell(x, y) {
        return this.getCell(x, y).classList.length === 1;
    }
}