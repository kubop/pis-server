const { soapRequest } = require('../../helpers/SoapWS.js')

exports.getAll = function() {
    return new Promise((resolve, reject) => {
        soapRequest('http://pis.predmety.fiit.stuba.sk/pis/ws/Students/Team101citatelia?WSDL', 'getAll', null)
        .then((result) => {
            resolve(result.citatelias.citatelia)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

exports.getFirst = function(req, res) {
    res.json(citatelia[0])
}
