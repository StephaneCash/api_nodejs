const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {

            if (pokemon === null) {
                const message = `Le pokemon demandé n'existe pas`;
                return res.status(404).json({ message, data: pokemon })
            }

            const pokemonDeleted = pokemon;

            return Pokemon.destroy({
                where: { id: req.params.id }
            }).then(() => {
                const message = `Le pokemon ${req.params.id} a été bien supprimé`;
                res.json({ message, data: pokemonDeleted })
            }).catch(err => {
                let message = "Le pokemon n'a pas être supprimé";
                res.status(500).json({ message, data: err })
            })
        })
    })
}