// объявление переменных 
const tab = [...document.getElementsByClassName("tab")];
const tabContent = [...document.getElementsByClassName("tab__content")];

// функция клика на таб
function tabClick(e) {
    // указываем на обьект и добавляем активный класс таба
    e.currentTarget.classList.add("tab_active");
    // на активных табов удаляем класс
    document.querySelector(".tab_active").classList.remove("tab_active");
    document.querySelector(".tab__content_active").classList.remove("tab__content_active");
    // на таб контент делаем связку с табом и делаем класс активным
    tabContent[tab.indexOf(e.currentTarget)].classList.add("tab__content_active");
}

// перебираем элементы и вешаем событие таба
tab.forEach(element => element.addEventListener("click", tabClick));
