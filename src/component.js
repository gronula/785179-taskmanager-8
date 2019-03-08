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

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  getDate(timestamp, time = false, date = false) {
    const day = new Date();
    day.setTime(timestamp);

    const hours = time ? (`0${day.getHours()}:`).slice(-3) : ``;
    const minutes = time ? (`0${day.getMinutes()}`).slice(-2) : ``;

    const days = date ? `${day.getDate()} ` : ``;
    const month = date ? MONTHS[day.getMonth()] : ``;

    return hours + minutes + days + month;
  }

  createListeners() {}

  removeListeners() {}

  render() {
    this._element = createElement(this.template);
    this.createListeners();
    return this._element;
  }

  unrender() {
    this.removeListeners();
    this._element.remove();
    this._element = null;
  }
}
