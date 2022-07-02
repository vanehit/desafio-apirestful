//Imports
const express = require( 'express' );
const productsRouter = require('./routes/productsRouter');
const router = express.Router();
const fs = require('fs')
const { Server } = require("socket.io");
const http = require( 'http' );

const sqlite = require( './contenedor_messages' );

//inicializar express
const app = express();
const httpServer = http.createServer( app );
const io = new Server( httpServer );


//setting
const PORT = process.env.PORT || 8080;

//middlewares
//json codifica el body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use( express.static( './public' ) )


//views engine
app.set( 'view engine', 'ejs' );
app.set( 'views', __dirname + '/views' );

//websockets:
let date = new Date();

const messages = [
  { author: 'vanesasoria.com@gmail.com', msg: 'Hola mundo!', date: date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString() },
  { author: 'example@gmail.com', msg: 'Hola mundo!', date: date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString() }
]

io.on( 'connection', ( socket ) => {
  console.log( 'Usuario conectado, ID: ' + socket.id );

	const read = fs.readFileSync( './Products.json', 'utf-8' );
	const products = JSON.parse( read );
	socket.emit( 'products', products );
	socket.emit( 'messages', messages );

	socket.on( 'newProduct', ( newProduct ) => {
		const read = fs.readFileSync( './Products.json', 'utf-8' );
    const products = JSON.parse( read );
    const productsId = products.map( p => p.id );
    newProduct.id = Math.max( ...productsId ) + 1;

    products.push( newProduct );
		fs.writeFileSync( './Products.json', JSON.stringify( products, null, '\t' ) );

    io.sockets.emit( 'products', products );
  });

	socket.on( 'newMessage', ( newMessage ) => {
		messages.push( newMessage );
    io.sockets.emit( 'messages', messages );
  });
});


//routes
//espacio publico con el form
app.get('/', ( req, res ) => {
    res.render( 'pages/index', { message: '' } );
});

app.get('/', (req, res) => {

    res.render('messages', { 
        messages: contenedorMessages.getAll()
    })
})

//devuelve todos los productos
router.get('/',( req, res ) => {
    const read = fs.readFileSync( './Products.json', 'utf-8' );
    const products = JSON.parse( read );

    res.render( 'productos', { products: products } );
});

//devuelve productos según su ID
router.get('/ :id', ( req, res ) => {
    const id = Number( req.params.id );
    const read = fs.readFileSync( './Products.json', 'utf-8' );

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
    
        await products.getElementById(Number(id), field, value);
    
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

app.use('/api/Products', productsRouter);

const server = app.listen(PORT, () => console.log(`Listening ${PORT} ...`))
server.on('error', e => {
    console.log('Server error: ', e)
})
