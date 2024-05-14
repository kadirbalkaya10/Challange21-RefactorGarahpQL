// Import CSS file for styling
import "./App.css";

// Import necessary components and modules
import { Outlet } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Navbar from "./components/Navbar";

// Create a new ApolloClient instance with specified URI and cache
const client = new ApolloClient({
  uri: "/graphql", // Endpoint for GraphQL API
  cache: new InMemoryCache(), // Cache implementation for ApolloClient
});

// Define the main App component
function App() {
  return (
    <>
      {/* Wrap the entire application with ApolloProvider to enable Apollo Client */}
      <ApolloProvider client={client}>
        {/* Render the Navbar component */}
        <Navbar />
        {/* Render the nested routes */}
        <Outlet />
      </ApolloProvider>
    </>
  );
}

// Export the App component as the default export
export default App;
