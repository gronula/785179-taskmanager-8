import getFilterElementMarkup from './make-filter';
import getTaskCardData from './task-data';
import Task from './task';
import TaskEdit from './task-edit';

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
const getRandomBoolean = () => Math.floor(Math.random() * 2) === 1 ? true : false;

const renderFilterElements = () => {
  let markup = ``;

  for (let i = 0; i < FILTER_ELEMENT_NAMES.length; i++) {
    const parameters = {};
    parameters.name = FILTER_ELEMENT_NAMES[i];
    parameters.randomAmount = getRandomInteger(0, 100);
    parameters.randomChecked = getRandomBoolean();
    parameters.randomDisabled = getRandomBoolean();

    markup += getFilterElementMarkup(parameters);
  }

  filter.innerHTML = markup;
};

const renderTaskCards = (cardsNumber) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < cardsNumber; i++) {
    const orderNumber = i + 1;
    const data = getTaskCardData(orderNumber);

    const taskComponent = new Task(data);
    const editTaskComponent = new TaskEdit(data);

    const card = taskComponent.render();

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      boardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    const updateComponent = (newObject) => {
      data.title = newObject.title;
      data.tags = newObject.tags;
      data.color = newObject.color;
      data.repeatingDays = newObject.repeatingDays;
      data.dueDate = newObject.dueDate;

      taskComponent.update(data);
      taskComponent.render();
      boardTasks.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onEdit = updateComponent;
    editTaskComponent.onSubmit = updateComponent;

    fragment.appendChild(card);
  }

  boardTasks.appendChild(fragment);
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
