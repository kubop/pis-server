const nejakeVypozicky = [
    { 
        id: 1,
        stav: '',
        cas_vytvorenia: '123345678',
        datum_od: '15-01-2020',
        datum_do: '21-01-2020',
        dovod_citatel: null,
        dovod_knihovnik: null,
        citatel_id: 5
    },
    { 
        id: 2,
        stav: '',
        cas_vytvorenia: '123345678',
        datum_od: '12-01-2020',
        datum_do: '15-01-2020',
        dovod_citatel: null,
        dovod_knihovnik: null,
        citatel_id: 5
    }
]

exports.getAll = function(req, res) {
    console.log('GET request')
    res.json(nejakeVypozicky)
}

exports.postRequest = function(req, res) {
    console.log('POST request, prisli nam tieto data')
    const body = req.body
    console.log(body)
}
