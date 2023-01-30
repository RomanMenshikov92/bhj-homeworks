// simple + hard level
// объявление переменных
const imgCookie = document.getElementById("cookie");
const count = document.getElementById("clicker__counter");
const speed = document.getElementById("clicker__speed");
// переменная на последний клик с нуля
let lastClick = 0;
// функция 
function funcCookie() {
    // увеличиваем на единицу
    count.textContent = parseInt(count.textContent) + 1;
    // если четное число то уменьшаем картинку
    // иначе - увеличиваем
    if (count.textContent % 2 === 0) {
        imgCookie.width = 300;
    } else {
        imgCookie.width = 350;
    }
    // объявление переменной типа new data() c методом gettime()
    let dataTime = new Date().getTime();
    // делаем среднее значение скорости клика
    let t = (dataTime - lastClick) / 1000;
    // получаем ответ и с форматом с 2 фиксированными 2 запятыми
    speed.textContent = (1 / t).toFixed(2);
    // присваиваем на тип data
    lastClick = dataTime;
}
// делаем обработчик событий на onclick
imgCookie.onclick = funcCookie;