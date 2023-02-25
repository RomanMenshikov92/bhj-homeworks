// обьявление класса с конструктором
class toolTips {
  constructor(container) {
    this.container = container;
    this.registerEvents();
  }

  // добавляем метод клика активного тултипа
  registerEvents() {
    this.container.addEventListener("click", (e) => {
      // запрет на переход
      e.preventDefault();
      // условие проверки если обьект элемента тултипа находтся в родителе
      // то следующее усоловие проверки если объект элемента активного тултипа находится в родителе
      // то удаляем класс
      // иначе удаляем и добавляем обьект тултипа
      if (
        e.target.nextElementSibling &&
        e.target.nextElementSibling.classList.contains("tooltip")
      ) {
        if (e.target.nextElementSibling.classList.contains("tooltip_active")) {
          this.deleteTooltip();
        }
      } else {
        this.deleteTooltip();
        this.addTooltip(e.target);
      }
    });
  }

  // добавляем метод добавления тултипа
  addTooltip(target) {
    // создаем элемент тултипа
    const tooltip = document.createElement("div");
    // добавляем класс к элементу
    tooltip.classList.add("tooltip");
    tooltip.classList.add("tooltip_active");
    // добавляем к тултипу текст из атрибута title
    tooltip.innerText = target.title;

    target.after(tooltip);

    this.locationTooltip();
    window.addEventListener("scroll", (e) => this.locationTooltip());
  }

  // добавляем метод удаления тултипа
  deleteTooltip() {
    // переменная на тултип
    const tooltip = document.querySelector(".tooltip");
    // условие если тултип то удаляем и вешаем событие скролл
    if (tooltip) {
      tooltip.remove();
      window.removeEventListener("scroll", (e) => this.locationTooltip());
    }
  }

  // добавляем метод позиции тултипа
  locationTooltip() {
    // переменная на тултип
    let tooltip = document.querySelector(".tooltip");
    // условие с позицией
    if (tooltip) {
      // переменная на предыдущий тултип и тултип местоположения
      let target = tooltip.previousSibling;
      let targetPosition = target.getBoundingClientRect();
      //   условие, если у ссылок датасет позиции равно или топ или лефт или райт или боттом
      if (target.dataset.position === "top") {
        tooltip.style.top =
          targetPosition.top - targetPosition.height - 10 + "px";
        tooltip.style.left = targetPosition.x + targetPosition.width / 2 + "px";
        tooltip.style.transform = "translateX(-50%)";
      } else if (target.dataset.position === "bottom") {
        tooltip.style.top = targetPosition.top + targetPosition.height + "px";
        tooltip.style.left = targetPosition.x + targetPosition.width / 2 + "px";
        tooltip.style.transform = "translateX(-50%)";
      } else if (target.dataset.position === "left") {
        tooltip.style.top = targetPosition.top - 5 + "px";
        tooltip.style.left = targetPosition.x + "px";
        tooltip.style.transform = "translateX(-100%)";
      } else if (target.dataset.position === "right") {
        tooltip.style.top = targetPosition.top - 5 + "px";
        tooltip.style.left = targetPosition.x + targetPosition.width + "px";
      } else {
        tooltip.style.top = targetPosition.top + targetPosition.height + "px";
        tooltip.style.left = targetPosition.x + targetPosition.width / 2 + "px";
        tooltip.style.transform = "translateX(-50%)";
      }
    }
  }
}
// функция клика тултипа
function clickTooltip() {
  // вешаем событие клика в глобальном области видимости
  window.addEventListener("click", (e) => {
    // условие если не содержит ли элемент внутри родителя
    // то тултип удаляется
    if (!e.target.classList.contains("has-tooltip")) {
      // переменная на тултип
      const tooltip = document.querySelector(".tooltip");
      if (tooltip) {
        tooltip.remove();
      }
    }
  });
  // перебираем по циклу каждую ссылку тултипа и выводит тултипы
  for (let toolTip of document.querySelectorAll(".has-tooltip")) {
    new toolTips(toolTip);
  }
}
// вызов
clickTooltip();
