// объявление переменных
const book = document.querySelector(".book");
const changesfontSize = document.querySelectorAll(".font-size");
const changesTextColor = document.querySelectorAll(".color");
const changesBackgroundColor = document.querySelectorAll(".bg-color");

// функция изменения font-size
function clickFontSize(e) {
  // отключение переход по ссылке
  e.preventDefault();
  // перебор и удаление активного класса
  changesfontSize.forEach((item) => item.classList.remove("font-size_active"));
  // на указанное событие добавляем активный класс
  e.currentTarget.classList.add("font-size_active");
  let size = e.currentTarget.dataset.size;
  // условие сравнения атрибутов
  if (size === "small") {
    book.classList.add("book_fs-small");
  } else if (size === "big") {
    book.classList.add("book_fs-big");
  } else {
    book.classList.remove("book_fs-small");
    book.classList.remove("book_fs-big");
  }
}

// функция изменения text color
function clickColorText(e) {
  // отключение переход по ссылке
  e.preventDefault();
  // перебор и удаление активного класса
  changesTextColor.forEach((item) => item.classList.remove("color_active"));
  // на указанное событие добавляем активный класс
  e.currentTarget.classList.add("color_active");
  // меняем по цвету текста
  let textColor = e.currentTarget.dataset.textColor;
  book.style.color = textColor;
}

// функция изменения background color
function clickColorBackground(e) {
  // отключение переход по ссылке
  e.preventDefault();
  // перебор и удаление активного класса
  changesBackgroundColor.forEach((item) => item.classList.remove("color_active"));
  // на указанное событие добавляем активный класс
  e.currentTarget.classList.add("color_active");
  // меняем по фону текста
  let bgColor = e.currentTarget.dataset.bgColor;
  book.style.background = bgColor;
}

// функция перебора клика на каждую панель
function controlPanel() {
  // вешаем событие на функцию изменения font-size
  changesTextColor.forEach((item) => {
    item.addEventListener("click", clickColorText);
  });
  // вешаем событие на функцию изменения text color
  changesfontSize.forEach((item) => {
    item.addEventListener("click", clickFontSize);
  });
  // вешаем событие на функцию изменения background color
  changesBackgroundColor.forEach((item) => {
    item.addEventListener("click", clickColorBackground);
  });
}
// вызов
controlPanel();
