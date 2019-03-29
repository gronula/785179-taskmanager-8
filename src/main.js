import getFilterData from './filter-data';
import Filter from './filter';
import getTaskCardData from './task-data';
import Task from './task';
import TaskEdit from './task-edit';
import moment from 'moment';

const FILTERS_NUMBER = 7;
const CARDS_NUMBER = 7;

const filtersContainer = document.querySelector(`.filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const getAncestor = (target, className) => {
  let element = target;

  while (!element.classList.contains(className)) {
    element = element.parentElement;

    if (!element) {
      return false;
    }
  }

  return true;
};

const renderFilterElements = (filters) => {
  filtersContainer.innerHTML = ``;
  const fragment = document.createDocumentFragment();

  for (const filter of filters) {
    const filterComponent = new Filter(filter);
    const filterElement = filterComponent.render();

    const filterTasks = (tasks, filterName) => {
      switch (filterName) {
        case `all`: return tasks;
        case `overdue`: return tasks.filter((it) => it.dueDate < Date.now());
        case `today`: return tasks.filter((it) => moment(it.dueDate).format(`D MMMM`) === moment().format(`D MMMM`));
        case `repeating`: return tasks.filter((it) => [...Object.entries(it.repeatingDays)].some((rec) => rec[1]));

        default: return tasks;
      }
    };
    filterComponent.onFilter = (name) => {
      const filteredTasks = filterTasks(initialTasks, name.toLowerCase());
      renderTaskCards(filteredTasks);
    };

    [...filterElement.children].forEach((it) => fragment.appendChild(it));
  }

  filtersContainer.appendChild(fragment);
};

const renderTaskCards = (tasks) => {
  boardTasks.innerHTML = ``;
  const fragment = document.createDocumentFragment();

  for (const task of tasks) {
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);
    const card = taskComponent.render();

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      boardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    taskComponent.onTextareaClick = (evt) => {
      const textareaCursorPosition = evt.target.selectionStart;

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

    editTaskComponent.onEdit = updateComponent;
    editTaskComponent.onSubmit = updateComponent;
    editTaskComponent.onEscPress = (evt, newObject) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        updateComponent(newObject);
      }
    };
    editTaskComponent.onDocumentClick = (evt, newObject) => {
      const isOnEditTaskClick = getAncestor(evt.target, `card--edit`);

      if (isOnEditTaskClick) {
        return;
      }

      updateComponent(newObject);
    };
    editTaskComponent.onDelete = () => {
      const index = initialTasks.findIndex((it) => it === task);
      initialTasks.splice(index, 1);
      editTaskComponent.unrender();
    };

    fragment.appendChild(card);
  }

  boardTasks.appendChild(fragment);
};

const filters = new Array(FILTERS_NUMBER).fill().map((it, i) => getFilterData(i));
const initialTasks = new Array(CARDS_NUMBER).fill().map((it, i) => getTaskCardData(i + 1));

renderFilterElements(filters);
renderTaskCards(initialTasks);
