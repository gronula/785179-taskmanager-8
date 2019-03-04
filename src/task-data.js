const Data = {
  TITLE: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ],
  TAG: [
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `thumb`,
    `important`,
    `favourite`
  ],
  COLOR: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ]
};

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomBoolean = () => Math.floor(Math.random() * 2) === 1 ? true : false;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomArray = (array) => {
  const randomLength = getRandomInteger(0, 3);
  const newArray = [];
  const copyArray = array.slice();

  for (let i = 0; i < randomLength; i++) {
    const randomElementIndex = getRandomInteger(0, copyArray.length - 1);
    const randomElement = copyArray.splice(randomElementIndex, 1)[0];
    newArray.push(randomElement);
  }

  return newArray;
};

export default () => ({
  title: getRandomElement(Data.TITLE),
  dueDate: Date.now() + getRandomInteger(-7, 7) * getRandomInteger(1, 24) * getRandomInteger(1, 60) * 60 * 1000,
  tags: new Set(getRandomArray(Data.TAG)),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: getRandomElement(Data.COLOR),
  repeatingDays: {
    [`Mo`]: getRandomBoolean(),
    [`Tu`]: getRandomBoolean(),
    [`We`]: getRandomBoolean(),
    [`Th`]: getRandomBoolean(),
    [`Fr`]: getRandomBoolean(),
    [`Sa`]: getRandomBoolean(),
    [`Su`]: getRandomBoolean()
  },
  isFavorite: getRandomBoolean(),
  isDone: getRandomBoolean()
});
