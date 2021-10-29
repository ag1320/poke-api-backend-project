const express = require('express')
const app = express()
const morgan = require('morgan');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/api/:pokename', (req, res) => {
    //extract url params
    let name = req.params.pokename

    //call the api
    const fetchData = async () => {
        let url = `https://pokeapi.co/api/v2/pokemon/${name}`
        let response = await fetch(url);
        let result = await response.json();
    }
    fetchData();

    //sanitize the data
    

    res.status(200).send();
})

app.get('/api/:pokename/img', (req, res) => {
    let name = req.params.pokename
    res.status(200).send();
})

app.get('/api/pokemon', (req, res) => {
    res.status(200).send();
})


const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// app.get('/movies', function(req, res) {
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
