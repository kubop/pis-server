const express = require('express')
const bodyParser = require('body-parser')

const VypozickyController = require('./api/controllers/VypozickyController.js')
const CitateliaController = require('./api/controllers/CitateliaController.js')
const ForgotPasswordController = require('./api/controllers/ForgotPasswordController.js')

const app = express()
const port = 8081

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// VypozickyController
app.get('/vypozicky', VypozickyController.getAll)
app.post('/vypozicky', VypozickyController.postRequest)

// CitateliaController
app.get('/citatelia', CitateliaController.getAll)

// ForgotPasswordController
app.post('/forgotPassword', ForgotPasswordController.forgotPassword)

app.listen(port, () => console.log(`Backend running on localhost:${port}`))
