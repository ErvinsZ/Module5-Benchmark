const express = require("express")
const listEndpoints = require("express-list-endpoints")
const movieRouter = (require('./movies'))

const server = express()

const port = process.env.PORT || 3001

server.use("/movies",movieRouter)

console.log(listEndpoints(server))

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})