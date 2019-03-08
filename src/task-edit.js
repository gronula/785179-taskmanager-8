import Component from './component';

const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

export default class TaskEdit extends Component {
  constructor({orderNumber, title, dueDate, tags, picture, color, repeatingDays}) {
    super();
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isRepeated = Object.values(this._repeatingDays).some((it) => it === true);
    this._orderNumber = orderNumber;

    this._element = null;
    this._state = {
      isFavorite: false,
      isDone: false
    };

    this._onEdit = null;
    this._onSubmit = null;

    this._editButtonClickHandler = this._editButtonClickHandler.bind(this);
    this._submitButtonClickHandler = this._submitButtonClickHandler.bind(this);
  }

  _editButtonClickHandler() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  _submitButtonClickHandler(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  get template() {
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
                      placeholder="${this.getDate(this._dueDate, false, true)}"
                      name="date"
                      value="${this.getDate(this._dueDate, false, true)}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${this.getDate(this._dueDate, true, false)}"
                      name="time"
                      value="${this.getDate(this._dueDate, true, false)}"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${this._isRepeated ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${this._isRepeated ? `` : `disabled`}>
                  <div class="card__repeat-days-inner">
                    ${(Object.keys(this._repeatingDays).map((day) => (`
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-${day}-${this._orderNumber}"
                        name="repeat"
                        value="${day}"
                        ${this._repeatingDays[day] ? `checked` : ``}
                      />
                      <label
                        class="card__repeat-day"
                        for="repeat-${day}-${this._orderNumber}"
                      >
                        ${day}
                      </label>`))).join(``)}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${(Array.from(this._tags).map((tag) => (`
                    <span class="card__hashtag-inner">
                      <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input" />
                      <button type="button" class="card__hashtag-name">#${tag}</button>
                      <button type="button" class="card__hashtag-delete">delete</button>
                    </span>`))).join(``)}
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
                ${(COLORS.map((color) => (`
                  <input
                    type="radio"
                    id="color-${color}-${this._orderNumber}"
                    class="card__color-input card__color-input--${color} visually-hidden"
                    name="color"
                    value="${color}"
                    ${color === this._color ? `checked` : ``}
                  />
                  <label
                    for="color-${color}-${this._orderNumber}"
                    class="card__color card__color--${color}"
                    >${color}</label
                  >`))).join(``)}
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

  set onEdit(fn) {
    this._onEdit = fn;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  createListeners() {
    const editButton = this._element.querySelector(`.card__btn--edit`);
    const form = this._element.querySelector(`.card__form`);

    editButton.addEventListener(`click`, this._editButtonClickHandler);
    form.addEventListener(`submit`, this._submitButtonClickHandler);
  }

  removeListeners() {
    const editButton = this._element.querySelector(`.card__btn--edit`);
    const form = this._element.querySelector(`.card__form`);

    editButton.removeEventListener(`click`, this._editButtonClickHandler);
    form.removeEventListener(`submit`, this._submitButtonClickHandler);
  }
}
