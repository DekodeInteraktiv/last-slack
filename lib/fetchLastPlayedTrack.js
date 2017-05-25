import request from 'request';
import config from '../config.json';

import checkIfTrackIsPlayingAndNew from './checkIfTrackIsPlayingAndNew';

export default function fetchLastPlayedTrack(username, callback) {
  let url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
      '&user=' + username +
      '&api_key=' + config.lastfm.apiKey +
      '&format=json',
    data,
    track;

  request(url, (error, response, body) => {
    if (error) {
      console.error(error);
    } else if (response.statusCode != 200) {
      console.error('Unhandled response type:', response.statusCode);
    } else {
      try {
        data = JSON.parse(body);
        if (data.recenttracks && data.recenttracks.track) {
          track = data.recenttracks.track;

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
      } catch (e) {
        console.error(e, body);
      }
    }
  });
}
