const CitateliaController = require('../../api/controllers/CitateliaController.js')

exports.Auth = {
  AuthService: {
    AuthPort: {
      login: function(args, callback) {
        // Kontrola argumentov
        if (!args.email || !args.password) {
          throw {
            Fault: {
              Code: {
                Value: 'soap:Sender',
                Subcode: { value: 'rpc:BadArguments' }
              },
              Reason: { Text: 'Missing required argument' }
            }
          }
        }

        // Vyhľadanie citatela v DB podľa emailu a hesla
        CitateliaController.getByCitatelEmail(args.email)
        .then((result) => {
          if (result.length === 1) {
            if (result[0].heslo === args.password) {
              return callback({ success: true })
            }
          }
          return callback({ success: false })
        })
        .catch((error) => {
          return callback({ success: false })
        })
      }
    }
  }
}
