// Server
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Logs
const morgan = require('morgan')
app.use(morgan('dev'))

// Cors
const cors = require('cors')
app.use(cors())

// Body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Create database instance and start server
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const adapter = new FileAsync('db.json')

low(adapter)
  .then(db => {
    app
      .post('/slack', async (req, res) => {
        const { status, statusText, data } = req.body
        console.log(status, statusText, data)
        try {
          db.get('messages')
            .push({
              id: Date.now().toString(),
              status,
              statusText,
              data,
            })
            .write()
            .then(() =>
              res.send({
                status,
                statusText,
                data,
              })
            )
            .catch(error => console.log(error))
        } catch (error) {
          res.status(500).send({ error: 'an error occured' })
        }
      })
      .get('/slack', async (req, res) => {
        try {
          const counter = db
            .get('messages')
            .size()
            .value()
          res.status(200).send({ counter })
        } catch (error) {
          res.status(500).send({ error: 'an error occured' })
        }
      })
  })
  .then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}`))
  })
  .catch(error => console.log(error))
