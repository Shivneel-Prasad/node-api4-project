require('dotenv').config()
// Dependencies
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const serverRouter = require('./api/server')

// INSTANCE OF EXPRESS APP
const server = express()

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

//Connect to Server router
server.use('/api', serverRouter)

//Connect to Server
const port = process.env.PORT || 9000

server.listen(port, () => {
    console.log(`listening on port ${port}`)
  })

// Endpoints
server.get('/', (req, res) => {
    res.send('Welcome to WEB50 Home Page')
})