const foodSpawner = {
    foodList: [],
    maxFood: 0,

    init(foodLimit) {
        this.maxFood = foodLimit;
    },

    isNotFilled() {
        return this.maxFood > this.foodList.length;
    },
    
    isFoodCell(position) {
        for (const i of this.foodList) {
            if (position.x === i.x && position.y === i.y)
                return true;
        }
        return false;
    },

    spawnFood(position) {
        this.foodList.push({...position});
    },

    removeFood(position) {
        this.foodList.splice(this.foodList.find(position), 1);
    }
}