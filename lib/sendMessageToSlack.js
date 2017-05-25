import config from '../config.json';
import request from 'request';

const {
  username,
  icon,
  url
} = config.slack;

export default function sendMessageToSlack(message) {
  let payload = {
    text: message,
    username: username,
    icon_emoji: icon
  };

  request.post({
    url,
    form: { payload: JSON.stringify(payload) }
  }, (error, response) => {
    if (error) {
      console.error(error);
    } else if (response.statusCode != 200) {
      console.error('Unhandled response type:', response.statusCode);
    }
  });
}
