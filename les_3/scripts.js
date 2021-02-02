'use strict';


function getPtrimeNumbers(limit) {
    limit++;  // N-ый элемент включается в массив

    const numbers = Array.from({length: limit}, () => true);    // Нашёл на stackovervlow способ инициализации дефолтными значениями
    const prime = [];  // Буфер, дабы не фильтровать элементы на выходе

    let counter = 2;

    while (counter < limit) {
        if (numbers[counter]) {
            prime.push(counter);
            for (let i = counter * 2; i < limit; i += counter)
                numbers[i] = false;
        }
        counter++;
    }

    return prime;
}


/**
 * 2
 */
let cart = [
    ['item1', 3, 65334],
    ['item2', 7, 7523],
    ['item3', 1, 83545753],
    ['item4', 79, 872]
]


function countBasketPrice(cart) {
    return cart.reduce((current, item) => current + item[2] * item[1], 0);
}


/**
 * 3
 */

function printNumbers(rows) {
    for (let i = 1; i <= rows; console.log(i++)) {}
}


/**
 * 4
 */
function printPyramid(rows) {
    // в доках накопал, что если передать 1-ой f-строку, то в неё console.log подставит следующие элементы
    // создать массив [*, **, ***, ****, ... , '*' * rows]
    // распаковать его в отдельные элементы
    // и подставить в на ходу сгенерированную строку '%s\n' * rows

    let counter = 0;
    console.log('%s\n'.repeat(rows),
                ...Array.from({length: rows}, () => '*'.repeat(++counter))
    );
    // Страшная вещь
}


/***********************************************************/
//tests

function test(task, hint, func, ...args) {
    console.log(`№${task} ${hint}`);
    console.log(`ans:\n${func(...args)}`);
}


let limit = 100;
test(1, `limit=${limit}`, getPtrimeNumbers, limit);

test(2, '', countBasketPrice, cart);

let max = 9;
test(3, '', printNumbers, max);

let rows = 20;
test(4, '', printPyramid, rows);
