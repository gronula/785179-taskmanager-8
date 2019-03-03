export default (parameters) => `
<input
  type="radio"
  id="filter__${parameters.name.toLowerCase()}"
  class="filter__input visually-hidden"
  name="filter"
  ${parameters.randomChecked ? `checked` : ``}
  ${parameters.randomDisabled ? `disabled` : ``}
/>
<label
  for="filter__${parameters.name.toLowerCase()}"
  class="filter__label"
>
  ${parameters.name} <span class="filter__${parameters.name.toLowerCase()}-count">${parameters.randomAmount}</span>
</label>`;
