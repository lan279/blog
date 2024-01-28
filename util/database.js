
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    'proj',
    'root',
    'Root1234',
    {
        dialect:"mysql",
        host:"localhost"
    }
)

module.exports = sequelize