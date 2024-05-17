// Import gql function from Apollo Client
import { gql } from "@apollo/client";

// Define GraphQL mutation for logging in a user
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        bookCount
        email
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
        username
      }
    }
  }
`;

// Define GraphQL mutation for adding a user
export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        bookCount
        email
        username
      }
    }
  }
`;

// Define GraphQL mutation for saving a book
export const SAVE_BOOK = gql`
  mutation saveBook(
    $authors: [String]!
    $description: String!
    $title: String!
    $bookId: String!
    $image: String!
    $link: String
    $userId: String
  ) {
    saveBook(
      authors: $authors
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      link: $link
      userId: $userId
    ) {
      _id
      bookCount
      email
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }
`;

// Define GraphQL mutation for removing a book
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!, $userId: String!) {
    removeBook(bookId: $bookId, userId: $userId) {
      _id
      bookCount
      email
      username
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`;
