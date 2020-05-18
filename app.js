const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const soap = require('soap')

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
app.get('/citatelia', CitateliaController.getAll)

// Ziadosti
app.get('/ziadosti', ZiadostiController.getAll)

// ForgotPassword
app.post('/api/obnovenie-hesla/validaciaEmailu', ObnovenieHeslaController.validaciaEmailu)
app.post('/api/obnovenie-hesla/odoslanieEmailu', ObnovenieHeslaController.odoslanieEmailu)

app.listen(port, () => {
    console.log(`Backend running on localhost:${port}`)

    /**
     * Príprava na vlastne WS
    soap.listen(app, '/wsdl', myService, xml, () => {
        console.log('Soap server started')
    })
    */
})

/**
 * Priprava na vlastne WS
const xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

const myService = {
    ValidatorService: {
        ValidatorPort: {
            validateEmail: function(args) {
                console.log('here')
                return {
                    success: true
                }
            }
        }
    }
}
*/
