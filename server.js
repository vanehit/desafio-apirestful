

const router = express.Router();

const Contenedor = require('./contenedor')

let DBfile = "./Products.json";

const fs = require('fs');

const PORT = process.env.PORT || 8080

const app = express();

const contenedor = new Contenedor(DBfile)

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/public/index.html' )
});

  router.get('/api/Products', (req, res) => {
      const data = contenedor.getAll()

      res.json(data);
  });

  router.get('/api/Products/:id', async (req, res) => { {}
    try{
        const data = await contenedor.getAllPromise()

        const numero = Math.floor(Math.random() * data.length)
        
        const item = data[numero]

        res.json(item)
    } catch (e) {
        res.status(500)
        res.send(e)
    }

})

router.post('/api/Products', (req, res) => {
    const newData = req.body
    console.log(newData)
    contenedor.save(newData)

    res.send("Se registro satisfactoriamente")
})

router.put('/api/Products/:id', (req, res) => {
    const user = getUser(req.params.userId)

    if (!user) return res.status(404).json({})
   
    user.name = req.body.name
    res.json(user)
})

router.delete('/api/Products/:id', (req, res) => {
    const id = Number(req.params.id)
    contenedor.deleteById(id)

    res.send('Eliminado satisfactoriamente')
})

const server = app.listen(PORT, () => console.log(`Listening ${PORT} ...`))
server.on('error', e => {
    console.log('Server error: ', e)
})
