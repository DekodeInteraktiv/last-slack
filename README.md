# last-slack

Script for sending the currently playing track on Last.fm to a Slack WebHook.

![Screenshot](https://raw.githubusercontent.com/DekodeInteraktiv/last-slack/master/screenshot.png)

*Note: It will not send the last track played, only the one which is currently playing.*

## Requirements

* [Node.js](http://nodejs.org/)
* An API key from Last.fm (found in [your API accounts](http://www.last.fm/api/accounts))
* An Incoming WebHook integration with your Slack account (see the [integrations](https://slack.com/services) page for more details)

## Installation

Install the requirements.

```shell
npm install
```

Copy the **config-example.json** file to **config.json** and change the Last.fm API key and Slack URL to specify your API key and Slack WebHook URL respectively.

```shell
cp config-example.json config.json
```

## Usage

Run the **main.js** script with a Last.fm username and it'll start sending the data to Slack.

```shell
npm start michaelenger
```

Use `--quiet` to prevent sending a message to Slack. The songs will still be shown in the terminal.

```shell
npm start --quiet michaelenger
```

## License

Copyright (c) 2015 Dekode Interaktiv

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
