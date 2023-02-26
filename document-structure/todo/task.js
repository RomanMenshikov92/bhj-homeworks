// обьявление переменных
let input = document.getElementById("task__input");
let btn = document.getElementById("tasks__add");
let list = document.getElementById("tasks__list");

// функция добавления список дел
function addHTMLTask(text) {
  // разметка
  let task = `
    <div class="task">
        <div class="task__title">
            ${text}
        </div>
        <a href="#" class="task__remove">&times;</a>
    </div>`;
  // добавляем список дел в начале листа
  list.insertAdjacentHTML("afterBegin", task);
}

// функция удаление список дел
function deleteBtnTask() {
  // переменная на элемент удаления крестика
  let taskRemove = list.querySelectorAll(".task__remove");
  // вешаем событие на клик закрытия
  taskRemove[0].addEventListener("click", (e) => {
    // запрет на переход
    e.preventDefault();
    // проверка на кнопку крестика является элемент task родителем для кнопки task_remove
    let task = taskRemove[0].closest(".task");
    // текст списка дел
    let taskText = task.querySelector(".task__title").innerText;
    // обновляем localStorage
    updateLocalStorage(null, taskText);
    // удаление списка дел
    task.remove();
  });
}

// вешаем событие - клик по кнопке
btn.addEventListener("click", function (e) {
  // клик по кнопке
  e.preventDefault(); // отмена стандартного действия
  // условие если инут непустой то вызываем функции добавления списка дел и
  // обновления localStorage и удаления списка дел через кнопку
  if (input.value.trim()) {
    addHTMLTask(input.value);
    updateLocalStorage(input.value, null);
    deleteBtnTask();
    // очищаем поле ввода
    input.value = "";
  }
});

// обновляем базу данных в localStorage из двух параметров добавления и удаления списка дел
function updateLocalStorage(taskAdd, taskDel) {
  // переменная на парсинг text из localStorage
  let text = JSON.parse(localStorage.getItem("texts"));
  // условие если парсинговый текст не пустой и параметр добавления тоже не пустой то пушим массив
  // условие если парсинговый текст пустой и параметр добавления не пустой то создаем массив
  // условие если парсинговый текст не пустой и параметр удаленияне пустой то удаляем из массива
  if (text != null && taskAdd != null) {
    text.push(taskAdd);
  } else if (text === null && taskAdd != null) {
    text = [taskAdd];
  } else if (text != null && taskDel != null) {
    text.splice(text.indexOf(taskDel), 1);
  }
  // перезаписываем texts в localStorage
  localStorage.setItem("texts", JSON.stringify(text));
}

// функция парсинга
function parseTexts() {
  // переменная, где будем делать парсинг texts из localStorage
  let localStorageJSON = JSON.parse(localStorage.getItem("texts"));
  // условие если localStorage есть, то циклом перебираем и добавляем список дел из texts в DOM
  // и делаем вызов функции удаления списка задач при клике на крест
  if (localStorageJSON) {
    for (let i = 0; i < localStorageJSON.length; i++) {
      addHTMLTask(localStorageJSON[i]);
      deleteBtnTask();
    }
  }
}
// вызов функции парсинга
parseTexts();
