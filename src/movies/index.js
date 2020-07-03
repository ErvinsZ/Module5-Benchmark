const express = require("express")
const path = require("path")
const readFile = require('../utilities')

const moviesRouter = express.Router()

const moviesFolderPath = path.join(__dirname, "movies.json")

moviesRouter.get("/", (req, res) => {

    const arrayOfMovies = readFile(moviesFolderPath)
    
    res.send(arrayOfMovies)
})
moviesRouter.get("/:movieimdbID", (req, res) => {
    const arrayOfMovies = readFile(moviesFolderPath)
    console.log("Movie ID", req.params.movieimdbID)
    const movieFound = arrayOfMovies.find((movie) => movie.imdbID ===req.params.movieimdbID)
    console.log(movieFound)
    res.send("OK")
})
moviesRouter.post("/", (req, res) => {
    res.send("OK")
})
moviesRouter.put("/:id", (req, res) => {
    res.send("OK")
})
moviesRouter.delete("/:id", (req, res) => {
    res.send("OK")
})

module.exports = moviesRouter