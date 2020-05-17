const soap = require('soap')

const citatelia = [
    { 
        id: 1,
        meno: 'Jakub',
        priezvisko: 'Pernica',
        email: 'pernica.jakub@gmail.com',
        telefonne_cislo: null,
        heslo: 'moje_heslo',
        typ_oznamenia: 1
    },
    { 
        id: 2,
        meno: 'Patrik',
        priezvisko: 'Tománek',
        email: 'patrikwet@gmail.com',
        telefonne_cislo: null,
        heslo: 'lol',
        typ_oznamenia: 1
    }
]

exports.forgotPassword = function(req, res) {
    const body = req.body

    if (!body || !body.email) {
        return res.status(400).json({ error: 'Bad request' }) 
    } 

    var url = 'http://pis.predmety.fiit.stuba.sk/pis/ws/Validator?WSDL'
    var args = { email: body.email }
    soap.createClient(url, function(err, client) {
        client.validateEmail(args, function(err, result) {
            console.log(result)
        })
    })

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
}
