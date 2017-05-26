import request from 'request-promise-native';
import config from '../config.json';

import checkIfTrackIsPlayingAndNew from './checkIfTrackIsPlayingAndNew';

export default function fetchLastPlayedTrack(username, callback) {
  const options = {
    uri: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
        '&user=' + username +
        '&api_key=' + config.lastfm.apiKey +
        '&format=json',
    json: true
  };

  request(options)
    .then( (data) => {
      if (data.recenttracks && data.recenttracks.track) {
        let track = data.recenttracks.track;
        if (Array.isArray(track)) {
          track = track[0];
        }
        if (callback) {
          callback(track);
        } else {
          console.log(track);
        }
      } else if (data.error && data.message) {
        console.error(data.message);
      } else {
        console.error('Unrecognized data', data);
      }

      setTimeout( () => {
        fetchLastPlayedTrack(username, checkIfTrackIsPlayingAndNew);
      }, 60000);
    })
    .catch( (response) => {
      console.error(response);
      if (response.StatusCodeError != 200) {
        console.error('Unhandled response type:', response.StatusCodeError);
      }
    });
}
