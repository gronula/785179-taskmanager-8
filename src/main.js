'use strict';

const FILTER_ELEMENT_NAMES = [
  `ALL`,
  `OVERDUE`,
  `TODAY`,
  `FAVORITES`,
  `Repeating`,
  `Tags`,
  `ARCHIVE`
];

const CARD_COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const DAYS_OF_WEEK = [
  `mo`,
  `tu`,
  `we`,
  `th`,
  `fr`,
  `sa`,
  `su`
];

const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const CARDS_NUMBER = 7;

const filter = document.querySelector(`.filter`);

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getFilterElement = (name, amount, isChecked, isDisabled) =>`
<input
  type="radio"
  id="filter__${name.toLowerCase()}"
  class="filter__input visually-hidden"
  name="filter"
  ${isChecked ? `checked` : ``}
  ${isDisabled ? `disabled` : ``}
/>
<label
  for="filter__${name.toLowerCase()}"
  class="filter__label"
>
  ${name} <span class="filter__${name.toLowerCase()}-count">${amount}</span>
</label>`;

const renderFilterElements = () => {
  for (let i = 0; i < FILTER_ELEMENT_NAMES.length; i++) {
    const name = FILTER_ELEMENT_NAMES[i];
    const randomAmount = getRandomInteger(0, 100);
    const randomChecked = getRandomInteger(0, 1);
    const randomDisabled = getRandomInteger(0, 1);
    const filterElement = getFilterElement(name, randomAmount, randomChecked, randomDisabled);
    filter.innerHTML += filterElement;
  }
};

renderFilterElements();

const boardTasks = document.querySelector(`.board__tasks`);

const getCardRepeatDay = (orderNumber) => {
  let cardRepeatDays = ``;
  for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
    const randomChecked = getRandomInteger(0, 1);
    cardRepeatDays += `
    <input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${DAYS_OF_WEEK[i]}-${orderNumber}"
      name="repeat"
      value="${DAYS_OF_WEEK[i]}"
      ${randomChecked ? `checked` : ``}
    />
    <label
      class="card__repeat-day"
      for="repeat-${DAYS_OF_WEEK[i]}-${orderNumber}"
    >
      ${DAYS_OF_WEEK[i]}
    </label>`;
  }

  return cardRepeatDays;
};

const getCardColor = (orderNumber) => {
  let cardColors = ``;
  for (let i = 0; i < COLORS.length; i++) {
    const randomChecked = getRandomInteger(0, 1);
    cardColors += `
    <input
      type="radio"
      id="color-${COLORS[i]}-${orderNumber}"
      class="card__color-input card__color-input--${COLORS[i]} visually-hidden"
      name="color"
      value="${COLORS[i]}"
      ${randomChecked ? `checked` : ``}
    />
    <label
      for="color-${COLORS[i]}-${orderNumber}"
      class="card__color card__color--${COLORS[i]}"
      >${COLORS[i]}</label
    >`;
  }
  return cardColors;
};

const getTaskCard = (cardColor, isCardEdited, isCardRepeated, isCardDeadlined, orderNumber) => `
<article class="card  card--${cardColor}  ${isCardEdited ? `card--edit` : ``}  ${isCardRepeated ? `card--repeat` : ``}  ${isCardDeadlined ? `card--deadline` : ``}">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          >Here is a card with filled data</textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">yes</span>
            </button>

            <fieldset class="card__date-deadline">
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="23 September"
                  name="date"
                  value="23 September"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="11:15 PM"
                  name="time"
                  value="11:15 PM"
                />
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">${isCardRepeated ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__repeat-days" ${isCardRepeated ? `` : `disabled`}>
              <div class="card__repeat-days-inner">
                ${getCardRepeatDay(orderNumber)}
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
              <span class="card__hashtag-inner">
                <input
                  type="hidden"
                  name="hashtag"
                  value="repeat"
                  class="card__hashtag-hidden-input"
                />
                <button type="button" class="card__hashtag-name">
                  #repeat
                </button>
                <button type="button" class="card__hashtag-delete">
                  delete
                </button>
              </span>

              <span class="card__hashtag-inner">
                <input
                  type="hidden"
                  name="hashtag"
                  value="repeat"
                  class="card__hashtag-hidden-input"
                />
                <button type="button" class="card__hashtag-name">
                  #cinema
                </button>
                <button type="button" class="card__hashtag-delete">
                  delete
                </button>
              </span>

              <span class="card__hashtag-inner">
                <input
                  type="hidden"
                  name="hashtag"
                  value="repeat"
                  class="card__hashtag-hidden-input"
                />
                <button type="button" class="card__hashtag-name">
                  #entertaiment
                </button>
                <button type="button" class="card__hashtag-delete">
                  delete
                </button>
              </span>
            </div>

            <label>
              <input
                type="text"
                class="card__hashtag-input"
                name="hashtag-input"
                placeholder="Type new hashtag here"
              />
            </label>
          </div>
        </div>

        <label class="card__img-wrap">
          <input
            type="file"
            class="card__img-input visually-hidden"
            name="img"
          />
          <img
            src="img/sample-img.jpg"
            alt="task picture"
            class="card__img"
          />
        </label>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            ${getCardColor(orderNumber)}
          </div>
        </div>
      </div>

      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>
</article>`;

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const renderTaskCards = (cardsNumber) => {
  for (let i = 0; i < cardsNumber; i++) {
    const cardColor = getRandomElement(CARD_COLORS);
    const randomEdited = getRandomInteger(0, 1);
    const randomRepeated = getRandomInteger(0, 1);
    const randomDeadlined = getRandomInteger(0, 1);
    const boardTasksCard = getTaskCard(cardColor, randomEdited, randomRepeated, randomDeadlined, i + 1);
    boardTasks.innerHTML += boardTasksCard;
  }
};

renderTaskCards(CARDS_NUMBER);

const filterLabels = filter.querySelectorAll(`.filter__label`);

const filterLabelClickHandler = () => {
  boardTasks.innerHTML = ``;

  const randomCardsNamber = getRandomInteger(1, 7);

  renderTaskCards(randomCardsNamber);
};

filterLabels.forEach((it) => it.addEventListener(`click`, filterLabelClickHandler));
