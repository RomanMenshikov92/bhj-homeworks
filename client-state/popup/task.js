// объявление переменных
let modal = document.getElementById("subscribe-modal");
let modalClose = modal.querySelector(".modal__close");
// проверка на куки, если нету в модалке куки
// то показываем модалку
if (getCookie("modal") != "true") {
  modal.classList.add("modal_active");
}
// вешаем событие на клик закрытия модалки
modalClose.addEventListener("click", function () {
  // запись в куки
  document.cookie = "modal=true";
  // удаление активной модалки
  modal.classList.remove("modal_active");
});
// функция поиска значении в куках
function getCookie(key) {
  // проверка на куки, если нет то возвращаем null
  if (!document.cookie) {
    return null; // то воpвращаем null
  }
  // переменная массив со значениями, разделяем с точкой с запятой,ищем нужный элемент,
  // делаем возврат значение или null
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(key + "=")) || "";
  const value = decodeURIComponent(cookie.substring(key.length + 1));
  return cookie ? value : null;
}
