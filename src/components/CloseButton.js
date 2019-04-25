const { html } = require('htm/preact');

const CloseButton = ({ clickHandler }) =>
  html`
    <button class="close-button" onClick=${clickHandler}>
      <span class="close-button--x">×</span>
    </button>
  `;

module.exports = CloseButton;
