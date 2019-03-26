const config = require('../config')
const axios = require('axios')
const chalk = require('chalk')

const { username, icon, url } = config.slack

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

  const options = {
    method: 'post',
    url,
    data: payload,
  }

  axios(options)
    .then(response => {
      if (response.status === 200 && response.statusText === 'OK') {
        console.log(chalk.white.bgGreen.bold('Successfully posted to Slack'))
      }
    })
    .catch(error => console.error(error))
}

module.exports = sendMessageToSlack
