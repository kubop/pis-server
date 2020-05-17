const fs = require('fs')

exports.getAll = function(req, res) {
    fs.readFile('./data/vypozicky.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Internal server error' }) 
        }

        const json_data = JSON.parse(data);
        res.json(json_data)
    });
}

exports.vypozickyCitatela = function(req, res) {
    const body = req.body

    if (!body || !body.citatel) {
        return res.status(400).json({ error: 'Bad request' }) 
    }

    fs.readFile('./data/vypozicky.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Internal server error' }) 
        }

        const json_data = JSON.parse(data);
        const filtered_data = json_data.filter(vypozicka => vypozicka.citatel_id === body.citatel)

        res.json(filtered_data)
    });
}
