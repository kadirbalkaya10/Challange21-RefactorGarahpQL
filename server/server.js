// Import necessary modules
const express = require("express");
const path = require("path");
const db = require("./config/connection");
// const routes = require("./routes");

// Import necessary modules for Apollo Server
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./schemas");

// Create an instance of Express
const app = express();

// Define the port number
const PORT = process.env.PORT || 3001;

// Create a new instance of ApolloServer with defined type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Function to start the Apollo Server
const startApolloServer = async () => {
  // Start the Apollo Server
  await server.start();

  // Middleware for parsing URL-encoded and JSON request bodies
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Attach Apollo Server middleware to '/graphql' endpoint
  app.use("/graphql", expressMiddleware(server));

  // Serve static assets from 'client/dist' in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    // Route all other requests to the client's index.html in production
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // When database connection is open, start the Express server
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Start the Apollo Server
startApolloServer();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Serve static assets from 'client/build' in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// // Use defined routes
// app.use(routes);

// // Start the Express server when database connection is open
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
