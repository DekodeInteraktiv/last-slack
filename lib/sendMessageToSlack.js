const config = require('../config')
const axios = require('axios')
const chalk = require('chalk')

const { username, icon, hookUrl } = config.slack

const sendMessageToSlack = (trackUrl, trackName, trackArtist, trackImage) => {
  const trackUrlParams = trackUrl => {
    const trackUrlParamsArray = trackUrl.split('/')
    return `${trackUrlParamsArray[trackUrlParamsArray.length - 3]}+${
      trackUrlParamsArray[trackUrlParamsArray.length - 1]
    }`
  }
  const payload = {
    text: `*<${trackUrl}|${trackName} by ${trackArtist}>*`,
    username,
    icon_emoji: icon,
    attachments: [
      {
        blocks: [
          {
            type: 'image',
            title: {
              type: 'plain_text',
              text: 'Cover',
            },
            image_url: trackImage,
            alt_text: 'Example Image',
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Search on YouTube',
                },
                url: `https://www.youtube.com/results?search_query=${trackUrlParams(
                  trackUrl
                )}`,
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Search on Bandcamp',
                },
                url: `https://bandcamp.com/search?q=${encodeURI(trackArtist)}`,
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Search on Google',
                },
                url: `https://www.google.com/search?q=${trackUrlParams(
                  trackUrl
                )}`,
              },
            ],
          },
        ],
      },
    ],
  }
  const serverUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/slack'
      : `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/slack`

  axios({
    method: 'post',
    url: hookUrl,
    data: payload,
  })
    .then(response => {
      if (response.status === 200 && response.statusText === 'OK') {
        console.log(
          chalk.white.bgGreen.bold('✅  Message successfully posted to Slack')
        )
        const { status, statusText, data } = response
        axios({
          method: 'post',
          url: serverUrl,
          data: {
            status,
            statusText,
            data,
          },
        })
          .then(response => {
            const { status, statusText, data } = response.data
            console.log(
              chalk.white.bgGreen.bold(
                '👍  Status successfully posted to the tracking server',
                status,
                statusText,
                data
              )
            )
          })
          .catch(error =>
            console.log(
              chalk.white.bgRed.bold(
                '👎  Status unsuccessfully posted to the tracking server',
                error
              )
            )
          )
      }
    })
    .catch(error => {
      console.log(
        chalk.white.bgRed.bold('⚠️  Message unsuccessfully posted to Slack')
      )
      const { status, statusText, data } = error.response
      axios({
        method: 'post',
        url: serverUrl,
        data: {
          status,
          statusText,
          data,
        },
      })
        .then(response => {
          const { status, statusText, data } = response.data
          console.log(
            chalk.white.bgGreen.bold(
              '👍  Status successfully posted to the tracking server',
              status,
              statusText,
              data
            )
          )
        })
        .catch(error =>
          console.log(
            chalk.white.bgRed.bold(
              '👎  Status unsuccessfully posted to the tracking server',
              error
            )
          )
        )
    })
}

module.exports = sendMessageToSlack
