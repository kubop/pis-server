const { soapRequest } = require('../../helpers/SoapWS.js')

exports.getByIDs = function(req, res) {
  const body = req.body

  if (!body || !body.ids) {
      return res.status(400).json({ error: 'Bad request' }) 
  }

  soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/Students/Team101knihy?WSDL', 'getByAttributeValue', {
      attribute_name: 'name',
      attribute_value: '',
      ids: body.ids
  }).then((result) => {
      return res.status(200).json(result.knihys.knihy)
  }).catch((error) => {
      return res.status(500).json({ error: error.message }) 
  })
}
