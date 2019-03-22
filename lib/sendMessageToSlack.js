const config = require('../config')
const request = require('request-promise-native')

const { username, icon, url } = config.slack

const sendMessageToSlack = message => {
  let payload = {
    text: message,
    username: username,
    icon_emoji: icon,
  }

  let options = {
    method: 'POST',
    url,
    form: {
      payload: JSON.stringify(payload),
    },
  }

  request(options)
    .then(response => {
      if (response === 'ok') {
        console.log('Successfully posted to slack')
      }
    })
    .catch(response => {
      console.error(response)
      if (response.StatusCodeError != 200) {
        console.error('Unhandled response type:', response.StatusCodeError)
      }
    })
}

module.exports = sendMessageToSlack
