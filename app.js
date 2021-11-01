const express = require ('express')
const morgan =  require('morgan')
const axios = require('axios')
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


app.get('/api/:pokename', (req, res) => {
    //extract url params
    let name = req.params.pokename
    knex.select('*')
      .from('pokemon')
      .where('name', name)
      .then( data => {
          if(data.length > 0){
        }
      })
    
    //call the api and store the data
    const fetchData  = (name) => {
        let url = `https://pokeapi.co/api/v2/pokemon/${name}`
        axios.get(url)
        .then(function (response) {
            // sanitize - Pokemon: (name, img), Types: (type), Moves: (moves) NEED JOIN TABLE
            let image = response.data["sprites"]["other"]["official-artwork"]["front_default"] 
            let type = response.data.types[0].type.name
            let moves = response.data.moves[0].move.name
            
            //store in db
            knex('pokemon').insert(
                {name: name,
                img: image})
            .then(data => res.status(200).json(data))
                  .catch(err =>
                    res.status(404).json({
                      message:
                        'The data you are looking for could not be found. Please try again'
                    })
                  );
        })
    }
    fetchData(name)                  
    });

app.get('/api/:pokename/img', (req, res) => {
    let name = req.params.pokename
    res.status(200).send();
})

app.get('/api/pokemon', (req, res) => {
    res.status(200).send();
})


const port = 3001
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

