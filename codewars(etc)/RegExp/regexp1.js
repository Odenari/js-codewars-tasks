// const findL = new RegExp('l', 'ig');
const findL = /L/g;
const str = 'heLlo WorLd, 2024 are gonna be wild!';

//search, match and replace are methods of string regexp in arguments
console.log(str.search(findL));

let lL = str.match(findL);
console.log('🚀 ~ file: regexp1.js:4 ~ lL:', lL);

console.log(str.replace(/o/g, '$'));

//Those methods are belong to RegExp > test(), 
console.log(/w/.test(str));

/**
 * \d - only digits
 * \w - only words
 * \s - only spaces
 */

console.log(str.match(/\d/g).join(''));