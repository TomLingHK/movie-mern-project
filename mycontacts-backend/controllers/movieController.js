const asyncHandler = require("express-async-handler");
const Movie = require("../models/movieModel");

//@desc Get all movies
//@route GET /api/movies
//@access private
const getMovies = asyncHandler(async (req, res) => {
    // const movies = await Movie.find({user_id: req.user.id});
    const movies = await Movie.find();
    res.status(200).json(movies);
});

//@desc Create new movie
//@route POST /api/movies
//@access private
const createMovie = asyncHandler(async (req, res) => {
    const {name, director, year, description} = req.body;
    if (!name || !director || !year) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const movie = await Movie.create({
        name,
        director,
        year,
        description,
        // user_id: req.user.id
    });
    res.status(201).json(movie);
});

//@desc Get movie
//@route GET /api/movies/:id
//@access private
const getMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        res.status(404);
        throw new Error("Movie not found");
    }
    res.status(200).json(movie);
});

//@desc Update movie
//@route PUT /api/movies/:id
//@access private
const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        res.status(404);
        throw new Error("Movie not found");
    }

    // if (movie.user_id.toString() !== req.user.id) {
    //     res.status(403);
    //     throw new Error("User don't have permission to update other user movies");
    // }

    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedMovie);
});

//@desc Delete new movie
//@route DELETE /api/movies/:id
//@access private
const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        res.status(404);
        throw new Error("Movie not found");
    }

    // if (movie.user_id.toString() !== req.user.id) {
    //     res.status(403);
    //     throw new Error("User don't have permission to update other user movies");
    // }

    await Movie.deleteOne({ _id: req.params.id });
    res.status(200).json(movie);
});


module.exports = { getMovies, createMovie, getMovie, updateMovie, deleteMovie };