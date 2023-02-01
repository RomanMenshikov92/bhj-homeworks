// объявление переменных с перебираемым массивом на меню линк
const menuLink = Array.from(document.querySelectorAll('.menu__link'));
// объявление переменной, где будем указывать последнее активное меню
let lastActiveMenu;
// проходим по циклу
for (let i = 0; i < menuLink.length; i++) {
  // назначаем событие клика на меню
  menuLink[i].onclick = function () {
    // создаем саб меню и указываем меню айтем на ближайший родительский элемент меню саб
        const menuSub = this.closest('.menu__item').querySelector('.menu_sub');
        // условие, если меню саб, то
        if (menuSub) {
          // если саб меню не равно двум активных меню то удаляем класс
            if (menuSub != lastActiveMenu && lastActiveMenu) {
                lastActiveMenu.classList.remove('menu_active');
            }
            // переключаем на активный
            menuSub.classList.toggle('menu_active');
            // последнее активное меню присваиваем меню саб
            lastActiveMenu = menuSub;
            //возврат на предотвращение действия браузера
            return false;
        }
    };
}