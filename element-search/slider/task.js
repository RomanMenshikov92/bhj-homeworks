// объявление переменных
const sliderItem = Array.from(document.querySelectorAll(".slider__item"));
const sliderArrow = document.querySelectorAll(".slider__arrow");
const sliderDot = Array.from(document.querySelectorAll(".slider__dot"));

// активный слайдер на 1 позиции, где мы смотрим
let sliderActive = 1;

// функция на изменение слайда
function flippingSlider(next) {
  // вызов функции на открытие слайда
  // каждое открытие слайда открываем следующее
  openSlide((sliderActive = sliderActive + next));
}

// функция на открытие слайдера
function openSlide(next) {
  // если следующий больше чем длина слайд, то тот устанавливаем активным
  if (next > sliderItem.length) {
    sliderActive = 1;
    // если следующий слайд меньше чем 1, то активный становится следующий
  } else if (next < 1) {
    sliderActive = sliderItem.length;
  }

  // перебираем элемент и удаляем активный класс
  sliderItem.forEach((element) => {
    element.classList.remove("slider__item_active");
  });
  // последний элемент слайдера и добавляем активный класс
  sliderItem[sliderActive - 1].classList.add("slider__item_active");
  // перебираем элемент и удаляем активный класс
  sliderDot.forEach((element) => {
    element.classList.remove("slider__dot_active");
  });
  // последний элемент слайдера и добавляем активный класс
  sliderDot[sliderActive - 1].classList.add("slider__dot_active");
}

// проходим по циклу на стрелки
for (let arrow of sliderArrow) {
  arrow.addEventListener("click", function clickOnArrow(evt) {
    flippingSlider(
      evt.target.classList.contains("slider__arrow_prev") ? -1 : 1
    );
  });
}

// проходим по циклу на пагинацию точек
for (let dot of sliderDot) {
  dot.addEventListener("click", function clickOnDot(evt) {
    openSlide((sliderActive = sliderDot.indexOf(evt.target) + 1));
  });
}
