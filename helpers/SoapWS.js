const soap = require('soap')

/**
 * Make a SOAP request
 * @param {string} url      WSDL URI
 * @param {string} method   public method
 * @param {object} args     arguments 
 * 
 * @returns {Promise}
 */
const soapRequest = function (url, method, args) {
  return new Promise((resolve, reject) => {
    soap.createClient(url, (err, client) => {
      if (err) reject(err)
      client[method](args, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  })
}

module.exports = {
  soapRequest
}
