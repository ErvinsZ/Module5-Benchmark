const express = require("express")
const listEndpoints = require("express-list-endpoints")
const moviesRouter = (require('./movies'))

const server = express()

const port = process.env.PORT || 3001

server.use("/movies",moviesRouter)

console.log(listEndpoints(server))

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})