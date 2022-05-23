const express = require("express");
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json())

sequelize.initDB()

require('./src/routes/findAlldata')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/findByPk')(app)
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);

// Gestion des erreurs 404

app.use(({ res }) => {
    const message = "Impossible de trouver la ressouce demandée.";
    res.status(404).json(message)
})

app.listen(port, () => console.log('Notre application est démarrée sur : http:localhost:', port));