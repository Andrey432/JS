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
   
    // Устанавливает всем ячейкам исходный класс
    reset() {
        for (const i of this.gameField) {
            i.className = this.defaultCellClass;
        }
    },

    // Генерация таблицы на странице
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

    // Возвращает ячеку, соответствующую позиции, переводя координаты для 1-мерного массива
    getCell(pos) {
        return this.gameField[pos.y * this.width + pos.x];
    },

    // Устанавливает ячейке определённый класс
    setCellClass(pos, cls) {
        let cell = this.getCell(pos);
        if (!cell.classList.contains(cls)) {
            cell.className = this.defaultCellClass;
            cell.classList.add(cls);
        }
    },

    // Устанавливает ячейке исходный класс
    resetCell(pos) {
        this.getCell(pos).className = this.defaultCellClass;
    },

    // Проверка, что ячейка содержит только исходный класс
    isEmptyCell(pos) {
        let cell = this.getCell(pos);
        return cell.classList.length === 1 && cell.classList.contains(this.defaultCellClass);
    }
}