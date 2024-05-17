// Import necessary modules and utilities
const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

// Define resolvers object
const resolvers = {
  // Define Query object within resolvers
  Query: {
    // Define 'me' resolver function
    me: async (parent, { userId }) => {
      // Retrieve user data by userId
      return User.findById(userId);
    },
  },

  // Define Mutation object within resolvers
  Mutation: {
    // Define 'login' resolver function
    login: async (parent, { email, password }) => {
      // Find user by email
      const user = await User.findOne({ email });

      // If user not found, throw authentication error
      if (!user) {
        throw AuthenticationError;
      }

      // Check if password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If password is incorrect, throw authentication error
      if (!correctPw) {
        throw AuthenticationError;
      }

      // Generate JWT token for user
      const token = signToken(user);
      // Return token and user data
      return { token, user };
    },

    // Define 'addUser' resolver function
    addUser: async (parent, { username, email, password }) => {
      console.log("Adding new user:", username, email);
      try {
        // Log information about adding new user

        // Create new user in database
        const user = await User.create({ username, email, password });

        // Generate JWT token for user
        const token = signToken(user);
        console.log(user);
        // Return token and user data
        return { token, user };
      } catch (error) {
        // Log any errors that occur
        console.error("Error adding user:", error);

        // Throw an error to propagate it back to the client
        throw new Error("Failed to add user");
      }
    },

    // Define 'saveBook' resolver function
    saveBook: async (
      parent,
      { authors, description, title, bookId, image, link, userId }
    ) => {
      // Update user's savedBooks array by adding a new book
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            savedBooks: { authors, description, title, bookId, image, link },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      // Log updated user data
      console.log(user);
      // Return updated user data
      return user;
    },

    // Define 'removeBook' resolver function
    removeBook: async (parent, { bookId, userId }) => {
      // Update user's savedBooks array by removing a book with given bookId
      const user = await User.findByIdAndUpdate(userId, {
        $pull: {
          savedBooks: { bookId },
        },
      });
      // Return updated user data
      return user;
    },
  },
};

// Export resolvers object
module.exports = resolvers;
