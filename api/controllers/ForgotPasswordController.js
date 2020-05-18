const fs = require('fs')
const { soapRequest } = require('../../helpers/SoapWS.js')

exports.verifyEmailAddress = function(req, res) {
    const body = req.body

    if (!body || !body.email) {
        return res.status(400).json({ error: 'Bad request' }) 
    }

    soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/Validator?WSDL', 'validateEmail', {
        email: body.email
    }).then((result) => {
        return res.status(200).json({ valid: result.success })
    }).catch((error) => {
        return res.status(500).json({ error: err.message }) 
    })
}

exports.forgotPassword = function(req, res) {
    const body = req.body

    // Ak v parametroch neprisiel email => zly request
    if (!body || !body.email) {
        return res.status(400).json({ error: 'Bad request' }) 
    } 

    // Nacitame si všetkých čitateľov
    fs.readFile('./data/citatelia.json', 'utf8', function (err, data) {
        if (err) { // Len nejaky error handling
            console.log(err)
            return res.status(500).json({ error: 'Internal server error' }) 
        }

        // načítame si čitateľov vo formáte JSON
        const citatelia = JSON.parse(data)
        
        // Nájdeme čitateľa, ktorého email sa zhodnuje s emailom ktorý je v requeste
        const citatel = citatelia.find(c => c.email === body.email)
        if (!citatel) { // Ak sme takéto nenašli => erreor
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
}

