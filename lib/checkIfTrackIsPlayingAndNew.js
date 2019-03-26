const commander = require('commander')
const chalk = require('chalk')

const sendMessageToSlack = require('./sendMessageToSlack')

let currentTrack

const checkIfTrackIsPlayingAndNew = track => {
  let trackName

  if (
    track.hasOwnProperty('@attr') &&
    track['@attr'].nowplaying &&
    'true' == track['@attr'].nowplaying
  ) {
    trackName = `\n${track.name} by ${track.artist['#text']} \n${track.url}\n${
      track.image['3']['#text']
    }`
    if (currentTrack != trackName) {
      console.log(chalk.white.bgRed.bold(trackName))
      if (!commander.quiet) {
        sendMessageToSlack(
          track.url,
          track.name,
          track.artist['#text'],
          track.image['3']['#text']
        )
      }
      currentTrack = trackName
    }
  }
}

module.exports = checkIfTrackIsPlayingAndNew
