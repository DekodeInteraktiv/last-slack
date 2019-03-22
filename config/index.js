module.exports = {
  lastfm: {
    baseUrl: process.env.BASE_URL,
    apiKey: process.env.LASTFM_API_KEY,
    fetchDelay: process.env.FETCH_DELAY,
  },
  slack: {
    url: process.env.SLACK_HOOK_URL,
    username: process.env.SLACK_BOT_USERNAME,
    icon: process.env.SLACK_BOT_ICON,
  },
}
