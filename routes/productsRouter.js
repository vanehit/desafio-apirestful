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

    const products = await products.getById(idNumber);

    if (!products) {
        return res.status(400).send({ error: `La producto con el id: ${id} no existe` });
    }

    return res.send(products)
})

router.post('/', async (req, res)=>{
    const { name, title, price, thumbnail } = req.body;

    if ( !name || !title || !price || !thumbnail) {
        return res.status(400).send({ error: 'Los datos están incompletos' });
    }

    await products.save({ name, title, price, thumbnail });
    await products.init();

    return res.send({ message: 'Producto agregado exitosamente'})
})

router.put('/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const { field, value } = req.body;
    
        await products.editById(Number(id), field, value);
    
        res.send({ message: `El producto con id: ${id} se modificó exitosamente`})
    } catch (error) {
        throw error
    }

})



module.exports = router;