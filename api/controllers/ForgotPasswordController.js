const fs = require('fs')
const soap = require('soap')

exports.verifyEmailAddress = function(req, res) {
    const body = req.body

    if (!body || !body.email) {
        return res.status(400).json({ error: 'Bad request' }) 
    }

    const url = 'http://pis.predmety.fiit.stuba.sk/pis/ws/Validator?WSDL'
    const args = { email: body.email }

    soap.createClient(url, (err, client) => {
        if (err) {
            return res.status(500).json({ error: err.message }) 
        }

        client.validateEmail(args, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message }) 
            }

            if (result.success === true) {
                return res.status(200).json({ valid: true })
            } else {
                return res.status(200).json({ valid: false })
            }
        })
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
    
        /**
         * Tu bude kod, ktory cez webovu sluzbu PIS posle na email heslo
         * EDIT: kurva zistil som ze ta webova sluzba Email na PIS stranke je nejaka kktina čo posiela email tímu alebo čo
         */
    
        return res.status(200).json({ password: heslo }) // Zatial len odosielame heslo ako response, tu bude potom napríklad: { success: true}, to bude znamenat ze email bol uspesne odoslany
    })
}

