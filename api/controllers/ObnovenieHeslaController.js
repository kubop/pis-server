const { soapRequest } = require('../../helpers/SoapWS.js')
const CitateliaController = require('./CitateliaController.js')

exports.validaciaEmailu = function(req, res) {
    const body = req.body

    if (!body || !body.email) {
        return res.status(400).json({ error: 'Bad request' }) 
    }

    soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/Validator?WSDL', 'validateEmail', {
        email: body.email
    }).then((result) => {
        return res.status(200).json({ valid: result.success })
    }).catch((error) => {
        return res.status(500).json({ error: error.message }) 
    })
}

exports.odoslanieEmailu = function(req, res) {
    const body = req.body

    // Ak v parametroch neprisiel email => zly request
    if (!body || !body.email) {
        return res.status(400).json({ error: 'Bad request' }) 
    }

    CitateliaController.getAll()
    .then((citatelia) => {
        // Nájdeme čitateľa, ktorého email sa zhodnuje s emailom ktorý je v requeste
        const citatel = citatelia.find(c => c.email === body.email)
        if (!citatel) { // Ak sme takéto nenašli => error
            return res.status(200).json({ error: 'Vami zadaná emailová adresa nie je registrovaná v našom systéme' })
        }

        const heslo = citatel.heslo // toto heslo mu chceme poslat na email, asi cez webovu sluzbu stranky
    
        // Odoslanie emailu pomocou webovej sluzby PIS
        soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/NotificationServices/Email?WSDL', 'notify', {
            team_id: 101,
            password: 'SHWWE6',
            email: body.email,
            subject: 'Obnovenie hesla do portálu knižnice',
            message: 'Dobrý deň, Vaše heslo je ' + heslo
        }).then((result) => {
            return res.status(200).json({ email_sent: result.success })
        }).catch((error) => {
            return res.status(500).json({ error: error.message }) 
        })
    })
    .catch((error) => {
        console.log(error)
    })
}

