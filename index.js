import commander from 'commander';

import checkIfTrackIsPlayingAndNew from './lib/checkIfTrackIsPlayingAndNew';
import fetchLastPlayedTrack from './lib/fetchLastPlayedTrack';

// Parse args
commander
  .version('1.0.0')
  .usage('[options] <username>')
  .option('-q, --quiet', 'Don\'t send message to Slack')
  .parse(process.argv);

if (!commander.args.length) {
  commander.help();
}

fetchLastPlayedTrack(commander.args[0], checkIfTrackIsPlayingAndNew);
