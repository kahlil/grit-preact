const { html } = require('htm/preact');
const { dispatch } = require('../lib/state/zeroFux');
const CloseButton = require('./CloseButton');

const ListButton = ({ handleClick, action, buttonText }) => {
  const handleCloseClick = () =>
    dispatch({ type: 'deleteFile', payload: buttonText });
  return html`
    <li>
      <button class="list-button" onClick=${handleClick} data-action=${action}>
        ${buttonText}
      </button>
      <${CloseButton} clickHandler=${handleCloseClick} />
    </li>
  `;
};

const FileList = ({ fileList, handleClick, handleCloseClick }) => {
  const noFiles = !fileList || fileList.length === 0;
  return html`
    <section class="file-list">
      <ul>
        ${noFiles &&
          html`
            <${ListButton}
              handleClick=${handleClick}
              handleCloseClick=${handleCloseClick}
              action="createFile"
              buttonText="create new"
            />
          `}
        ${!noFiles &&
          fileList.map(
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
