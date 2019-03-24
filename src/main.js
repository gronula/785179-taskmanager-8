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

const renderTaskCards = (tasks) => {
  boardTasks.innerHTML = ``;
  const fragment = document.createDocumentFragment();

  for (const task of tasks) {
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);
    const card = taskComponent.render();

    taskComponent.onEdit = (evt) => {
      const editedTask = boardTasks.querySelector(`.card--edit`);

      if (!editedTask) {
        evt.stopPropagation();
      }

      editTaskComponent.render();
      boardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    taskComponent.onTextareaClick = (evt) => {
      const editedTask = boardTasks.querySelector(`.card--edit`);
      const textareaCursorPosition = evt.target.selectionStart;

      if (!editedTask) {
        evt.stopPropagation();
      }

      editTaskComponent.render();
      boardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();

      const textarea = boardTasks.querySelector(`.card--edit .card__text`);
      textarea.focus();
      textarea.setSelectionRange(textareaCursorPosition, textareaCursorPosition);
    };

    const updateComponent = (newObject) => {
      Object.assign(task, newObject);

      taskComponent.update(task);
      taskComponent.render();
      boardTasks.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onThisClick = (evt) => {
      evt.stopPropagation();
    };
    editTaskComponent.onEdit = updateComponent;
    editTaskComponent.onSubmit = updateComponent;
    editTaskComponent.onEscPress = (evt, newObject) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        updateComponent(newObject);
      }
    };
    editTaskComponent.onDocumentClick = (evt, newObject) => {
      // как сделать, чтобы при смене месяца или времени не срабатывал этот обработчик?
      // как сделать, чтобы при открытой карточке, при клике на другую в поле textarea, она сразу открывалась? Сейчас обе карточке оказываются закрытыми после клика.
      evt.preventDefault();
      updateComponent(newObject);
    };
    editTaskComponent.onDelete = () => {
      const index = tasks.findIndex((it) => it === task);
      tasks.splice(index, 1);
      editTaskComponent.unrender();
    };

    fragment.appendChild(card);
  }

  boardTasks.appendChild(fragment);
};

const initialTasks = new Array(CARDS_NUMBER).fill().map((it, i) => getTaskCardData(i + 1));

renderFilterElements();
renderTaskCards(initialTasks);

const filterLabels = filter.querySelectorAll(`.filter__label`);

const filterLabelClickHandler = () => {
  const editedTask = boardTasks.querySelector(`.card--edit`);
  if (editedTask) {
    return;
  }

  const randomCardsNumber = getRandomInteger(1, 7);
  const newTasks = new Array(randomCardsNumber).fill().map((it, i) => getTaskCardData(i + 1));

  renderTaskCards(newTasks);
};

filterLabels.forEach((it) => it.addEventListener(`click`, filterLabelClickHandler));
