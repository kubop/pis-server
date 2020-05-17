const fs = require('fs')
const { compareDates } = require('../../helpers/Date.js')

exports.getAll = function(req, res) {
    fs.readFile('./data/vypozicky.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Internal server error' }) 
        }

        const json_data = JSON.parse(data);

        fs.readFile('./data/knihy.json', 'utf8', function (err, knihy) {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: 'Internal server error' }) 
            }

            var json_knihy = JSON.parse(knihy)

            var vypozicky_s_knihami = json_data.map(vypozicka => {
                return {
                    ...vypozicka,
                    kniha: json_knihy.find(k => k.id === vypozicka.kniha_id)
                }
            })

            fs.readFile('./data/citatelia.json', 'utf8', function (err, citatelia) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ error: 'Internal server error' }) 
                }

                var json_citatelia = JSON.parse(citatelia)

                var vypozicky_s_citatelmi = vypozicky_s_knihami.map(vypozicka => {
                    return {
                        ...vypozicka,
                        citatel: json_citatelia.find(c => c.id === vypozicka.citatel_id)
                    }
                })

                res.json(vypozicky_s_citatelmi)
            })
        })
    })
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

    // Overenie či kniha nie je rezervovaná
    const kniha = body.vypozicka.kniha

    fs.readFile('./data/rezervacie.json', 'utf8', function (err, rezervacie) {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Internal server error' }) 
        }

        var json_rezervacie = JSON.parse(rezervacie).filter(r => r.kniha_id === kniha.id && r.stav === 1)

        for(let i = 0; i < json_rezervacie.length; i++) {
            const datum_do = body.vypozicka.datum_do
            const datum_od_r = json_rezervacie[i].datum_od
            const predlzenie_do = body.predlzenie_do
    
            if (compareDates(datum_od_r, datum_do) >= 0 && compareDates(predlzenie_do, datum_od_r) >= 0) {
                return res.status(200).json({ error: 'Daná kniha je rezervovaná už iným čitateľom' })
            }
        }

        res.status(200).json({ success: true })
    })
}
