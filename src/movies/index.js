const express = require("express")
const path = require("path")
const fs = require("fs-extra")
const readFile = require('../utilities')
const { response } = require("express")
const { writeFileSync } = require("fs-extra")
const uniqid = require("uniqid")

const moviesRouter = express.Router()

const moviesFolderPath = path.join(__dirname, "movies.json")

const reviewsFolderPath = path.join(__dirname, "reviews.json")

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
    const excluded = arrayOfMovies.filter(movie => movie.imdbID !== req.params.imdbID)
    //if (arrayOfMovies.length === excluded.length)
    //return res.status(404).send("Movie not Found")

    fs.writeFileSync(moviesFolderPath, JSON.stringify(excluded))
    res.send("Deleted")
})


moviesRouter.post("/:id/reviews", (req, res)=>{
    const arrayOfMovies = readFile(moviesFolderPath)
    const movieFound = arrayOfMovies.find((movie) => movie.imdbID ===req.params.movieimdbID)
    if (arrayOfMovies) {
        const newReview = {...req.body, id: uniqid(),createdAt: new Date()}
        const reviews = readFile(reviewsFolderPath)
        reviews.push(newReview)
        fs.writeFileSync(reviewsFolderPath, reviews)
        res.send("Review posted")
    }

moviesRouter.get("/:id/reviews", (req, res) =>{
    const reviews = readFile(reviewsFolderPath)
    res.send(reviews.filter(review => review.elementId === req.params.imdbID))
})

}
)

module.exports = moviesRouter