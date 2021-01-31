'use strict'

// Я тут успел попасть на JS2 раньше, чем на JS)

const MIN = -100, MAX = 100;


/**
 * Return random integer from range [min, max)
 */
function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}


/**
 * Return random integer from range [-100, 100]
 */
function randint() {
    return getRandom(MIN, MAX + 1);
}


module.exports = {
    getRandom: getRandom,
    randint: randint
}
