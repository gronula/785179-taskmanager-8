export default (name, randomAmount, randomChecked, randomDisabled) => `
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
