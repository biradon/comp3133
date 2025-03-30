const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require('./graphql/index')
require("dotenv").config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors({
    origin: 'http://localhost:4200', 
    credentials: true, 
  }));

// Helper function to connect to MongoDB asynchronously
const connectDB = async () => {
    try {
        console.log(`Attempting to connect to DB`);
        await mongoose.connect(`${process.env.MONGODB_URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log(`Unable to connect to DB: ${error.message}`);
    }
};

// **Start Apollo Server Properly**
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

