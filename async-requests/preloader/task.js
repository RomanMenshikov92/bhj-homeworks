// Объявление переменных
let loader = document.getElementById("loader");
let items = document.getElementById("items");

// // парсинг из localStorage
// let localStorageCurrency = JSON.parse(localStorage.getItem("valute"));

// создание объекта запроса
let xnr = new XMLHttpRequest();

// проверка на localStorage
// if (localStorageCurrency != null) {
//   // удаляет класс активности
//   loader.classList.remove("loader_active");
//   // перебираем через цикл
//   for (let currency in localStorageCurrency) {
//     // вызов функции на разметку в DOM
//     showExchangeRate(localStorageCurrency[currency]);
//   }
// }

// метод запроса
let method = "GET";
// ссылка запроса
let url = "https://students.netoservices.ru/nestjs-backend/slow-get-courses";
// открытие и отправвка запроса
xnr.open(method, url);
xnr.send();
// вешаем событие на состояние запроса
xnr.addEventListener("readystatechange", () => {
  // если состояние запроса успешно
  // то удаляем класс активности
  if (xnr.readyState === xnr.DONE) {
    loader.classList.remove("loader_active");
    // переменные на json ответа сервера
    let currencyListJSON = JSON.parse(xnr.responseText);
    let pathListCurrency = currencyListJSON.response.Valute;

    // // запись valute в localStorage
    // let localData = JSON.stringify(pathListCurrency);
    // localStorage.setItem("valute", localData);

    // очистка страницы от курсов валют
    items.innerHTML = "";
    // перебираем через цикл и находим каждый ключ и значение
    for (let currency in pathListCurrency) {
      // console.log(pathListCurrency[currency]);
      // вызов функции на показ в DOM дереве с параметрами
      showExchangeRate(pathListCurrency[currency]);
    }
  }
});

// функция построение DOM с параметрами ключ и значение
function showExchangeRate(value) {
  let addMarkup = `
  <div class="item">
      <div class="item__code">
          ${value.CharCode}
      </div>
      <div class="item__value">
          ${value.Value}
      </div>
      <div class="item__currency">
          руб.
      </div>
  </div>
  `;
  // добавляем разметку в DOM
  items.insertAdjacentHTML("afterBegin", addMarkup);
}
