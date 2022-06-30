const options = require('./options/mysql')
const knex = require('knex')(options)

knex.from('products').select('*')
    .then( rows => {
        for (const row of rows) {
            console.log(`${row['id']}: ${row['name']} (${row['price']})  (${row['stock']})`);
        }
        console.log(rows);
    })
    .catch(err => console.log(err))
    .finally(() => knex.destroy()) 