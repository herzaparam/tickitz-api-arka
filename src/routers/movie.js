const express = require('express')
const router = express.Router()
const moviesController = require('../controller/movie')
const { uploadMulter } = require('../middleware/uploadimg')
const { cacheAllNowMovies, cacheAllUpMovies,   clearAllMovies } = require('../middleware/redis')
const { verifyAcces, roleAdmin } = require('../middleware/auth')

router
    .get('/now-showing',  moviesController.getLimNowMovies)
    .get('/now-showing/viewall', cacheAllNowMovies, moviesController.getAllNowMovies)
    .get('/upcoming-movies',  moviesController.getLimUpMovies)
    .get('/upcoming-movies/viewall', cacheAllUpMovies, moviesController.getAllUpMovies)
    .get('/:id', moviesController.getMoviesById)
    .post('/', verifyAcces, roleAdmin, uploadMulter.single('image'), moviesController.insertMovies)
    .put('/:id', verifyAcces, roleAdmin, uploadMulter.single('image'), moviesController.updateMovies)
    .delete('/:id', verifyAcces, roleAdmin, moviesController.deleteMovies)

module.exports = router
