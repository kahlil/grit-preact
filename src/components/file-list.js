const { html } = require('htm/preact');

const ListButton = ({ handleClick, action, buttonText }) => {
  return html`
    <li>
      <button onClick=${event => handleClick(event)} data-action=${action}>
        ${buttonText}
      </button>
    </li>
  `;
};

const FileList = ({ fileNames, handleClick }) => {
  const noFiles = !fileNames || fileNames.length === 0;
  return html`
    <section class="file-list">
      <ul>
        ${noFiles && [
          html`
            <${ListButton}
              handleClick=${handleClick}
              action="createFile"
              buttonText="create new"
            />
          `,
        ]}
        ${!noFiles &&
          fileNames.map(
            fileName =>
              html`
                <${ListButton}
                  handleClick=${handleClick}
                  action="openFile"
                  buttonText=${fileName}
                />
              `
          )}
      </ul>
    </section>
  `;
};

module.exports = FileList;
