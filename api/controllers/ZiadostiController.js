const { soapRequest } = require('../../helpers/SoapWS.js')
const CitateliaController = require('./CitateliaController.js')

const getAllRequest = function(req, res) {
  getAll().then((ziadosti) => {
    res.status(200).json(ziadosti) 
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({ error: error.message }) 
  })
}

const vytvoritNovu = function(req, res) {
  const body = req.body
    
  // Kontrola všetkých potrebných údajov
  if (!body || !body.vypozicka || !body.predlzenie_do || !body.dovod_predlzenia) {
      return res.status(400).json({ error: 'Bad request' }) 
  }

  CitateliaController.getByCitatelID(body.vypozicka.citatel_id)
  .then((citatel) => {
    // Vytvorenie objektu ziadosti
    const today = new Date().toISOString().slice(0, 10) 
    const ziadost = {
      id: 123,
      name: '',
      citatel_id: body.vypozicka.citatel_id,
      knihovnik_id: '',
      vypozicka_id: body.vypozicka.id,
      citatel: `${citatel.meno} ${citatel.priezvisko}`,
      kniha: body.vypozicka.kniha.nazov,
      vypozicana_od: body.vypozicka.datum_od,
      vypozicana_do: body.vypozicka.datum_do,
      predlzenie_do: body.predlzenie_do,
      podana_dna: today.split('-')[2] + '-' + today.split('-')[1] + '-' + today.split('-')[0],
      dovod_citatel: body.dovod_predlzenia,
      dovod_knihovnik: '',
      stav: 0
    }

    // Uloženie ziadosti do DB
    soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/Students/Team101ziadosti?WSDL', 'insert', {
      team_id: 101,
      team_password: 'SHWWE6',
      ziadosti: ziadost
    })
    .then((result) => {
      if (result.id) {
        res.status(200).json({ success: true })

        // Odoslanie emailu
        soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/NotificationServices/Email?WSDL', 'notify', {
            team_id: 101,
            password: 'SHWWE6',
            email: citatel.email,
            subject: 'Žiadosť o predĺženie výpožičky',
            message: 'Dobrý deň, evidujeme Vašu žiadosť o predĺženie výpožičky v našom systéme. O jej priebehu budete informovaný. Ďakujeme, že využívate naše služby' 
        }).catch((error) => {
            console.log(error)
        })
      } else {
        res.status(500).json({ error: 'Unexpected output' })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ error: error.message })
    })
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({ error: error.message })
  })
}

const getAll = function() {
  return new Promise((resolve, reject) => {
      soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/Students/Team101ziadosti?WSDL', 'getAll', null)
      .then((result) => {
          if (result.ziadostis !== null) {
              resolve(result.ziadostis.ziadosti)
          } else {
              resolve([])
          }
      })
      .catch((error) => reject(error))
  })
}

module.exports = {
  getAllRequest,
  getAll,
  vytvoritNovu
}