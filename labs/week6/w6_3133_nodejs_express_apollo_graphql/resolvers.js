const Movie = require('./models/Movie');
const { gql } = require('apollo-server-express');

const resolvers = {
    Query: {
        getAllMovies: async (_, args) => {
            try {
                const movies = await Movie.find()
                if(movies)
                {
                    return movies
                }
                else
                {
                    return []
                }
            } 
            catch (error) {
                throw new Error(`Error while search all movies: ${error.message}`)
            }
        },
        getMovieById: async (_, {id}) => {
            try {
                const movie = await Movie.findOne({_id : id})
                console.log(movie)
                if(!movie)
                {
                    throw new Error(`Can't find movie with id: ${id}`)
                }
                else
                {
                    return movie
                }
            } 
            catch (error) {
                throw new Error(`Error while getMovieById: ${error.message}`)
            }
        },
    },


    Mutation: {
        addMovie: async (_, {input}) => {
            try {
                const newMovie = new Movie(input)

                await newMovie.save()
                console.log("Add movie successfully!")
                return newMovie
            } 
            catch(error) {
                throw new Error(`Error while add new movie: ${error.message}`)
            }
        },

        updateMovie: async (_, { input }) => {
            try {
                const existingMovie = await Movie.findById(input.id);
                if (!existingMovie) {
                    throw new Error(`Movie with ID ${input.id} not found`);
                }
        
                const updateMovie = await Movie.findOneAndUpdate(
                    input._id, 
                    input, 
                    { new: true} 
                );
                console.log("Updated Successfully:", updateMovie);
                return updateMovie;
        
            } catch (error) {
                throw new Error(`Error while editing movie: ${error.message}`);
            }
        },

        deleteMovie: async(_, {id}) => {
            try {
                const result = await Movie.findByIdAndDelete(id)
                if(result) {
                    console.log("Deleted successfully!")
                    return {
                        success: true,
                        message: `Movie with ID ${id} is deleted`
                    }
                }
                else
                {
                    console.log("Deleted Fail!")
                    return {
                        success: false,
                        message: `Can not find Moive with ID ${id}`
                    }
                } 
            }
            catch(error) {
                throw new Error(`Error while deleting moive: ${error.message}`)
            }
        }
    }
}

module.exports = { resolvers }