// объявление класса с конструктором (внутри конструктора объявление переменных)
class Chatbot {
  constructor(container) {
    this.container = container;
    this.widgetSide = container.querySelector(".chat-widget__side");
    this.widgetMessageContainer = container.querySelector(
      ".chat-widget__messages-container"
    );
    this.widgetMessage = container.querySelector(".chat-widget__messages");
    this.widgetInput = container.querySelector(".chat-widget__input");
    // указываем настоящую дату в чат боте(формат HH:MM)
    this.data = new Date().toLocaleTimeString().substring(0, 5);
    // счетчик бота
    this.count = 0;

    this.registerEvent();
    this.startCheck();
  }

  // массив сообщении чатбота
  arrayWordBot(response) {
    const words = {
      greeting: [
        "Доброго времени суток! Я чатбот этого места",
        "Здравствуйте, вам помочь?",
        "Привет!",
      ],
      other: [
        "Я занят",
        "Не пишите мне",
        "Давай потом напишешь снова",
        "Меня нет на месте",
      ],
    };
    // рандомный ответ чатбота
    if (response) {
      return words.greeting[Math.floor(Math.random() * words.greeting.length)];
    } else {
      return words.other[Math.floor(Math.random() * words.other.length)];
    }
  }

  // добавляем метод клика на элемент и превращает в активность
  registerEvent() {
    this.widgetSide.addEventListener("click", () => {
      this.container.classList.add("chat-widget_active");
      this.startCheck();
    });

    this.widgetInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && this.widgetInput.value.length > 0 && this.widgetInput.value.replace(/^\s+/,'')) {
        // добавляем в окно - соббщения чатбота
        this.widgetMessage.innerHTML += `
          <div class="message message_client">
          <div class="message__time">${this.data}</div>
          <div class="message__text">
            ${this.widgetInput.value}
          </div>
        </div>
          `;
        // очистка поля ввода
        this.widgetInput.value = "";
        // ответ бота и старт в окне
        this.startBot();
        this.startCheck();
      }
    });
  }

  // метод старта бота с сообщениями со счетчиком + скролл низ идет + очистка интервала
  startBot(response) {
    this.count++;
    let word = response ? this.arrayWordBot(response) : this.arrayWordBot();

    this.widgetMessage.innerHTML += `
      <div class="message">
      <div class="message__time">${this.data}</div>
      <div class="message__text">
        ${word}
      </div>
    </div>
      `;

    this.scroolEnd();
    clearInterval(this.timer);
  }

  // добавляем метод старта с проверкой активности
  startCheck() {
    if (this.container.classList.contains("chat-widget_active")) {
      this.setTimer();
    }
  }

  // добавляем метод таймера с таймаутом 30 секунд
  setTimer() {
    this.timer = setInterval(() => {
      this.startBot(true);
    }, 30000);
  }

  // добавляем метод скролла, где условие что низ сообщении чата ниже, тем делает ниже чат
  scroolEnd() {
    let bottomMessages = this.widgetMessage.getBoundingClientRect().bottom;
    let bottomChat = this.widgetMessageContainer.getBoundingClientRect().bottom;
    if (bottomMessages > bottomChat) {
      this.widgetMessageContainer.scrollBy(0, bottomMessages - bottomChat + 10);
    }
  }
}

new Chatbot(document.querySelector(".chat-widget"));
