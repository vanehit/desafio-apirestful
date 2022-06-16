//Imports
const { Router } = require('express');

const Contenedor = require('../contenedor');

const products = new Contenedor('Products.json');

const Messages = new Contenedor('messages.json')


const router = Router();

router.get('/', ( req, res ) => {
    res.send( products.data )
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        return res.status(400).send({ error: 'El parámetro debe ser un número' });
    }

    if (idNumber > products.data.length) {
        return res.status(400).send({ error: 'El parámetro está fuera de rango' });
    }

    if (idNumber > 0) {
        return res.status(400).send({ error: 'El parámetro debe ser mayor a cero' });
    }

    const productss = await products.getById(idNumber);

    if (!productss) {
        return res.status(400).send({ error: `La producto con el id: ${id} no existe` });
    }

    return res.send(productss)
})

router.post('/', async (req, res) =>{
    const { name, title, price, thumbnail } = req.body;

    if (!name || !title || !price|| !thumbnail ) {
        return res.status(400).send({ error: 'Los datos están incompletos'});
    
    }

    await products.save({ name, title, price, thumbnail });

    return res.send({ message: 'Producto agregado exitosamente'})
});

router.put('/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const { field, value } = req.body;
    
        await products.getById(Number(id), field, value);
    
       return  res.send({ message: `El producto con id: ${id} se modificó exitosamente`})
       
    } catch (error) {
        throw error
    }

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const read = fs.readFileSync( './Products.json', 'utf-8' );
    const products = JSON.parse( read );
    
    const idx = products.findIndex( p => p.id == id );

    if( idx === -1 ){
        res.send( 'El producto que desea eliminar no existe' )
    } else {
        products.splice( idx, 1 );

        fs.writeFileSync( './Products.json', JSON.stringify( products, null, '\t' ) );

        res.send(`El producto con id: ${ id } se ha eliminado con éxito`)
    }
});

router.get('/', (req, res) => {

    res.render('messages', { 
        messages: Messages.getAll()
    })
})

module.exports = router;