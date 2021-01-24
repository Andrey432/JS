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


/**
 * 5
 */
function sum(a, b) {
    return a + b;
}


function sub(a, b) {
    return a - b;
}


function mul(a, b) {
    return a * b;
}


function div(a, b) {
    return a / b;
}

/**
 * 6
 */

function mathOperation(a, b, op) {
    switch (op) {
        case '+':
            return sum(a, b);
        case '-':
            return sub(a, b);
        case '*':
            return mul(a, b);
        case '/':
            return div(a, b);
        default:
            return NaN;
    }
}


/**
 * 8
 */

function _power(val, pow) {
    if (pow == 0)
        return 1;
    return power(val, pow - 1) * val;
}

function power(val, pow) {
    if (pow < 0)
        return 1 / _power(val, -pow);
    return _power(val, pow);
}



/***********************************************************************************************/
//tests


/**
 * Return random integer from range [min, max)
 */
function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}


const MIN = -100, MAX = 100;


/**
 * Return random integer from range [-100, 100]
 */
function randint() {
    return getRandom(MIN, MAX + 1);
}


console.log(`\n№3\n${compareRandomNumbers(randint(), randint())}`);
console.log(`\n№4\na=${showA(getRandom(0, 16))}`);

let a = randint(), b = randint(), op = '+-*/'[getRandom(0, 4)];
console.log(`\n№6\na=${a}, b=${b}, operation='${op}'  ===>  a ${op} b = ${mathOperation(a, b, op)}`);

let val = randint(), pow = getRandom(-10, 10);
console.log(`\n№8\na=${val}, pow=${pow}  ===>  a^pow = ${power(val, pow)}`);
