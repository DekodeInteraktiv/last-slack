const axios = require('axios')
const config = require('../config')

const checkIfTrackIsPlayingAndNew = require('./checkIfTrackIsPlayingAndNew')

const { baseUrl, apiKey, fetchDelay } = config.lastfm

const fetchLastPlayedTrack = (username, callback) => {
  // const options = {
  //   uri: `${baseUrl}&user=${username}&api_key=${apiKey}&format=json`,
  //   json: true,
  // }

  const options = {
    method: 'get',
    url: `${baseUrl}&user=${username}&api_key=${apiKey}&format=json`,
  }

  axios(options)
    .then(response => {
      const { data } = response
      if (data.recenttracks && data.recenttracks.track) {
        let track = data.recenttracks.track
        if (Array.isArray(track)) {
          track = track[0]
        }
        if (callback) {
          callback(track)
        } else {
          console.log(track)
        }
      } else if (data.error && data.message) {
        console.error(data.message)
      } else {
        console.error('Unrecognized data', data)
      }

      setTimeout(() => {
        fetchLastPlayedTrack(username, checkIfTrackIsPlayingAndNew)
      }, fetchDelay)
    })
    .catch(error => {
      console.error(error)
      if (error.status != 200) {
        console.error('Unhandled response type:', response.status)
      }
    })
}

module.exports = fetchLastPlayedTrack
