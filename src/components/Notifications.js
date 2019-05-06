const { html, Component } = require('htm/preact');
const { dispatch } = require('../lib/state/zeroFux');
const timeout = require('../lib/timeout');

// Notifcation component.
class Notification extends Component {
  state = { fadeOut: false };

  async componentDidMount() {
    const { time } = this.props.notification;
    await timeout(3000);
    this.setState({ fadeOut: true });
    await timeout(3000);
    dispatch({
      type: 'removeNotification',
      payload: time,
    });
  }

  render(props, state) {
    const { notification } = props;
    const { fadeOut } = state;
    return html`
      <div class=${`notification${fadeOut ? ' fade-out' : ''}`}>
        <h1>Note</h1>
        ${notification.message}
      </div>
    `;
  }
}

// Notifcations container.
class Notifications extends Component {
  render(props) {
    const { notifications } = props;
    return html`
      <div class="notifications">
        ${notifications.length > 0 &&
          notifications.map(
            notification =>
              html`
                <${Notification} notification=${notification} />
              `
          )}
      </div>
    `;
  }
}

module.exports = Notifications;
