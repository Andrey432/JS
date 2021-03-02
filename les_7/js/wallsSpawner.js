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

    // Рандоное число в диапазоне
    getRandom(from, to) {
        return from + Math.random() * (to - from);
    },

    // Спавнер готов сгенерировать стену
    readyToSpawn(time) {
        return time > this.nextSpawn;
    },

    // Является ли позиция стеной
    isWallCell(pos) {
        for (const i of this.wallsList)
            if (pos.x === i.pos.x && pos.y === i.pos.y)
                return true;
        return false;
    },

    // Генерирует стену (объект с позицией и временем уничтожения)
    spawnWall(time, pos) {
        let dstTime = time + this.getRandom(...this.wallsLifeTime);
        this.nextSpawn = time + this.getRandom(...this.spawnDelay);
        this.wallsList.push({death: dstTime, pos});
    },

    // Отсеить и вернуть все стены, подлежащие уничтожению
    update(time) {
        let destroy = this.wallsList.filter((w) => time >= w.death).map((w) => w.pos);
        this.wallsList = this.wallsList.filter((w) => time < w.death);
        return destroy;
    }
}
