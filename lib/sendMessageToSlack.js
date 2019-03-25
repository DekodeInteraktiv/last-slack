const config = require('../config')
const axios = require('axios')
const chalk = require('chalk')

const { username, icon, url } = config.slack

const sendMessageToSlack = message => {
  const payload = {
    text: message,
    username,
    icon_emoji: icon,
  }

  const options = {
    method: 'post',
    url,
    data: payload,
  }

  axios(options)
    .then(response => {
      if (response.status === 200 && response.statusText === 'OK') {
        console.log(chalk.white.bgGreen.bold('Successfully posted to slack'))
      }
    })
    .catch(error => console.error(error))
}

module.exports = sendMessageToSlack
