import express from 'express'
import morgan from 'morgan';
import fetch from 'node-fetch'
import knex from './knexfile.js'

//'./knexfile.js'[process.env.NODE_ENV||'development']);

// const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const fetchData  = async (name) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`
    let response = await fetch(url);
    let result = await response.json();
    return result
}

app.get('/api/:pokename', (req, res) => {
    //extract url params
    let name = req.params.pokename

    //call the api
    fetchData(name).then((result) => {
        
        //sanitize - Pokemon: (name, img), Types: (type), Moves: (moves) NEED JOIN TABLE
        let image = result["sprites"]["other"]["official-artwork"]["front_default"]   
        let type = result.types[0].type.name
        let moves = result.moves[0].move.name
        // let max = 5
        // let min = 0
        //(Math.random() * (max - min) + min)
        
        //store in db
        knex('pokemon').insert({name: name},{img: image})
        .then(data => res.status(200).json(data))
              .catch(err =>
                res.status(404).json({
                  message:
                    'The data you are looking for could not be found. Please try again'
                })
              );
                
        
        // knex('user').insert({email: req.body.email})
        // .then( function (result) {
        //     res.json({ success: true, message: 'ok' });     // respond back to request
        //  })
        
        //     knex
        //       .select('*')
        //       .from('movies')
        //       .then(data => res.status(200).json(data))
        //       .catch(err =>
        //         res.status(404).json({
        //           message:
        //             'The data you are looking for could not be found. Please try again'
        //         })
        //       );
        //   });     
    });
})

app.get('/api/:pokename/img', (req, res) => {
    let name = req.params.pokename
    res.status(200).send();
})

app.get('/api/pokemon', (req, res) => {
    res.status(200).send();
})


const port = 3001
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

