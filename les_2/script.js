/**
 * Return random integer from range [min, max)
 */
function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}


/**
* 3
*/
function CompareRandomNumbers(a, b) {
    let res = null, signs = ((a >= 0) === (b >= 0));
    if (signs && a >= 0) {
        res = `a - b = ${a - b}`;
    } else if (signs) {
        res = `a * b = ${a * b}`;
    } else {
        res = `a + b = ${a + b}`;
    }
    let msg = `a=${a}, b=${b} => ${res}`;
    console.log(msg);
}


/**
* 4
*/
function ShowA(a) {
    let res = null;
    switch (a <= 15) {
        case true:
            res = a;
    }
    if (res === a) {
        console.log(`a < 15 => ${a}`);
    }
}


const MIN = -100, MAX = 100;

CompareRandomNumbers(getRandom(MIN, MAX), getRandom(MIN, MAX));
ShowA(getRandom(0, 16));
