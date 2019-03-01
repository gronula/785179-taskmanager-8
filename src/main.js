import getFilterElement from './make-filter';
import getTaskCard from './make-task';

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

const CARDS_NUMBER = 7;

const filter = document.querySelector(`.filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const renderFilterElements = () => {
  for (let i = 0; i < FILTER_ELEMENT_NAMES.length; i++) {
    const filterName = FILTER_ELEMENT_NAMES[i];
    const randomAmount = getRandomInteger(0, 100);
    const randomChecked = getRandomInteger(0, 1);
    const randomDisabled = getRandomInteger(0, 1);

    filter.innerHTML += getFilterElement(filterName, randomAmount, randomChecked, randomDisabled);
  }
};

const renderTaskCards = () => {
  for (let i = 0; i < CARDS_NUMBER; i++) {
    const orderNumber = i + 1;
    const randomColor = getRandomElement(CARD_COLORS);
    const randomEdited = getRandomInteger(0, 1);
    const randomRepeated = getRandomInteger(0, 1);
    const randomDeadlined = getRandomInteger(0, 1);

    boardTasks.innerHTML += getTaskCard(orderNumber, randomColor, randomEdited, randomRepeated, randomDeadlined);
  }
};

renderFilterElements();
renderTaskCards();

const filterLabels = filter.querySelectorAll(`.filter__label`);

const filterLabelClickHandler = () => {
  boardTasks.innerHTML = ``;

  const randomCardsNamber = getRandomInteger(1, 7);

  renderTaskCards(randomCardsNamber);
};

filterLabels.forEach((it) => it.addEventListener(`click`, filterLabelClickHandler));
