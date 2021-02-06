'use strict';


class Chess { 
    constructor(settings) {
        this.settings = settings;
        this.table = [];
        this.body = null;
        this.genTable();
    }

    genTable() {
        let table = document.createElement('table');
        let tsize = this.settings.tableSize;

        table.classList.add('chess_table');

        for (let i = 0; i <= tsize + 1; ++i) {
            let tr = document.createElement('tr');
            for (let j = 0; j <= tsize + 1; ++j) {
                let cell = this.createCell(i, j);
                if (!this.isRowHeader(i, j) && !this.isColumnHeader(i, j))
                    this.table.push(cell);
                tr.appendChild(cell);
            }
            table.appendChild(tr);
        }

        let header = document.createElement('h1');
        header.textContent = 'CHESS';

        let body = document.createElement('div');
        body.appendChild(header);
        body.appendChild(table);
        this.body = body;
    }

    getBody() {
        return this.body;
    }

    isRowHeader(row, column) {
        let tsize = this.settings.tableSize;
        return ((column === 0 || column === tsize + 1) && row > 0);
    }

    isColumnHeader(row, column) {
        let tsize = this.settings.tableSize;
        return ((row === 0 || row === tsize + 1) && column > 0);
    }

    createCell(row, column) {
        let td = document.createElement('td');
        let tsize = this.settings.tableSize;
        td.classList.add('chess_cell');
        
        if (row > 0 && column > 0 && row <= tsize && column <= tsize) {
            let cell = (row % 2 != column % 2) ? 'chess_cell__black' : 'chess_cell__white'
            td.classList.add(cell);
        }
        else {
            td.classList.add('chess_cell__border');
        }

        td.textContent = this.genContent(row, column);
        return td;
    }

    genContent(row, column) {
        let tsize = this.settings.tableSize;
        let figures = this.settings.figures;
        let headers = this.settings.headers;
        
        if (this.isRowHeader(row, column))
            return headers.vertical[tsize - row];
        if (this.isColumnHeader(row, column))
            return headers.horizontal[column - 1];

        switch (row) {
            case 1:
                return figures[column - 1];
            case tsize:
                return figures[tsize - column];
            case 2:
            case tsize - 1:
                return 'p';
            default:
                return '';
        }
    }

    run() {
        this.genTable();
    }
}
