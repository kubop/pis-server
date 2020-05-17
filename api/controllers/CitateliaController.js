exports.getAll = function(req, res) {
    res.json(citatelia)
}

exports.getFirst = function(req, res) {
    res.json(citatelia[0])
}
