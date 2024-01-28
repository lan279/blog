
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    'blog',
    'root',
    'H960205h',
    {
        dialect:"mysql",
        host:"localhost"
    }
)

module.exports = sequelize