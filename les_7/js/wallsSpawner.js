const wallsSpawner = {
    wallsList: [],
    nextSpawn: null,
    spawnDelay: null,
    wallsLifeTime: null,

    init(spawnDelay, wallsLifeTime) {
        this.wallsLifeTime = wallsLifeTime;
        this.spawnDelay = spawnDelay;
        this.nextSpawn = this.getRandom(...this.spawnDelay);
    },

    reset() {
        this.wallsList.length = 0;
        this.nextSpawn = this.getRandom(...this.spawnDelay);
    },

    getRandom(from, to) {
        return from + Math.random() * (to - from);
    },

    readyToSpawn(time) {
        return time > this.nextSpawn;
    },

    isWallCell(pos) {
        for (const i of this.wallsList)
            if (pos.x === i.pos.x && pos.y === i.pos.y)
                return true;
        return false;
    },

    spawnWall(time, pos) {
        let dstTime = time + this.getRandom(...this.wallsLifeTime);
        this.nextSpawn = time + this.getRandom(...this.spawnDelay);
        this.wallsList.push({death: dstTime, pos});
    },

    update(time) {
        let destroy = this.wallsList.filter((w) => time >= w.death).map((w) => w.pos);
        this.wallsList = this.wallsList.filter((w) => time < w.death);
        return destroy;
    }
}
