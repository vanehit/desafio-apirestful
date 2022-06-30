const options = require ('./options/mysql')

//parámetros de conexión

const knex = require ('knex') (options)

knex.schema.createTable('productos', table =>{
    table.increments('id')
            table.string('title')
            table.integer('price')
            table.string('thumbnail')
            table.integer('stock')
})

.then(()=> console.log('table created'))
.catch(err=> {console.log(err); throw err})
.finally(()=>{
    knex.destroy()
    
})