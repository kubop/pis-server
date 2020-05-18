const { soapRequest } = require('../../helpers/SoapWS.js')

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

  res.json({ success: true })
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