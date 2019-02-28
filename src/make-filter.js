const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const randomAmount = getRandomInteger(0, 100);
const randomChecked = getRandomInteger(0, 1);
const randomDisabled = getRandomInteger(0, 1);

export default (name) => `
<input
  type="radio"
  id="filter__${name.toLowerCase()}"
  class="filter__input visually-hidden"
  name="filter"
  ${randomChecked ? `checked` : ``}
  ${randomDisabled ? `disabled` : ``}
/>
<label
  for="filter__${name.toLowerCase()}"
  class="filter__label"
>
  ${name} <span class="filter__${name.toLowerCase()}-count">${randomAmount}</span>
</label>`;
