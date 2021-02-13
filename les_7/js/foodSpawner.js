const foodSpawner = {
    foodList: [],
    maxFood: 0,

    init(foodLimit) {
        this.maxFood = foodLimit;
    },

    isNotFilled() {
        return this.maxFood > this.foodList.length;
    }
}