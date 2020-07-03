const express = require("express")
const { response } = require("express")

const moviesRouter = express.Router()

moviesRouter.get("/", (req, res) => {
    response.send("OK")
})
moviesRouter.get("/:id")
moviesRouter.post("/")
moviesRouter.put("/:id")
moviesRouter.delete("/:id")

module.exports = moviesRouter