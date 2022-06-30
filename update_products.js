const options = require('./options/mysql')
const knex = require('knex')(options)


knex.from('products')
    .where('name', '=', '')
    .update({})

    .then(() => console.log("data updated"))
    .catch(err => console.log(err))
    .finally(() => knex.destroy()) 