const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const VypozickyController = require('./api/controllers/VypozickyController.js')
const CitateliaController = require('./api/controllers/CitateliaController.js')
const ForgotPasswordController = require('./api/controllers/ForgotPasswordController.js')
const ZiadostiController = require('./api/controllers/ZiadostiController.js')

const app = express()
const port = 8081
const corsOptions = {
    origin: "http://localhost:8080"
}

app.use(cors(/* corsOptions */))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// VypozickyController
app.get('/vypozicky', VypozickyController.getAll)
app.post('/vypozicky', VypozickyController.vypozickyCitatela)

// CitateliaController
app.get('/citatelia', CitateliaController.getAll)

// Ziadosti
app.get('/ziadosti', ZiadostiController.getAll)

// ForgotPasswordController
app.post('/verifyEmailAddress', ForgotPasswordController.verifyEmailAddress)
app.post('/forgotPassword', ForgotPasswordController.forgotPassword)

app.listen(port, () => console.log(`Backend running on localhost:${port}`))
