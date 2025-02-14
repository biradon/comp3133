const { gql } = require('apollo-server-express');
const Movie = require('./models/Movie')

const typeDefs = gql`

    type Movie {
        id: ID!
        name: String!
        director_name: String!
        production_house: String!
        release_date: String!
        rating: Int!
    }

    type Query {
        getAllMovies:[Movie]
        getMovieById(id: ID): Movie
    }

    type MutationResponse {
        success: Boolean!
        message: String!
    }

    input MovieInput {
        id: ID
        name: String!
        director_name: String!
        production_house: String!
        release_date: String!
        rating: Int!
    }

    type Mutation {
        addMovie(input: MovieInput): Movie
        updateMovie(input: MovieInput): Movie
        deleteMovie(id: ID!): MutationResponse
    }
`
module.exports = { typeDefs }