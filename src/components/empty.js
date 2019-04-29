const { html } = require('htm/preact');

module.exports = () => html`
  <div class="empty flex-center fill-viewport no-margin">
    <span class="no-select">Use command+o to open or create a post</span>
  </div>
`;
