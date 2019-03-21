import Component from './component';
import createElement from './create-element';
import flatpickr from 'flatpickr';
import moment from 'moment';

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
    this._orderNumber = orderNumber;

    this._element = null;
    this._state = {
      isDate: false,
      isRepeated: Object.values(this._repeatingDays).some((it) => it === true),
      isFavorite: false,
      isDone: false
    };

    this._onEdit = null;
    this._onSubmit = null;

    this._editButtonClickHandler = this._editButtonClickHandler.bind(this);
    this._submitButtonClickHandler = this._submitButtonClickHandler.bind(this);
    this._dateButtonClickHandler = this._dateButtonClickHandler.bind(this);
    this._repeatButtonClickHandler = this._repeatButtonClickHandler.bind(this);
    this._colorButtonClickHandler = this._colorButtonClickHandler.bind(this);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'Mo': false,
        'Tu': false,
        'We': false,
        'Th': false,
        'Fr': false,
        'Sa': false,
        'Su': false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _editButtonClickHandler() {
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onEdit(newData);
    }

    this.update(newData);
  }

  _submitButtonClickHandler(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  _dateButtonClickHandler() {
    this._state.isDate = !this._state.isDate;
    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _repeatButtonClickHandler() {
    this._state.isRepeated = !this._state.isRepeated;
    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _colorButtonClickHandler(evt) {
    if (evt.target.classList.contains(`card__color`)) {
      this._element.classList.remove(`card--${this._color}`);
      this._color = evt.target.previousElementSibling.value;
      this._element.classList.add(`card--${this._color}`);
    }
  }

  _partialUpdate() {
    const newElement = createElement(this.template);
    this._element.parentElement.replaceChild(newElement, this._element);
    this._element = newElement;
  }

  get template() {
    return `
    <article class="card card--edit card--${this._color} ${this._state.isRepeated ? `card--repeat` : ``}">
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
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${this._state.isDate ? `` : `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="${moment(this._dueDate).format(`D MMMM`)}"
                      name="date"
                      value="${moment(this._dueDate).format(`D MMMM`)}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${moment(this._dueDate).format(`hh:mm A`)}"
                      name="time"
                      value="${moment(this._dueDate).format(`hh:mm A`)}"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${this._state.isRepeated ? `` : `disabled`}>
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
    const dateButton = this._element.querySelector(`.card__date-deadline-toggle`);
    const repeatButton = this._element.querySelector(`.card__repeat-toggle`);
    const colorsContainer = this._element.querySelector(`.card__colors-wrap`);
    const form = this._element.querySelector(`.card__form`);

    editButton.addEventListener(`click`, this._editButtonClickHandler);
    dateButton.addEventListener(`click`, this._dateButtonClickHandler);
    repeatButton.addEventListener(`click`, this._repeatButtonClickHandler);
    colorsContainer.addEventListener(`click`, this._colorButtonClickHandler);
    form.addEventListener(`submit`, this._submitButtonClickHandler);

    if (this._state.isDate) {
      flatpickr(`.card__date`, {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`,
        defaultDate: moment(this._dueDate).format(`D MMMM`),
        locale: {
          firstDayOfWeek: 1
        },
      });

      flatpickr(`.card__time`, {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`,
        defaultDate: moment(this._dueDate).format(`hh:mm A`),
      });
    }
  }

  removeListeners() {
    const editButton = this._element.querySelector(`.card__btn--edit`);
    const dateButton = this._element.querySelector(`.card__date-deadline-toggle`);
    const repeatButton = this._element.querySelector(`.card__repeat-toggle`);
    const colorsContainer = this._element.querySelector(`.card__colors-wrap`);
    const form = this._element.querySelector(`.card__form`);

    editButton.removeEventListener(`click`, this._editButtonClickHandler);
    dateButton.removeEventListener(`click`, this._dateButtonClickHandler);
    repeatButton.removeEventListener(`click`, this._repeatButtonClickHandler);
    colorsContainer.removeEventListener(`click`, this._colorButtonClickHandler);
    form.removeEventListener(`submit`, this._submitButtonClickHandler);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {
      hastag: (value) => target.tags.add(value),
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => target.dueDate[value],
    };
  }
}
