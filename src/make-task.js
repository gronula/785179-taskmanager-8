const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const getRandomBoolean = () => Math.floor(Math.random() * 2) === 1 ? true : false;

const getDate = (timestamp, time = false, date = false) => {
  const day = new Date();
  day.setTime(timestamp);

  const hours = time ? (`0${day.getHours()}:`).slice(-3) : ``;
  const minutes = time ? (`0${day.getMinutes()}`).slice(-2) : ``;

  const days = date ? `${day.getDate()} ` : ``;
  const month = date ? MONTHS[day.getMonth()] : ``;

  return hours + minutes + days + month;
};

const getHashtagsMarkup = (hashtags) => {
  let markup = ``;

  for (const tag of hashtags) {
    markup += `
    <span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="repeat"
        class="card__hashtag-hidden-input"
      />
      <button type="button" class="card__hashtag-name">
        #${tag}
      </button>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`;
  }

  return markup;
};

const getCardRepeatingDaysMarkup = (days, orderNumber) => {
  let markup = ``;

  for (const day in days) {
    if (days.hasOwnProperty(day)) {
      markup += `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-${orderNumber}"
        name="repeat"
        value="${day}"
        ${days[day] ? `checked` : ``}
      />
      <label
        class="card__repeat-day"
        for="repeat-${day}-${orderNumber}"
      >
        ${day}
      </label>`;
    }
  }

  return markup;
};

const getCardColorsMarkup = (color, orderNumber) => {
  let markup = ``;

  for (let i = 0; i < COLORS.length; i++) {
    markup += `
    <input
      type="radio"
      id="color-${COLORS[i]}-${orderNumber}"
      class="card__color-input card__color-input--${COLORS[i]} visually-hidden"
      name="color"
      value="${COLORS[i]}"
      ${COLORS[i] === color ? `checked` : ``}
    />
    <label
      for="color-${COLORS[i]}-${orderNumber}"
      class="card__color card__color--${COLORS[i]}"
      >${COLORS[i]}</label
    >`;
  }

  return markup;
};

export default ({title, dueDate, tags, picture, color, repeatingDays, isFavorite, isDone, orderNumber, isEdited, isRepeated}) => `
<article class="card  card--${color} ${isEdited ? `card--edit` : ``} ${isRepeated ? `card--repeat` : ``} ${isDone ? `` : `card--deadline`}">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button type="button" class="card__btn card__btn--favorites ${isFavorite ? `` : `card__btn--disabled`}">
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
          >${title}</textarea>
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
                  placeholder="${getDate(dueDate, false, true)}"
                  name="date"
                  value="${getDate(dueDate, false, true)}"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="${getDate(dueDate, true, false)}"
                  name="time"
                  value="${getDate(dueDate, true, false)}"
                />
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">${isRepeated ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__repeat-days" ${isRepeated ? `` : `disabled`}>
              <div class="card__repeat-days-inner">
                ${getCardRepeatingDaysMarkup(repeatingDays, orderNumber)}
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
              ${getHashtagsMarkup(tags)}
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
            src="${picture}"
            alt="task picture"
            class="card__img"
          />
        </label>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            ${getCardColorsMarkup(color, orderNumber)}
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
