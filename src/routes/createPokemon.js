const { Pokemon } = require('../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');

module.exports = (app) => {
    app.post('/api/pokemons', (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = "Le pokemon a été bien ajouté";
                res.json({ message, data: pokemon })
            }).catch(err => {

                if (err instanceof ValidationError) {
                    return res.status(400).json({ message: err.message, data: err })
                }

                if (err instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: err.message, data: err })
                }

                let message = "Le pokemon n'a pas être ajouté";
                res.status(500).json({ message, data: err })
            })
    })
}