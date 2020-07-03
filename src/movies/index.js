const express = require("express")
const path = require("path")
const fs = require("fs-extra")
const readFile = require('../utilities')
const { response } = require("express")

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
    const newMovie = {...req.body, createdAt:new Date()}
    console.log(newMovie)

    const arrayOfMovies = readFile(moviesFolderPath)
    arrayOfMovies.push(newMovie)
    fs.writeFileSync(moviesFolderPath, JSON.stringify(arrayOfMovies))

    res.send("OK")
})

moviesRouter.put("/:id", (req, res) => {
    
    const arrayOfMovies = readFile(moviesFolderPath)
    const movieIndex = arrayOfMovies.map(x =>x.imbdID).indexOf(req.params.imbdID)
    if (movieIndex === -1)
    return res.status(404).send("NOT FOUND")

    arrayOfMovies[movieIndex]= {
        ...arrayOfMovies[movieIndex],
        ...req.body
    }

    fs.writeFileSync(moviesFolderPath, JSON.stringify(arrayOfMovies))
    res.status(201).send(arrayOfMovies[movieIndex])
    res.send("OK")
})
moviesRouter.delete("/:id", (req, res) => {
    const arrayOfMovies = readFile(moviesFolderPath)
    const excluded = arrayOfMovies.filter(movie => movie.imbdID !== req.params.imbdID)
    if (arrayOfMovies.length === excluded.length)
    return res.status(404).send("Movie not Found")

    fs.writeFileSync(moviesFolderPath, JSON.stringify(excluded))
    res.send("Deleted")
})

module.exports = moviesRouter