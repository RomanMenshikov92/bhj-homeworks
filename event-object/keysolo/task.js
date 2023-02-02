class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector(".word");
    this.winsElement = container.querySelector(".status__wins");
    this.lossElement = container.querySelector(".status__loss");
    // добавляем таймер обратного отсчета
    this.timerElement = container.querySelector(".status__timer");

    this.reset();

    this.registerEvents();
    // добавляем вызов таймера
    this.timerCall();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    // вешаем событие на нажатие клавиши от пользователя
    document.addEventListener("keydown", (e) => {
      // если вводимое равняется с тем текстом на экране, то успех иначе ошибка
      if (e instanceof KeyboardEvent) {
        e.key.toUpperCase() === this.currentSymbol.innerText.toUpperCase()
          ? this.success()
          : this.fail();
      }
    });
  }

  success() {
    if (this.currentSymbol.classList.contains("symbol_current"))
      this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add("symbol_correct");
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add("symbol_current");
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert("Победа!");
      this.reset();
    }
    this.setNewWord();
    // очистка интервала при проигрыше и снова вызов таймера
    clearInterval(this.timerId);
    this.timerCall();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert("Вы проиграли!");
      this.reset();
    }
    this.setNewWord();
    // очистка интервала при проигрыше и снова вызов таймера
    clearInterval(this.timerId);
    this.timerCall();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        "bob",
        "awesome",
        "netology",
        "hello",
        "kitty",
        "rock",
        "youtube",
        "popcorn",
        "cinema",
        "love",
        "javascript",
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? "symbol_current" : ""}">${s}</span>`
      )
      .join("");
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector(".symbol_current");
  }

  // добавляем метод функции вызова таймера
  timerCall() {
    // секунда равняется с количеством текста
    this.timerElement.textContent = this.wordElement.textContent.length;
    this.timerId = setInterval(() => {
      let seconds = parseInt(this.timerElement.textContent) - 1;
      this.timerElement.textContent = seconds;
      // если секунда = 0, то очистка + +1 счет к ошибкам
      if (seconds === 0) {
        clearInterval(this.timerId);
        this.fail();
      }
    }, 1000);
  }
}

new Game(document.getElementById("game"));
