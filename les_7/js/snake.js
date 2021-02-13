const snake = {
    body: [],
    head: null,
    direction: null,
    turnFlag: false,

    init(x, y) {
        this.body.push({x: x, y: y});
        this.head = this.body[0];
        this.direction = {x: 0, y: -1};
        this.turnFlag = false; 
    },

    reset() {
        this.body.length = 0;
        this.head = null;
        this.direction = null;
        this.turnFlag = false; 
    },

    length() {
        return this.body.length;
    },

    getNextStep() {
        let point = {...this.head};
        point.x += this.direction.x;
        point.y += this.direction.y;
        return point;
    },

    getHead() {
        return {...this.head};
    },

    getLast() {
        return {...this.body[0]};
    },

    moveTo(position, deleteEnd) {
        position = {...position};
        this.head = position;
        if (deleteEnd)
            this.body.shift();
        this.body.push(position);
        this.turnFlag = false;
    },

    setDirection(x, y) {
        if (this.turnFlag)
            return;
        this.turnFlag = true;
        if (this.direction.x * -1 !== x)
            this.direction.x = x;
        if (this.direction.y * -1 !== y)
            this.direction.y = y;
    },

    getBody() {
        return this.body;
    },

    isSnakeBody(pos) {
        for (const i of this.body)
            if (i.x === pos.x && i.y === pos.y)
                return true;
        return false;
    },

    cut(pos) {
        let index = this.body.findIndex((i) => i.x === pos.x && i.y === pos.y);
        return this.body.splice(0, index + 1);
    }
}