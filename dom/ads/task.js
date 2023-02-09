document.addEventListener("DOMContentLoaded", () => {
    // объявление переменной массив фраз карточек
    const arrayRotator = [...document.getElementsByClassName('rotator__case')];
    // функция ротатора
    function rotation() {
      // переменная порядкового счетчика
        let numberOrder = 0;
        function checkRotation() {
          // перебор с проверкой, если объект ротатора активный то удаляем
          arrayRotator.find((evt) => {
            if(evt.classList.contains('rotator__case_active')) {
              evt.classList.remove('rotator__case_active');
            }
          });
          // делаем рандомный порядок перехода разных фраз
          numberOrder = Math.floor(Math.random() * (arrayRotator.length));
          // добавляем активный класс
          arrayRotator[numberOrder].classList.add('rotator__case_active');
          // добавляем атрибуты цвета и скорости интервала
          arrayRotator[numberOrder].style.color = arrayRotator[numberOrder].dataset.color;
        }
        // вызываем интервал и устанавливаем скорость атрибутов
        setInterval(checkRotation, arrayRotator[numberOrder].dataset.speed);
    };
    // вызов
    rotation();
    });