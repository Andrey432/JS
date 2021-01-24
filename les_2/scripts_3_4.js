/**
 * 3
 */
function compareRandomNumbers(a, b) {
    let res = null, signs = ((a >= 0) === (b >= 0));
    if (signs && a >= 0) {
        res = `a - b = ${a - b}`;
    } else if (signs) {
        res = `a * b = ${a * b}`;
    } else {
        res = `a + b = ${a + b}`;
    }
    return`a=${a}, b=${b}  ==>  ${res}`;
}


/**
 * 4
 */
function showA(a) {
    switch (a) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 3:
            return 3;
        case 4:
            return 4;
        case 5:
            return 5;
        case 6:
            return 6;
        case 7:
            return 7;
        case 8:
            return 8;
        case 9:
            return 9;
        case 10:
            return 10;
        case 11:
            return 11;
        case 12:
            return 12;
        case 13:
            return 13;
        case 14:
            return 14;
        case 15:
            return 15;
        default:
            return 0;
    }
}


/***********************************************************************************************/
//tests


const rnd = require('./random');

console.log(`\n№3\n${compareRandomNumbers(rnd.randint(), rnd.randint())}`);
console.log(`\n№4\na=${showA(rnd.getRandom(0, 16))}`);
