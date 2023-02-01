// объявление переменных
const popupStart = document.getElementById('modal_main');
const popupEnd = document.getElementById('modal_success');
const btn = document.getElementsByClassName('btn');
// объявление переменной через spread, где будем искать все кнопки,чтоб цвет поменять
const popupBtnArray = [...document.querySelectorAll('div.modal__close')];

// добавляем класс "активный" к первому попапу
popupStart.classList.add('modal_active');

// перебираем кнопки со цветом и через событие onclick удаляем активный
popupBtnArray.map((btnClose) => {
  btnClose.onclick = () => {
    btnClose.closest('.modal').classList.remove('modal_active');
  };
});

// вывод другого попапа на активный
btn[0].onclick = () => {
  popupStart.classList.remove('modal_active');
  popupEnd.classList.add('modal_active');
};