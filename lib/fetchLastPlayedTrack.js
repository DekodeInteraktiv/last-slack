const request = require('request-promise-native');
const config = require('../config.json');

const checkIfTrackIsPlayingAndNew = require('./checkIfTrackIsPlayingAndNew');

const {
  baseUrl,
  apiKey,
  fetchDelay
} = config.lastfm;

function fetchLastPlayedTrack(username, callback) {
  const options = {
    uri: `${baseUrl}&user=${username}&api_key=${apiKey}&format=json`,
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
      }, fetchDelay);
    })
    .catch( (response) => {
      console.error(response);
      if (response.StatusCodeError != 200) {
        console.error('Unhandled response type:', response.StatusCodeError);
      }
    });
}

module.exports = fetchLastPlayedTrack;
