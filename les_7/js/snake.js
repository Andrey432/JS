const snake = {
    body: [],
    head: null,
    direction: null,

    init(x, y) {
        this.body.push({x: x, y: y});
        this.head = this.body[0];
        this.direction = {x: 0, y: -1};
    },

    reset() {
        this.body.length = 0;
        this.head = null;
        this.direction = null;
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

    moveTo(position) {
        position = {...position};
        this.head = position;
        this.body.shift();
        this.body.push(position);
    },

    setDirection(x=this.direction.x, y=this.direction.y) {
        this.direction.x = x;
        this.direction.y = y;
    },

    eat() {
        this.body.push(this.body[0]);
    }
}