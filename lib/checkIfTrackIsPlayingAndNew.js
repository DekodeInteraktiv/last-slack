import commander from 'commander';
import chalk from 'chalk';

import sendMessageToSlack from './sendMessageToSlack';

let currentTrack;

export default function checkIfTrackIsPlayingAndNew(track) {
  let trackName;

  if (track.hasOwnProperty('@attr') &&
    track['@attr'].nowplaying &&
    'true' == track['@attr'].nowplaying) {
    trackName = `${track.name} by ${track.artist['#text']} 🎧 \n${track.url}`;
    if (currentTrack != trackName) {
      console.log(chalk.white.bgRed.bold(trackName));
      if (!commander.quiet) {
        sendMessageToSlack(trackName);
      }
      currentTrack = trackName;
    }
  }
}
