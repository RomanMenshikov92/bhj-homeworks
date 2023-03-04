// объявление переменных
const card = document.querySelector(".card"); // ищем куда вставить кнопку
const editor = document.getElementById("editor"); // окно ввода
// создание элемента кнопки для очистки текста
const btnClear = document.createElement("button");
btnClear.id = "btn__clear";
btnClear.textContent = "Очистка текста";
card.appendChild(btnClear);
// парсинг из localStorage
let textLocalStorage = localStorage.getItem("textarea");
// проверка на localStorage
if (textLocalStorage) {
  editor.value = textLocalStorage;
}
// вешаем событие на ввод текста в окне и сохраняем запись в localStorage
editor.addEventListener("input", function () {
  localStorage.setItem("textarea", editor.value);
});
// вешаем событие на клик очистки текста
btnClear.addEventListener("click", function () {
  // очистка текста в окне
  editor.value = "";
  // удаляем textarea из localStorage
  localStorage.removeItem("textarea");
});
