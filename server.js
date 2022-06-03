//Imports
const express = require( 'express' );
const productsRouter = require('./routes/productsRouter')



//inicializar express
const app = express();


//setting
const PORT = process.env.PORT || 8080


//middlewares
//json codifica el body
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/Products', productsRouter);


//routes
app.get('/', ( req, res ) => {
    res.send({message: 'Server running ok' });
});

 

const server = app.listen(PORT, () => console.log(`Listening ${PORT} ...`))
server.on('error', e => {
    console.log('Server error: ', e)
})
