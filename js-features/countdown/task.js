// simple level
// объявление переменных
let timerID = document.getElementById("timer");
let timer = timerID.textContent;
// вешаем интервал
let timerInterval = setInterval(() => {
  // если таймер меньше 0 то уменьшается на единицу
  // иначе - вывод и очистка интервала
  if (timer > 0) {
    timer = timer - 1;
    timerID.innerHTML = timer;
  } else {
    alert((timerID.innerHTML = "Вы победили в конкурсе"));
    clearInterval(timerInterval);
  }
}, 1000);

// hard level
// объявление переменных
let timerSecondID = document.getElementById("timer_second");
let timerMinuteID = document.getElementById("timer_minute");
let timerHourID = document.getElementById("timer_hour");
let timerSecond = timerSecondID.textContent;
let timerMinute = timerMinuteID.textContent;
let timerHour = timerHourID.textContent;

// функция интервала
function funcInterval() {
  // если таймер секунды меньше то уменьшаем на единицу
  if (timerSecond > 0) {
    timerSecond -= 1;
    // если на счетчике меньше 10 секунд то добавляем строку "0" к виду
    // иначе - без строки "0"
    if (timerSecond < 10) {
      timerSecondID.textContent = "0" + timerSecond;
    } else {
      timerSecondID.textContent = timerSecond;
    }
    // если таймер минуты меньше то уменьшаем на единицу
    // секунда получает число 59
  } else if (timerMinute > 0) {
    timerMinute -= 1;
    timerSecond = 59;
    // если минуты станет меньше 10 то добавляем строку "0" к виду
    // иначе - без строки "0"
    if (timerMinute < 10) {
      timerMinuteID.textContent = "0" + timerMinute;
    } else {
      timerMinuteID.textContent = timerMinute;
    }
    // если таймер часа меньше то уменьшаем на единицу
    // минута получает число 60
  } else if (timerHour > 0) {
    timerHour--;
    timerMinute = 60;
    // если на счетчике меньше 10 часов то добавляем строку "0" к виду
    // иначе - без строки "0"
    if (timerHour < 10) {
      timerHourID.textContent = "0" + timerHour;
    } else {
      timerHourID.textContent = timerHour;
    }
    // иначе - вывод о победе и переход на страницу сайта курса веб-разработчик от нетологии, очистка интервала
  } else {
    alert("Вы победили в конкурсе!");
    clearInterval(timerInterval);
    location.assign("https://netology.ru/programs/web-developer");
  }
}
// интервал
timerInterval = setInterval(funcInterval, 1000);
