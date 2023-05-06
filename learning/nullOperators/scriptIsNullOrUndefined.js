'use strict';

//Es11 2020
//? Оператор нулевого слияния (nullish operator |nullish  coalaesing) - ?? - возвращает значениe справа если значение слева null или undefined
//? Приоритет ниже чем у лог. "ИЛИ" и лог. "И"
//? "??" оператор не может быть использован в одном выражении с лог. "И" или лог "ИЛИ"

const box = document.querySelector('.box');

const newHeight = 200;
const newWidth = 400;

function changeParams(elem, h, w) {
    elem.style.height = `${h ?? 200}px`;
    elem.style.width = `${w ?? 200}px`;
    elem.innerHTML = (h ?? 200) * (w ?? 200);
}

changeParams(box, newHeight, newWidth);

let userName = undefined;
let userKey = null;
// let userKey = 'I am not null and not undefined';
console.log(userName ?? userKey ?? 'defaultUser');