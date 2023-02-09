// событие в DOM
document.addEventListener("DOMContentLoaded", () => {
    // объявление переменной
    const reveal = document.querySelectorAll(".reveal");
    // функция распознавания вида с объектом е
    const isView = (e) => {
      // свойство возвращает высоту видимой области
      const viewHeight = window.innerHeight;
      // метод на событие, получивший положение элемента сверху
      const elementTop = e.getBoundingClientRect().top;
      // возврат с условием
      return elementTop < viewHeight && elementTop > 0;
    };
    // событие при скроле в глобальной видимости
    window.addEventListener("scroll", () => {
      // цикл, находивший по элементу reveal
      //если видим элемент то добавляем активный класс
      // иначе удаляем активный класс
      for (let next of reveal) {
        isView(next)
          ? next.classList.add("reveal_active")
          : next.classList.remove("reveal_active");
      }
    });
  });
  