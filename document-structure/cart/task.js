// обьявления переменных
let basket = document.getElementsByClassName("cart")[0];
let basketProduct = document.getElementsByClassName("cart__products")[0];
// парсинг над добавленными в корзине продуктами
let cachedProducts = JSON.parse(
  localStorage.getItem("localStorageBasketProduct")
);
// цикл по добавленным продуктам в корзине
for (let product in cachedProducts) {
  let { id, count, src } = cachedProducts[product];
  addBasket(id, count, src);
}
// обьект изменений в DOM, который следит за updateLocalData в корзине продуктов
new MutationObserver(updateLocalData).observe(basketProduct, {
  // если необходимо наблюдать за добавлением или удалением дочерних элементов
  childList: true,
  // если необходимо наблюдать за потомками целевого элемента.
  subtree: true,
});

// вешаем клик на продукт
document.addEventListener("click", function (e) {
  let { target } = e;
  // условие если содержит элемент "-", то элемент не больше 1, можно уменьшать на единицу
  if (e.target.classList.contains("product__quantity-control_dec")) {
    let value = target.nextElementSibling;
    if (value.innerText > 1) {
      value.innerText = +value.innerText - 1;
    }
  }
  // условие если содержит элемент "+", то элемент можно увеличивать на единицу
  if (target.classList.contains("product__quantity-control_inc")) {
    let value = target.previousElementSibling;
    value.innerText = +value.innerText + 1;
  }
  // условие если содержит элемент "Добавить в корзину",
  // то проверяем элемент содержит в родителе продукт
  // обьявление переменных внутри продукта - value, id, src
  if (target.classList.contains("product__add")) {
    let product = target.closest(".product");
    let value = product.getElementsByClassName("product__quantity-value")[0];
    let id = product.dataset.id;
    let src = product.getElementsByTagName("img")[0].src;
    // вызов функции добавление карточки продукта
    addBasket(id, +value.innerText, src);
    // вызов анимации картинки добавления продукта
    animationImage(product, id);
    // по умолчанию число 1 в тексте значения
    value.innerText = 1;
  }
  // условие если содержит элемент "-"
  // то проверем элемент содержит в родителе продукт
  // обьявление переменной внутри продукта - value
  if (target.classList.contains("cart__product-dec")) {
    let product = target.closest(".cart__product");
    let value = product.getElementsByClassName("cart__product-count")[0];
    // условие если значение больше 1, то можем уменьшать на 1
    if (value.innerText > 1) {
      value.innerText = +value.innerText - 1;
    } else {
      removeBasket(target);
    }
  }
  // условие если содержит элемент "+"
  // то проверем элемент содержит в родителе продукт
  // обьявление переменной внутри продукта - value
  if (target.classList.contains("cart__product-inc")) {
    let product = target.closest(".cart__product");
    let value = product.getElementsByClassName("cart__product-count")[0];
    // значение элемента можно увеличивать на 1
    value.innerText = +value.innerText + 1;
  }
  // условие если элемент содержит "закрыть"
  // то вызов функции закрытия элемента
  if (target.classList.contains("cart__product-remove")) {
    removeBasket(target);
  }
});
// функция закрытия элемента
function removeBasket(product) {
  // удаляем элемент
  product.parentElement.remove();
  // условие если НЕТ продукты корзины то удаляем класс активности
  if (!basketProduct.getElementsByClassName("cart__product")[0]) {
    basket.classList.remove("cart__active");
  }
}
// функция добавления продукта в корзину
function addBasket(id, countToAdd, imgSrc) {
  // добавляем корзину класс активности
  basket.classList.add("cart__active");
  // обьявление переменной на продукт из карточки
  let product = basketProduct.querySelector(`.cart__product[data-id='${id}'`);
  // если продукт то счетчик на продукт увеличиваем + 1
  // иначе добавляем html разметку в DOM
  if (product) {
    let count = product.getElementsByClassName("cart__product-count")[0];
    count.innerText = +count.innerText + countToAdd;
  } else {
    let newProduct = `
        <div class="cart__product" data-id="${id}">
            <img class="cart__product-image" src="${imgSrc}">
            <div class="cart__product-count">${countToAdd}</div>
            <a class="cart__product-remove">×</a>
            <a class="cart__product-dec">-</a>
            <a class="cart__product-inc">+</a>
        </div>`;
    // добавляем продукт в корзину
    basketProduct.insertAdjacentHTML("beforeend", newProduct);
  }
}
// функция анимации картинки
function animationImage(product, id) {
  // объявление переменных карточки продукта, начало и конец картинки, движении картинки
  // стороны картинки слева и вверх на начало и конец картинки
  let cartProduct = basketProduct.querySelector(
    `.cart__product[data-id='${id}'`
  );
  let startImg = product.getElementsByTagName("img")[0];
  let finishImg = cartProduct.getElementsByTagName("img")[0];
  let movingImg = startImg.cloneNode(false);
  let startLeft = startImg.getBoundingClientRect().left;
  let startTop = startImg.getBoundingClientRect().top;
  let finishLeft = finishImg.getBoundingClientRect().left;
  let finishTop = finishImg.getBoundingClientRect().top;
  // позицию фикс делаем
  movingImg.style.position = "fixed";
  // добавляем элемент после продукта
  product.insertAdjacentElement("afterend", movingImg);
  // счетчик
  let n = 1;
  // итерация максимального счетчика
  let iterationCount = 30;
  // делаем интервал анимации
  let animation = setInterval(() => {
    // смещаем высоту картинки
    leftDist = ((finishLeft - startLeft) / iterationCount) * n;
    // смещаем сторону картинки
    topDist = ((finishTop - startTop) / iterationCount) * n;
    // изменение высоты в DOM
    movingImg.style.left = startLeft + leftDist + "px";
    // изменение стороны в DOM
    movingImg.style.top = startTop + topDist + "px";
    // делаем шаг вперед
    n++;
    // есдт интервал равняется максимума
    // то удаляем картинки анимации и очистка интервала
    if (n === iterationCount) {
      movingImg.remove();
      clearInterval(animation);
    }
  }, 10);
}

// функция обновления localStorage
function updateLocalData() {
  // массив из карточек продуктов
  let products = [...document.getElementsByClassName("cart__product")];
  // создание нового массива из id, count, src
  products = products.map((item) => {
    let id = item.dataset.id,
      count = item.getElementsByClassName("cart__product-count")[0].innerText,
      src = item.getElementsByTagName("img")[0].src;
    // возврат
    return { id, count, src };
  });
  // перезапись в localStorage
  localStorage.setItem("localStorageBasketProduct", JSON.stringify(products));
}
