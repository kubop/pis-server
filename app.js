const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const soap = require('soap')

// Our WSDL 
const AuthWSDL = require('fs').readFileSync('./wsdl/Auth/Auth.wsdl', 'utf8');
const { Auth } = require('./wsdl/Auth/Auth.js')

// Controllers
const VypozickyController = require('./api/controllers/VypozickyController.js')
const CitateliaController = require('./api/controllers/CitateliaController.js')
const ObnovenieHeslaController = require('./api/controllers/ObnovenieHeslaController.js')
const ZiadostiController = require('./api/controllers/ZiadostiController.js')
const KnihyController = require('./api/controllers/KnihyController.js')

const app = express()
const port = 8081

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Vypozicky
app.post('/api/vypozicky/getByCitatelID', VypozickyController.getByCitatelID)
app.post('/api/vypozicky/predlzenieVypozicky', VypozickyController.predlzenieVypozicky)

// Knihy
app.post('/api/knihy/getByIDs', KnihyController.getByIDs)

// Citatelia
// app.get('/citatelia', CitateliaController.getAll)

// Ziadosti
app.get('/api/ziadosti/getAll', ZiadostiController.getAllRequest)
app.post('/api/ziadosti/vytvoritNovu', ZiadostiController.vytvoritNovu)

// ForgotPassword
app.post('/api/obnovenie-hesla/validaciaEmailu', ObnovenieHeslaController.validaciaEmailu)
app.post('/api/obnovenie-hesla/odoslanieEmailu', ObnovenieHeslaController.odoslanieEmailu)

app.listen(port, () => {
    console.log(`Backend running on localhost:${port}`)

    // WebService Auth
    soap.listen(app, '/wsdl/Auth', Auth, AuthWSDL, () => console.log('WSDL Service Auth started'))
})
