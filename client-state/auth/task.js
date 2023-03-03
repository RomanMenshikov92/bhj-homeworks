// объявления переменных
const signin = document.getElementById("signin");
const signinForm = document.getElementById("signin__form");
const welcome = document.getElementById("welcome");
const userID = document.getElementById("user_id");
// парсинг из localStorage
let localStorageUserID = JSON.parse(localStorage.getItem("userID"));
// проверка на localStorage
if (localStorageUserID != null) {
  // вызов функции авторизации
  authorization(localStorageUserID);
}
// вешаем событие на отправвку формы
signinForm.addEventListener("submit", function (e) {
  // создание объекта запроса формы
  let formData = new FormData(signinForm);
  // создание объекта запроса
  let xhr = new XMLHttpRequest();
  // метод и ссылка
  let method = "POST";
  let url = "https://students.netoservices.ru/nestjs-backend/auth";
  // открытие запроса
  xhr.open(method, url, true);
  // отправка запроса
  xhr.send(formData);
  // вешаем событие на состояние запроса
  xhr.addEventListener("readystatechange", () => {
    // проверка на успешность
    if (xhr.readyState === xhr.DONE) {
      // переменная ответа сервера JSON
      let auth = JSON.parse(xhr.responseText);
      // проверка авторизации, если ОК то записываем в localStorage
      // если не ОК, то вывод сообщения об ошибке
      if (auth.success) {
        localStorage.setItem("userID", JSON.stringify(auth.user_id));
        // вызов функции авторизации
        authorization(auth.user_id);
      } else {
        // переменная на поле ввода
        let value = document.querySelectorAll(".control");
        // очистка поля ввода
        value.forEach((element) => (element.value = ""));
        // выводим сообщение об ошибки
        alert("Неверный логин/пароль");
      }
    }
  });
  // отмена действия браузера
  e.preventDefault();
});
// функция авторизации
function authorization(id) {
  // переключения класса активности форму авторизации и приветствия
  signin.classList.toggle("signin_active");
  welcome.classList.toggle("welcome_active");
  // id пользователя в блок приветствия
  userID.innerText = id;
  // добавляем кнопку деавторизации
  let signOut = document.getElementById("sign__out");
  // проверка на деавторизацию
  if (signOut) {
    // удаление кнопки деавторизации
    signOut.remove();
    // удаляем id пользователя из localStorage
    localStorage.removeItem("userID");
  } else {
    // если кнопки нет, то добавляем её
    const signOut = document.createElement("button");
    signOut.id = "sign__out";
    signOut.textContent = "Назад";
    welcome.appendChild(signOut);
    signOut.addEventListener("click", function () {
      // вызов функции авторизации
      authorization("");
    });
  }
}

