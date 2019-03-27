// Server
const express = require('express')
const app = express()
var port = process.env.PORT || 3000

// Cors
const cors = require('cors')
app.use(cors())

// Body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get(['url', '/'], (req, res) =>
  res.send({
    foo: 'bar',
  })
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
