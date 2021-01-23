/**
* 1
*/

const CELSIUS = 232.78;


function Celsius2Fahrenheit(celsius) {
    return celsius * 9 / 5 + 32; 
}

let msg = `${CELSIUS}C => ${Celsius2Fahrenheit(CELSIUS)}F`
alert(msg);


/**
* 2
*/

let name = 'Василий';
{
    var admin = name;
}
alert(admin);
console.log(admin);
