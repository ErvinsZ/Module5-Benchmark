const express = require("express")
const listEndpoints = require("express-list-endpoints")
const moviesRouter = (require('./movies'))
const cors = require("cors")

const server = express()

const port = process.env.PORT || 3001

server.use(cors())
server.use(express.json())

server.use("/movies",moviesRouter)


console.log(listEndpoints(server))

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})