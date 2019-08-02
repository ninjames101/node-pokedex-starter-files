const express = require('express')
const PORT = 8000
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const pokedex = require('./pokedex.json')
require('dotenv').config()


const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  next()
})

app.get('/pokemon',(req,res,next) => {
  const {name,type} = req.query
  let pokemon = pokedex.pokemon
  
  if (name){
    console.log(name)
    pokemon = pokedex.pokemon.filter(pokemon => {
       return pokemon.name.toLowerCase().includes(name.toLowerCase())
    })
  }
  if(type){
    pokemon = pokedex.pokemon.filter(digimon => {
      return digimon.type.map(type => {
        return type.toLowerCase()
      }).includes(type.toLowerCase())
    })
  }
    res.json({pokemon})
})
app.get('/types', (req,res,next) => {
 const validTypes = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water']
 res.json({validTypes})
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})