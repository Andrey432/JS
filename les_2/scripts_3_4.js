'use strict'

/**
 * 3
 */
function compareRandomNumbers(a, b) {
    let res = null;
    if (a >= 0 && b >= 0) {
        res = `a - b = ${a - b}`;
    } else if (a < 0 && b < 0) {
        res = `a * b = ${a * b}`;
    } else {
        res = `a + b = ${a + b}`;
    }
    return`a=${a}, b=${b}  ==>  ${res}`;
}


/**
 * 4
 */
function showList(a) {
    switch (a) {
        case 0:
            console.log(a++);
        case 1:
            console.log(a++);
        case 2:
            console.log(a++);
        case 3:
            console.log(a++);
        case 4:
            console.log(a++);
        case 5:
            console.log(a++);
        case 6:
            console.log(a++);
        case 7:
            console.log(a++);
        case 8:
            console.log(a++);
        case 9:
            console.log(a++);
        case 10:
            console.log(a++);
        case 11:
            console.log(a++);
        case 12:
            console.log(a++);
        case 13:
            console.log(a++);
        case 14:
            console.log(a++);
        case 15:
            console.log(a++);
    }
}


/***********************************************************************************************/
//tests


const rnd = require('./random');

console.log(`\n№3\n${compareRandomNumbers(rnd.randint(), rnd.randint())}`);

let a = rnd.getRandom(0, 16);
console.log(`\n№4\na=${a}`);
showList(a);
