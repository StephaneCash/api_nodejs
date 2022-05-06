const { Pokemon } = require('../db/sequelize');
const { ValidationError } = require('sequelize');

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id;
        Pokemon.update(req.body, {
            where: { id: id }
        }).then(() => {
            return Pokemon.findByPk(id).then(pokemon => {

                if (pokemon === null) {
                    const message = `Le pokemon demandé n'existe pas`;
                    return res.status(404).json({ message, data: pokemon })
                }

                const message = `Le pokemon ${id} a été modifié avec succès`;
                res.json({ message, data: pokemon })
            })
        }).catch(err => {
            if (err instanceof ValidationError) {
                return res.status(400).json({ message: err.message, data: err })
            }
            let message = "Le pokemon n'a pas être modifié";
            res.status(500).json({ message, data: err })
        })
    })
}