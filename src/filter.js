import Component from './component';

export default class Task extends Component {
  constructor({orderNumber, name, amount}) {
    super();
    this._orderNumber = orderNumber;
    this._name = name;
    this._amount = amount;

    this._element = null;
    this._onFilter = null;

    this._labelClickHandler = this._labelClickHandler.bind(this);
  }

  _labelClickHandler() {
    return typeof this._onFilter === `function` && this._onFilter(this._name);
  }

  get template() {
    return `
    <div>
      <input
        type="radio"
        id="filter__${this._name.toLowerCase()}"
        class="filter__input visually-hidden"
        name="filter"
        ${this._orderNumber === 0 ? `checked` : ``}
      />
      <label
        for="filter__${this._name.toLowerCase()}"
        class="filter__label"
      >
        ${this._name} <span class="filter__${this._name.toLowerCase()}-count">${this._amount}</span>
      </label>
    </div>`;
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  createListeners() {
    const label = this._element.querySelector(`.filter__label`);
    label.addEventListener(`click`, this._labelClickHandler);
  }

  removeListeners() {
    const label = this._element.querySelector(`.filter__label`);
    label.removeEventListener(`click`, this._labelClickHandler);
  }
}
