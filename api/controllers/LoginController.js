const fs = require('fs')

exports.userLogin = function (req, res) {
    const name = req.name
    const password = req.password


    fs.readFile('./data/citatelia.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Internal server error' })
        }
        const citatelia = JSON.parse(data)
        const mail = citatelia.find(c => c.email == c.name)
        const pass = citatelia.find(c => c.heslo == c.password)

        if (!mail || !pass) {
            return res.status(200).json({ error: 'Nesprávne prihlasovacie údaje' })
        }

        const user = mail.meno

        return res.status(200).json({ "_Vitajte ${meno}"})

    })}