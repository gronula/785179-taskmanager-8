const NAMES = [
  `ALL`,
  `OVERDUE`,
  `TODAY`,
  `FAVORITES`,
  `Repeating`,
  `Tags`,
  `ARCHIVE`
];

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export default (orderNumber) => ({
  orderNumber,
  name: NAMES[orderNumber],
  amount: getRandomInteger(0, 100)
});
