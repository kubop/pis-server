const fs = require('fs')

exports.getAll = function(req, res) {
    console.log('GET request /vypozicky')

    fs.readFile('./data/vypozicky.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Internal server error' }) 
        }

        const json_data = JSON.parse(data);
        res.json(json_data)
    });
}

exports.postRequest = function(req, res) {
    console.log('POST request, prisli nam tieto data')
    const body = req.body
    console.log(body)
}
