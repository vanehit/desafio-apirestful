
const options = require('./options/mysql')
const knex = require('knex')( options );

class contenedorbd {

    constructor(options) {
        this.archivo = options;
        this.data = [];
        const knex = require('knex')({
            client: 'mysql',
            connection: {
                host: '127.0.0.1',
                user: 'root',
                password: 'secret',
                database: 'mibase',
                table: 'Products'
            }
        })

        knex.schema.createTable('products', table => {
            table.increments('id')
            table.string('title')
            table.integer('price')
            table.string('thumbnail')
        })
            .then(() => console.log("table created"))
            .catch(err => { console.log(err); throw err })
            .finally(() => {
                knex.destroy()
            })  
      }
      
      async getAll() {
        await knex.from('products').select('*')
            .then(rows => {
                for (const row of rows) {
                    console.log(`${row['id']}: ${row['title']} ${row['price']} ${row['thumbnail']} `)
                }
                console.log(rows)
            })
            .catch(err => console.log(err))
            .finally(() => knex.destroy())
      
      }
      
      async save(data) {
        await knex('products').insert(data)
        .catch(err => console.log(err))
            .finally(() => knex.destroy())
      }
      
      async getById(id) {
        await knex('products').select([id]).then(rows => {
            for (const row of rows) {
                console.log(`${row['id']}: ${row['first_name']} `)
            }
            console.log(rows)
        })
            .catch(err => console.log(err))
            .finally(() => knex.destroy())
      }
      
      async deleteById() {
        await knex('products').where('id').del()
            .then(() => console.log('data deleted'))
            .catch(err => console.log(err))
            .finally(() => knex.destroy())
      } 
}



module.exports = contenedorbd