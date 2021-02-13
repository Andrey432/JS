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

    reset() {
        for (const i of this.gameField) {
            i.className = this.defaultCellClass;
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

    getCell(pos) {
        return this.gameField[pos.y * this.width + pos.x];
    },

    setCellClass(pos, cls) {
        let cell = this.getCell(pos);
        if (!cell.classList.contains(cls)) {
            cell.className = this.defaultCellClass;
            cell.classList.add(cls);
        }
    },

    resetCell(pos) {
        this.getCell(pos).className = this.defaultCellClass;
    },

    isEmptyCell(pos) {
        let cell = this.getCell(pos);
        return cell.classList.length === 1 && cell.classList.contains(this.defaultCellClass);
    }
}