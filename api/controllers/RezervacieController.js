const { soapRequest } = require('../../helpers/SoapWS.js')

exports.getAll = function() {
    return new Promise((resolve, reject) => {
        soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/Students/Team101rezervacie?WSDL', 'getAll', null)
        .then((result) => {
          if (result.rezervacies !== null) {
            resolve(result.rezervacies.rezervacy)
          } else {
            resolve([])
          }
        })
        .catch((error) => reject(error))
    })
}

exports.getByKnihaID = function(id) {
  return new Promise((resolve, reject) => {
      soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/Students/Team101rezervacie?WSDL', 'getByAttributeValue', {
        attribute_name: 'kniha_id',
        attribute_value: id,
        ids: [
            { id: null }
        ]
      })
      .then((result) => {
        if (result.rezervacies !== null) {
          resolve(result.rezervacies.rezervacy)
        } else {
          resolve([])
        }
      })
      .catch((error) => reject(error))
  })
}
