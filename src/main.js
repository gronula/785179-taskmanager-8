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

const CARDS_NUMBER = 7;

const filter = document.querySelector(`.filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const renderFilterElements = () => {
  for (let i = 0; i < FILTER_ELEMENT_NAMES.length; i++) {
    const filterName = FILTER_ELEMENT_NAMES[i];
    filter.innerHTML += getFilterElement(filterName);
  }
};

const renderTaskCards = () => {
  for (let i = 0; i < CARDS_NUMBER; i++) {
    const orderNumber = i + 1;
    boardTasks.innerHTML += getTaskCard(orderNumber);
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
