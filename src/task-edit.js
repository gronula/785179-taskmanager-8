import createElement from './create-element';

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

export default class TaskEdit {
  constructor({title, dueDate, tags, picture, color, repeatingDays}) {
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isRepeated = Object.values(this._repeatingDays).some((it) => it === true);

    this._element = null;
    this._state = {
      isFavorite: false,
      isDone: false
    };

    this._onEdit = null;
    this._onSubmit = null;
  }

  _getDate(timestamp, time = false, date = false) {
    const day = new Date();
    day.setTime(timestamp);

    const hours = time ? (`0${day.getHours()}:`).slice(-3) : ``;
    const minutes = time ? (`0${day.getMinutes()}`).slice(-2) : ``;

    const days = date ? `${day.getDate()} ` : ``;
    const month = date ? MONTHS[day.getMonth()] : ``;

    return hours + minutes + days + month;
  }

  _getHashtagsMarkup(hashtags) {
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
  }

  _getCardRepeatingDaysMarkup(days, orderNumber) {
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
  }

  _getCardColorsMarkup(color, orderNumber) {
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
  }

  _getTemplate(orderNumber) {
    return `
    <article class="card card--edit card--${this._color} ${this._isRepeated ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button type="button" class="card__btn card__btn--favorites">
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
              >${this._title}</textarea>
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
                      placeholder="${this._getDate(this._dueDate, false, true)}"
                      name="date"
                      value="${this._getDate(this._dueDate, false, true)}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${this._getDate(this._dueDate, true, false)}"
                      name="time"
                      value="${this._getDate(this._dueDate, true, false)}"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${this._isRepeated ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${this._isRepeated ? `` : `disabled`}>
                  <div class="card__repeat-days-inner">
                    ${this._getCardRepeatingDaysMarkup(this._repeatingDays, orderNumber)}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this._getHashtagsMarkup(this._tags)}
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
                src="${this._picture}"
                alt="task picture"
                class="card__img"
              />
            </label>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${this._getCardColorsMarkup(this._color, orderNumber)}
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
  }

  _editButtonClickHandler() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  _submitButtonClickHandler(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  bind(element, event, fn) {
    element.addEventListener(event, fn.bind(this));
  }

  unbind(element, event, fn) {
    element.removeEventListener(event, fn.bind(this));
  }

  render(orderNumber) {
    const markup = this._getTemplate(orderNumber);
    this._element = createElement(markup);

    const editButton = this._element.querySelector(`.card__btn--edit`);
    const form = this._element.querySelector(`.card__form`);

    this.bind(editButton, `click`, this._editButtonClickHandler);
    this.bind(form, `submit`, this._submitButtonClickHandler);

    return this._element;
  }

  unrender() {
    const editButton = this._element.querySelector(`.card__btn--edit`);
    const form = this._element.querySelector(`.card__form`);

    this.unbind(editButton, `click`, this._editButtonClickHandler);
    this.unbind(form, `submit`, this._submitButtonClickHandler);

    this._element = null;
  }
}