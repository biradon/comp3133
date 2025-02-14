const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//import ApolloServer
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require('./schema')
const { resolvers } = require("./resolvers")


//Store sensitive information to env variables
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT
//mongoDB Atlas Connection String
const mongodb_atlas_url = process.env.MONGODB_URL;

//TODO - Replace you Connection String here
const connectDB = async() => {
    try{
      mongoose.connect(mongodb_atlas_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(success => {
        console.log('Success Mongodb connection')
      }).catch(err => {
        console.log('Error Mongodb connection')
      });
    } catch(error) {
        console.log(`Unable to connect to DB : ${error.message}`);
      }
  }

//Define Apollo Server


//Define Express Server
const app = express();
app.use(express.json());
app.use('*', cors());

//Add Express app as middleware to Apollo Server
const startServer = async () => {
  const server = new ApolloServer({typeDefs, resolvers});
  await server.start(); 
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
      connectDB(); // Start DB connection after server is ready
  });
};

// Start everything
startServer();


