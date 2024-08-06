const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the movie name"],
        unique: [true, "Movie already existed"],
    },
    director: {
        type: String,
        required: [true, "Please add the director of the movie"],
    },
    year: {
        type: String,
        required: [true, "Please add the year of publish"],
    },
    genre: {
        type: [String],
    },
    imgData: {
        type: String,
    },
    description: {
        type: String,
        maxLength: 400,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Movie", movieSchema);