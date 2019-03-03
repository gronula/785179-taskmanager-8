import getFilterElementMarkup from './make-filter';
import getTaskCardMarkup from './make-task';
import getTaskCardData from './task-data';

const FILTER_ELEMENT_NAMES = [
  `ALL`,
  `OVERDUE`,
  `TODAY`,
  `FAVORITES`,
  `Repeating`,
  `Tags`,
  `ARCHIVE`
];

const CARDS_NUMBER = 7;

const filter = document.querySelector(`.filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const renderFilterElements = () => {
  for (let i = 0; i < FILTER_ELEMENT_NAMES.length; i++) {
    const parameters = {};
    parameters.name = FILTER_ELEMENT_NAMES[i];
    parameters.randomAmount = getRandomInteger(0, 100);
    parameters.randomChecked = getRandomInteger(0, 1);
    parameters.randomDisabled = getRandomInteger(0, 1);

    filter.innerHTML += getFilterElementMarkup(parameters);
  }
};

const renderTaskCards = (cardsNumber) => {
  const taskCards = [];

  for (let i = 0; i < cardsNumber; i++) {
    const data = getTaskCardData();
    data.orderNumber = i;
    data.isEdited = i > 3 ? 1 : 0;
    data.isRepeated = getRandomInteger(0, 1);
    taskCards.push(data);

    boardTasks.innerHTML += getTaskCardMarkup(data);
  }
};

renderFilterElements();
renderTaskCards(CARDS_NUMBER);

const filterLabels = filter.querySelectorAll(`.filter__label`);

const filterLabelClickHandler = () => {
  boardTasks.innerHTML = ``;

  const randomCardsNumber = getRandomInteger(1, 7);

  renderTaskCards(randomCardsNumber);
};

filterLabels.forEach((it) => it.addEventListener(`click`, filterLabelClickHandler));
