//Imports
const express = require( 'express' );
const productsRouter = require('./routes/productsRouter');
const router = express.Router();
const fs = require('fs')


//inicializar express
const app = express();

//setting
const PORT = process.env.PORT || 8080;

//middlewares
//json codifica el body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/Products', productsRouter);

//views engine
app.set( 'view engine', 'ejs' );
app.set( 'views', __dirname + '/views' );


//routes
//espacio publico con el form
app.get('/', ( req, res ) => {
    res.render( 'index', { message: '' } );
});

//devuelve todos los productos
router.get('/',( req, res ) => {
    const read = fs.readFileSync( './Products.json', 'utf-8' );
    const products = JSON.parse( read );

    res.render( 'products', { products: products } );
});

//devuelve productos según su ID
router.get('/ :id', ( req, res ) => {
    const id = Number( req.params.id );
    const read = fs.readFileSync( './Products.json', 'utf-8' );

})
 

const server = app.listen(PORT, () => console.log(`Listening ${PORT} ...`))
server.on('error', e => {
    console.log('Server error: ', e)
})
