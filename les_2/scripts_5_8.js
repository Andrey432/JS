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


const rnd = require('./random');

let a = rnd.randint(), b = rnd.randint(), op = '+-*/'[rnd.getRandom(0, 4)];
console.log(`\n№6\na=${a}, b=${b}, operation='${op}'  ===>  a ${op} b = ${mathOperation(a, b, op)}`);

let val = rnd.randint(), pow = rnd.getRandom(-10, 10);
console.log(`\n№8\na=${val}, pow=${pow}  ===>  a^pow = ${power(val, pow)}`);
