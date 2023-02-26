// переменная, где массив с чекбоксами
let treeInterest = Array.from(document.querySelectorAll(".interest__check"));

// функция поиска чекбокса
function searchCheckbox() {
  // цикл, где перебираем все чекбоксы
  for (let i = 0; i < treeInterest.length; i++) {
    // вешаем событие на клик изменения чекбокса
    treeInterest[i].addEventListener("change", function () {
      // переменная на дочерние чекбоксы, где ищет ближайший родительский элемент
      let childCheckbox = treeInterest[i]
        .closest(".interest")
        .querySelectorAll(".interests_active .interest__check");
      // условие, если поставить все галочки выведет все иначе снимутся все
      treeInterest[i].checked
        ? childCheckbox.forEach((elem) => {
            elem.checked = true;
            elem.indeterminate = false;
          })
        : childCheckbox.forEach((elem) => {
            elem.checked = false;
            elem.indeterminate = false;
          });
      // поиск ближайшего элемента родителя
      let parentActive = treeInterest[i].closest(".interests_active");
      // проверка если есть родитель то изменяем чекбоксы через функцию
      if (parentActive) {
        changeTreeInterest(parentActive);
        // поиск родителя
        let parentActiveFarther = parentActive
          .closest(".interest")
          .querySelector(".interest__check")
          .closest(".interests_active");
        // если родитель есть то изменяем чекбоксы через функцию
        if (parentActiveFarther) {
          changeTreeInterest(parentActiveFarther);
        }
      }
    });
  }
}
// функция изменения чекбоксов родителя
function changeTreeInterest(parentActive) {
  // переменные родителей чекбокса
  let parentInterest = parentActive.closest(".interest");
  let parent = parentInterest.querySelector(".interest__check");
  // переменная где массив соседних чекбоксов
  let neighborCheckbox = Array.from(
    parentActive.querySelectorAll(".interest__check")
  );
  // массив для значений чекбокса
  let childBooleanArray = [];
  // перебираем все соседние чекбоксы и пушим в новый массив
  neighborCheckbox.forEach((el) => childBooleanArray.push(el.checked));
  // переменная истина, если все элементы в массиве истины
  let childrenTrue = childBooleanArray.includes(true);
  // переменная ложь, если все элементы в массиве ложны
  let childrenFalse = childBooleanArray.includes(false);
  // если все галочки ложь, то убираем тире у родителя и галочку у родителя
  // если все галочки истина, то убираем тире у родителя и ставим галочку у родителя
  // если галочки и истина и ложь, то ставим тире родителю и ставим галочку родителю
  if (!childrenTrue && childrenFalse) {
    parent.indeterminate = false;
    parent.checked = false;
  } else if (childrenTrue && !childrenFalse) {
    parent.indeterminate = false;
    parent.checked = true;
  } else {
    parent.indeterminate = true;
    parent.checked = true;
  }
}
// вызов функции
searchCheckbox();
