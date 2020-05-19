const { soapRequest } = require('../../helpers/SoapWS.js')

exports.getAll = function() {
    return new Promise((resolve, reject) => {
        soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/Students/Team101citatelia?WSDL', 'getAll', null)
        .then((result) => {
            if (result.citatelias !== null) {
                resolve(result.citatelias.citatelia)
            } else {
                resolve([])
            }
        })
        .catch((error) => reject(error))
    })
}

exports.getByCitatelEmail = function(email) {
    return new Promise((resolve, reject) => {
        soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/Students/Team101citatelia?WSDL', 'getByAttributeValue', {
            attribute_name: 'email',
            attribute_value: email,
            ids: [
                { id: null }
            ]
        })
        .then((result) => {
            if (result.citatelias !== null) {
                resolve(result.citatelias.citatelia)
            } else {
                resolve([])
            }
        })
        .catch((error) => {
            reject(error)
        })
    })
}
