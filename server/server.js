// Server
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

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
    app.get('/url', async (req, res) => {
      const url = req.query.url.replace(/ /g, '+')
      try {
        db.get('urls')
          .push({
            id: Date.now().toString(),
            url,
            site: req.query.site,
          })
          .write()
          .then(
            res
              .set({
                'Cache-Control': 'no-store',
              })
              .redirect(301, url)
          )
          .catch(err => console.log(err))
      } catch (err) {
        res.status(500).send({ error: 'an error occured' })
      }
    })
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    )
  })
  .catch(err => console.log(err))
