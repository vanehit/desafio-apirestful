//Imports
const { Router } = require('express');

const Contenedor = require('../contenedor');

const products = new Contenedor('Products.json');

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

    if (idNumber < 0) {
        return res.status(400).send({ error: 'El parámetro debe ser mayor a cero' });
    }
//no se si esta bien getById
    const productss = await products.getById(idNumber);

    if (!products) {
        return res.status(400).send({ error: `La producto con el id: ${id} no existe` });
    }

    return res.send(productss)
})

router.post('/', async (req, res)=>{
    const { name, title, price, thumbnail } = req.body;

    if ( !name || !title || !price || !thumbnail) {
        return res.status(400).send({ error: 'Los datos están incompletos' });
    }

    await products.save({ name, title, price, thumbnail });

    return res.send({ message: 'Producto agregado exitosamente'})
})

router.put('/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const { field, value } = req.body;
    
        await products.getById(Number(id), field, value);
    
        res.send({ message: `El producto con id: ${id} se modificó exitosamente`})
    } catch (error) {
        throw error
    }

})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const idx = data.findIndex(d => d.id == id)
    data.splice(idx, 1)

    res.send("El producto se ha eliminado con éxito")
})


module.exports = router;