const config = require('../config')
const axios = require('axios')
const chalk = require('chalk')

const { username, icon, hookUrl } = config.slack

const url = trackUrl => {
  const url = trackUrl.split('/')
  return `${url[url.length - 3]}+${url[url.length - 1]}`
}

const sendMessageToSlack = (trackUrl, trackName, trackArtist, trackImage) => {
  const youtubeQuery = `https://www.youtube.com/results?search_query=${url(
    trackUrl
  )}`
  const bandcampQuery = `https://bandcamp.com/search?q=${encodeURI(
    trackArtist
  )}`
  const googleQuery = `https://www.google.com/search?q=${url(trackUrl)}`
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/url'
      : `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/url`

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
                url: `${baseUrl}?url=${youtubeQuery}&site=yt`,
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Search on Bandcamp',
                },
                url: `${baseUrl}?url=${bandcampQuery}&site=bd`,
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Search on Google',
                },
                url: `${baseUrl}?url=${googleQuery}&site=goo`,
              },
            ],
          },
        ],
      },
    ],
  }

  axios({
    method: 'post',
    url: hookUrl,
    data: payload,
  })
    .then(response => {
      if (response.status === 200 && response.statusText === 'OK') {
        console.log(chalk.white.bgGreen.bold('Successfully posted to Slack'))
      }
    })
    .catch(error => console.error(error))
}

module.exports = sendMessageToSlack
