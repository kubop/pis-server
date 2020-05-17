const fs = require('fs')

exports.getAll = function(req, res) {
    fs.readFile('./data/vypozicky.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Internal server error' }) 
        }

        const json_data = JSON.parse(data);
        res.json(json_data)
    });
}

exports.vypozickyCitatela = function(req, res) {
    const body = req.body

    if (!body || !body.citatel) {
        return res.status(400).json({ error: 'Bad request' }) 
    }

    fs.readFile('./data/vypozicky.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Internal server error' }) 
        }

        var json_data = JSON.parse(data);
        var filtered_data = json_data.filter(vypozicka => vypozicka.citatel_id === body.citatel)

        // Ku kazdej vypozicke pripojime knihu
        fs.readFile('./data/knihy.json', 'utf8', function (err, knihy) {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: 'Internal server error' }) 
            }

            var json_knihy = JSON.parse(knihy)

            var vypozicky_s_knihami = filtered_data.map(vypozicka => {
                return test = {
                    ...vypozicka,
                    kniha: json_knihy.find(k => k.id === vypozicka.kniha_id)
                }
            })

            res.json(vypozicky_s_knihami)
        })
    });
}

exports.predlzenieVypozicky = function(req, res) {
    const body = req.body
    
    if (!body || !body.vypozicka || !body.predlzenie_do || !body.dovod_predlzenia) {
        return res.status(400).json({ error: 'Bad request' }) 
    }

    // Overenie ci je možné predĺžiť
    res.status(200).json({ success: true })
}
