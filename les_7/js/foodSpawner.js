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

    getFoodList() {
        return this.foodList;
    },

    spawnFood(position) {
        this.foodList.push({...position});
    },

    removeFood(position) {
        let ind = this.foodList.findIndex((i) => position.x === i.x && position.y === i.y);
        this.foodList.splice(ind, 1);
    }
}