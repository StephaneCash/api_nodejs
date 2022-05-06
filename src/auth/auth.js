const jwt = require('jsonwebtoken')
const primaryKey = require('./private_key')

module.exports = (req, res, next) => {
    const autorization = req.headers.autorization;
}