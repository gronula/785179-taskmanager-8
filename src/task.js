import Component from './component';
import moment from 'moment';

export default class Task extends Component {
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
      isRepeated: Object.values(this._repeatingDays).some((it) => it === true),
      isFavorite: false,
      isDone: false
    };

    this._onEdit = null;
    this._editButtonClickHandler = this._editButtonClickHandler.bind(this);
  }

  _editButtonClickHandler() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  get template() {
    return `
    <article class="card  card--${this._color} ${this._state.isRepeated ? `card--repeat` : ``}">
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
                <fieldset class="card__date-deadline">
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

  createListeners() {
    const editButton = this._element.querySelector(`.card__btn--edit`);
    editButton.addEventListener(`click`, this._editButtonClickHandler);
  }

  removeListeners() {
    const editButton = this._element.querySelector(`.card__btn--edit`);
    editButton.removeEventListener(`click`, this._editButtonClickHandler);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }
}
