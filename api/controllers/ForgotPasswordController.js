const fs = require('fs')
const soap = require('soap')

var validateEmail = function(email, callback) {
    var url = 'http://pis.predmety.fiit.stuba.sk/pis/ws/Validator?WSDL'
    var args = { email: email }

    soap.createClient(url, function(err, client) {
        if (err) {
            return callback(err)
        }

        client.validateEmail(args, function(err, result) {
            if (err) {
                return callback(err)
            }

            if (result.success === true) {
                return callback(null)
            } else {
                return callback('Invalid email format')
            }
        })
    })
}

exports.forgotPassword = function(req, res) {
    const body = req.body

    if (!body || !body.email) {
        return res.status(400).json({ error: 'Bad request' }) 
    } 

    validateEmail(body.email, (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ error: err })
        } else {
            fs.readFile('./data/citatelia.json', 'utf8', function (err, data) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ error: 'Internal server error' }) 
                }
        
                const citatelia = JSON.parse(data);
                
                const citatel = citatelia.find(c => c.email === body.email)
                if (!citatel) {
                    return res.status(200).json({ error: 'User with specified email not found' })
                }
            
                const heslo = citatel.heslo // toto heslo mu chceme poslat na email, asi cez webovu sluzbu stranky
            
                /**
                 * Tu bude kod, ktory cez webovu sluzbu PIS posle na email heslo
                 * EDIT: kurva zistil som ze ta webova sluzba Email na PIS stranke je nejaka kktina čo posiela email tímu alebo čo
                 */
            
            
                return res.status(200).json({ password: heslo }) // Zatial len odosielame heslo ako response, tu bude potom napríklad: { success: true}, to bude znamenat ze email bol uspesne odoslany
            });
        }
    })    
}

