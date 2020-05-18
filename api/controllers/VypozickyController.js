const fs = require('fs')
const { soapRequest } = require('../../helpers/SoapWS.js')
const { compareDates } = require('../../helpers/Date.js')
const RezervacieController = require('./RezervacieController.js')

exports.getByCitatelID = function(req, res) {
    const body = req.body

    if (!body || !body.citatel) {
        return res.status(400).json({ error: 'Bad request' }) 
    }

    soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/Students/Team101vypozicky?WSDL', 'getByAttributeValue', {
        attribute_name: 'citatel_id',
        attribute_value: body.citatel,
        ids: [
            { id: null }
        ]
    }).then((result) => {
        return res.status(200).json(result.vypozickys.vypozicky)
    }).catch((error) => {
        return res.status(500).json({ error: error.message }) 
    })
}

exports.predlzenieVypozicky = function(req, res) {
    const body = req.body
    
    if (!body || !body.vypozicka || !body.predlzenie_do || !body.dovod_predlzenia) {
        return res.status(400).json({ error: 'Bad request' }) 
    }

    RezervacieController.getByKnihaID(body.vypozicka.kniha.id)
    .then((rezervacie) => {
        for(let i = 0; i < rezervacie.length; i++) {
            const datum_do = body.vypozicka.datum_do
            const datum_od_r = rezervacie[i].datum_od
            const predlzenie_do = body.predlzenie_do
    
            if (compareDates(datum_od_r, datum_do) >= 0 && compareDates(predlzenie_do, datum_od_r) >= 0) {
                return res.status(200).json({ error: 'Daná kniha je rezervovaná už iným čitateľom' })
            }
        }

        res.status(200).json({ success: true })
    })
    .catch((error) => {
        console.log(error)
    })
}
