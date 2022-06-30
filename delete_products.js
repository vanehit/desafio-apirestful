const options = require('./options/mysql')
const knex = require('knex')(options)

knex.from('products')
    .where('', '>', 40)
    .del()

    .then(() => console.log("data deleted"))
    .catch(err => console.log(err))
    .finally(() => knex.destroy()) 