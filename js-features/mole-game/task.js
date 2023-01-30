// объявление переменных
let moleIsKilled = document.getElementById('dead');
let moleIsSurvived = document.getElementById('lost');
let victory = parseInt(moleIsKilled.textContent);
let defeat = parseInt(moleIsSurvived.textContent);
// возвращаемое ID поле, где появляется крот
let getHole = index => document.getElementById(`hole${index}`);
// функция проверки 
function checkGame(moleIsKilled, moleIsSurvived) {
    // если убито 10 кротов - победа
    // если промах 5 раз - поражение
    if (moleIsKilled === 10) {
        alert("Победа!");
        // обновление страницы
        location.reload();
    } else if (moleIsSurvived === 5) {
        alert("Поражение!");
        // обновление страницы
        location.reload();
    };
};
// цикл от 1 до 9 лунок проходим, для каждой лунки делаем обработчик событий onclick
// условие проверки если попавший крот то +1 победы
// если мимо то +1 поражения
for (let i = 1; i <= 9; i++) {
    getHole(i).onclick = function () {
        if (this.className.includes('hole_has-mole')) {
            victory += 1;
            moleIsKilled.textContent = victory;
        } else {
            defeat += 1;
            moleIsSurvived.textContent = defeat;
        };
        // вызов функции условия выигрыша и проигрыша
        checkGame(victory, defeat);
    };
};

