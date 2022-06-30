const options = require('./options/mysql')
const knex = require('knex')(options)

const products = [
   // {name: 'R2', age: 12},
   // {name: 'Javier Perez', age: 20},
   // {name: 'Joaquin Boto', age: 30},
   // {name: '[tutor] Diego', age: 52}
]

knex('products').insert(products)
    .then(() => console.log("data inserted"))
    .catch(err => console.log(err))
    .finally(() => knex.destroy()) 