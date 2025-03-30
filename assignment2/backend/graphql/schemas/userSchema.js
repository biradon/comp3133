const { gql } = require("apollo-server-express")


const userTypeDefs = gql`
    scalar DateTime

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        created_at: DateTime!
        updated_at: DateTime!
    }


    input UserInput {
        username: String
        email: String
        password: String
    }

    type Query{
        login(email: String, username: String, password: String): User
    } 

    type Mutation {
        signup(input: UserInput!): User
    }
`

module.exports = userTypeDefs