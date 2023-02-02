// объявление переменных
const dropdown = document.querySelector('.dropdown');
const dropdownValue = document.querySelector('.dropdown__value');
const dropdownItems = [...document.getElementsByClassName('dropdown__item')];

// делаем событие на дропдаун и вызываем список
dropdown.addEventListener('click', () => {
  dropdown.querySelector(".dropdown__list").classList.toggle("dropdown__list_active");
})

// Перебираем список и делаем событие, чтоб менялся при выборе
dropdownItems.forEach(item => {
    item.addEventListener("click", (e) => {
      // предовтвратить переход
        e.preventDefault();
      // замена текста из списка
        dropdownValue.textContent = item.querySelector(".dropdown__link").textContent;
    })
});