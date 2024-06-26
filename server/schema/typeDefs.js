const typeDefs = `
type Book {
    bookId: String
    authors:[String]
    description :String
    title:String
    image:String
    link:String
}
type User {
    _id:ID
    username:String
    email:String
    password:String
    bookCount:Int
}
type Auth {
    token: ID!
    user: User
}

type Query {
    me(userId:ID!):User
}

type Mutation {
    login(email:String!,password:String!):Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String]!, description: String!, title: String!, bookId: String!, image: String!, link: String, userId: String): Book
    removeBook(bookId: String!, userId: String!): Book
}
`;

module.exports = typeDefs;
