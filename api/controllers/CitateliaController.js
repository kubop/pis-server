const citatelia = [
    { 
        id: 1,
        meno: 'Jakub',
        priezvisko: 'Pernica',
        email: 'pernica.jakub@gmail.com',
        telefonne_cislo: null,
        heslo: 'moje_heslo',
        typ_oznamenia: 1
    },
    { 
        id: 2,
        meno: 'Patrik',
        priezvisko: 'Tománek',
        email: 'patrikwet@gmail.com',
        telefonne_cislo: null,
        heslo: 'lol',
        typ_oznamenia: 1
    }
]

exports.getAll = function(req, res) {
    res.json(citatelia)
}

exports.getFirst = function(req, res) {
    res.json(citatelia[0])
}
