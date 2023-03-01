// объявление переменных
let pollTitle = document.getElementById("poll__title");
let pollAnswers = document.getElementById("poll__answers");

// создание объекта запроса
let xhr = new XMLHttpRequest();
// метод запроса
let method = "GET";
// ссылка запроса
let url = "https://students.netoservices.ru/nestjs-backend/poll";
// открытие и отправка запроса
xhr.open(method, url);
xhr.send();

// вешаем событие на состояние запроса
xhr.addEventListener("readystatechange", () => {
  // если состояние запроса успешно
  if (xhr.readyState === xhr.DONE) {
    // переменные ответа сервера JSON
    let listJSON = JSON.parse(xhr.responseText);
    let title = listJSON.data.title;
    let answers = listJSON.data.answers;
    window.id = listJSON.id;
    // переменная на кнопки
    let buttons = "";
    // проходим по циклу и находим кнопки и задаем разметку в DOM
    for (let answer of answers) {
      buttons += `<button class="poll__answer">${answer}</button>`;
    }
    // заменяем на существующие
    pollAnswers.innerHTML = buttons;
    pollTitle.innerText = title;
  }
});
// вешаем событие на клик
document.addEventListener("click", (e) => {
  // объект события
  let { target } = e;
  // проверка содержит ли элемент внутри, если да то задаем переменную поо классу
  // выводим окно alert с сообщением
  if (target.classList.contains("poll__answer")) {
    let answers = pollAnswers.getElementsByClassName("poll__answer");
    alert("Спасибо, ваш голос засчитан!");
    // проходим по циклу и задаем каждую кнопку активную
    for (let button of answers) {
      button.disabled = false;
    }
    // проверка поиска кнопок
    let index = [...answers].indexOf(target);
    // вызов функции на следующий новый запрос с параметрами
    requestPollResult(id, index);
  }
});
// функция на новый запрос с параметрами
function requestPollResult(id, index) {
  // создание объекта запроса, метода и ссылки
  let xhr = new XMLHttpRequest();
  let method = "POST";
  let url = "https://students.netoservices.ru/nestjs-backend/poll";
  // открытие запроса
  xhr.open(method, url);
  // установка значения заголовков
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // вешаем событие на полную загрузку
  xhr.addEventListener("load", () => {
    // парсинг из ответа сервера
    let stat = JSON.parse(xhr.responseText).stat;
    // вызов функции на показ результата опроса
    showPollResult(stat);
  });
  // отправка запроса
  xhr.send(`vote=${id}&answer=${index}`);
}
// функция показа результат опроса
function showPollResult(result) {
    // переменная на общий подсчет голосов 
  let totalVotes = 0;
  // проходим по циклу и перебираем каждый голос и прибавляем в общий
  for (let item of result) {
    totalVotes += item.votes;
  }
  // переменная готового списка подсчета голосов
  let resultList = "";
  // проходим по циклу и перебираем и ставим полный результат в разметку DOM
  for (let item of result) {
    resultList += `<div>${item.answer}: <span>${+((item.votes / totalVotes) * 100).toFixed(2)} %</span></div>`;
  }
  // заменяем на полный результат опроса
  pollAnswers.innerHTML = resultList;
}
