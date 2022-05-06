const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                const message = `Le pokemon ${req.params.id} a été bien trouvé`;
                res.json({ message, data: pokemon })
            }).catch(err=>{
                let message = "Le pokemon n'a pas être trouvé";
                res.status(500).json({ message, data : err})
            })
    })
}