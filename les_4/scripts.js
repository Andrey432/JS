'use strict';


/**
 * 1
 */

function getInfo(number) {
    if (number < 0  || number > 999) {
        console.log('Дано число не в диапазоне [0...999]');
        return {};
    }

    return {
        'сотни': Math.floor(number / 100),
        'десятки': Math.floor(number / 10 % 10),
        'единицы': Math.floor(number % 10)
    }
}

let min = -200, max = 1400, num = Math.floor(min + Math.random() * (max - min));
console.log(`number = ${num}  >>>  result:`, getInfo(num));


console.log(`\n${'*'.repeat(20)}\n`);


/**
 * 2
 */

const cart = {
    products: [
        {
            name: 'item1',
            quantity: 4,
            price: 4999
        },
        {
            name: 'item2',
            quantity: 10,
            price: 500
        },
        {
            name: 'item3',
            quantity: 6,
            price: 1200
        },
        {
            name: 'item4',
            quantity: 1,
            price: 78800
        },
    ],

    countProductsPrice() {
        return this.products.reduce((current, item) => current + item.quantity * item.price, 0);
    }
}

console.log(`Total cart price: ${cart.countProductsPrice()}`);
