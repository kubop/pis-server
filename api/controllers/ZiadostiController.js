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