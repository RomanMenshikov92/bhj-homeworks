// объявление переменных
let progressBar = document.getElementById("progress");
let form = document.getElementById("form");
let message = document.querySelector('.input__wrapper-desc');

// вешаем событие на отправку через кнопку
form.addEventListener("submit", (e) => {
  // отмена действия браузера
  e.preventDefault();
  // создание объекта запроса формы
  let formData = new FormData(form);
  // создание объекта запроса
  let xhr = new XMLHttpRequest();
  // метод и ссылка
  let method = "POST";
  let url = "https://students.netoservices.ru/nestjs-backend/upload";
  // открытие запроса
  xhr.open(method, url);
  // вешаем событие загрузки отправки файла и изменения статуса загрузки
  xhr.upload.onprogress = (e) => (progressBar.value = e.loaded / e.total);
  // вешаем событие на полную загрузку файла
  xhr.upload.onloadend = () => {
    alert('Загрузка файла успешно отправлена');
    message.textContent = 'Загрузка успешна. Выберете другой файл';
    // сброс состояния прогресс-бара
    progressBar.value = 0;
    // сброс формы по умолчанию
    form.reset();
  };
  // отправка запроса
  xhr.send(formData);
});
