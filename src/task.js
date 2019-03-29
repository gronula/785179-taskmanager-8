import Component from './component';
import moment from 'moment';

export default class Task extends Component {
  constructor({orderNumber, title, dueDate, tags, picture, color, repeatingDays}) {
    super();
    this._orderNumber = orderNumber;
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;

    this._element = null;
    this._state = {
      isDate: this._dueDate < Date.now(),
      isRepeated: this._isRepeated(),
      isFavorite: false,
      isDone: false
    };

    this._onEdit = null;
    this._onTextareaClick = null;

    this._editButtonClickHandler = this._editButtonClickHandler.bind(this);
    this._textareaClickHandler = this._textareaClickHandler.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _editButtonClickHandler(evt) {
    return typeof this._onEdit === `function` && this._onEdit(evt);
  }

  _textareaClickHandler(evt) {
    return typeof this._onTextareaClick === `function` && this._onTextareaClick(evt);
  }

  get template() {
    return `
    <article class="card  card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive ${this._state.isDone ? `` : `card__btn--disabled`}">archive</button>
            <button type="button" class="card__btn card__btn--favorites ${this._state.isFavorite ? `` : `card__btn--disabled`}">favorites</button>
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
              <div class="card__dates">${this._state.isDate ? `
                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="${moment(this._dueDate, `x`).format(`D MMMM`)}"
                      name="date"
                      value="${moment(this._dueDate, `x`).format(`D MMMM`)}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${moment(this._dueDate, `x`).format(`hh:mm A`)}"
                      name="time"
                      value="${moment(this._dueDate, `x`).format(`hh:mm A`)}"
                    />
                  </label>
                </fieldset>` : ``}
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
          </div>
        </div>
      </form>
    </article>`;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  set onTextareaClick(fn) {
    this._onTextareaClick = fn;
  }

  createListeners() {
    const editButton = this._element.querySelector(`.card__btn--edit`);
    const textarea = this._element.querySelector(`.card__text`);

    editButton.addEventListener(`click`, this._editButtonClickHandler);
    textarea.addEventListener(`click`, this._textareaClickHandler);
  }

  removeListeners() {
    const editButton = this._element.querySelector(`.card__btn--edit`);
    const textarea = this._element.querySelector(`.card__text`);

    editButton.removeEventListener(`click`, this._editButtonClickHandler);
    textarea.removeEventListener(`click`, this._textareaClickHandler);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
    this._state.isDate = data.state.isDate;
    this._state.isRepeated = data.state.isRepeated;
  }
}
