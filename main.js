var request = require("request"),
	commander = require("commander"),
	config = require("./config.json"),
	currentTrack;

function fetchLastPlayedTrack(username, callback) {
	var url = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
			"&user=" + username +
			"&api_key=" + config.lastfm.apiKey +
			"&format=json",
		data;

	request(url, function (error, response, body) {
		if (error) {
			console.error(error);
		} else if (response.statusCode != 200) {
			console.error("Unhandled response type:", response.statusCode);
		} else {
			try {
				data = JSON.parse(body);
				if (callback) {
					callback(data.recenttracks.track[0]);
				} else {
					console.log(data.recenttracks.track[0]);
				}
				setTimeout(function () {
					fetchLastPlayedTrack(username, checkIfTrackIsPlayingAndNew);
				}, 10000);
			} catch (e) {
				console.error(e);
			}
		}
	});
}

function checkIfTrackIsPlayingAndNew(track) {
	var trackName;

	if (track.hasOwnProperty("@attr") &&
		track["@attr"].nowplaying &&
		"true" == track["@attr"].nowplaying) {
		trackName = "\"" + track.name + "\" by " + track.artist["#text"];

		if (currentTrack != trackName) {
			console.log(trackName);
			sendMessageToSlack(trackName);
			currentTrack = trackName;
		}
	}
}

function sendMessageToSlack(message) {
	var payload = {
			text: message,
			username: config.slack.username,
			icon_emoji: config.slack.icon
		},
		url = config.slack.url;

		request.post({
			url: url,
			form: { payload: JSON.stringify(payload) }
		}, function(error, response, body) {
			if (error) {
				console.error(error);
			} else if (response.statusCode != 200) {
				console.error("Unhandled response type:", response.statusCode);
			}
		});
}

// Parse args
commander
	.version("1.0.0")
	.usage("[options] <username>")
	.parse(process.argv);

if (!commander.args.length) {
	commander.help();
}

fetchLastPlayedTrack(commander.args[0], checkIfTrackIsPlayingAndNew);
