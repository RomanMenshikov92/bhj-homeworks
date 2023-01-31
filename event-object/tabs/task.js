// объявление переменных 
const tab = [...document.getElementsByClassName("tab")];
const tabContent = [...document.getElementsByClassName("tab__content")];

// функция клика на таб
function tabClick(e) {
    // указываем на обьект и добавляем активный класс таба
    e.currentTarget.classList.add("tab_active");
    // на активных табов удаляем класс c проверкой является ли возвращаемый объект null
    const activeTab = document.querySelector(".tab_active");
    if (activeTab) { activeTab.classList.remove("tab_active"); }
    const activeTabContent = document.querySelector(".tab__content_active");
    if (activeTabContent) { activeTabContent.classList.remove("tab__content_active"); }
    // на таб контент делаем связку с табом и делаем класс активным
    tabContent[tab.indexOf(e.currentTarget)].classList.add("tab__content_active");
}

// перебираем элементы и вешаем событие таба
tab.forEach(element => element.addEventListener("click", tabClick));
