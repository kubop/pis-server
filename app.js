const express = require('express')
const bodyParser = require('body-parser')

const VypozickyController = require('./api/controllers/VypozickyController.js')
const CitateliaController = require('./api/controllers/CitateliaController.js')

const app = express()
const port = 8081

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/vypozicky', VypozickyController.getAll)
app.post('/vypozicky', VypozickyController.postRequest)

app.get('/citatelia', CitateliaController.getAll)

app.listen(port, () => console.log(`Backend running on localhost:${port}`))
