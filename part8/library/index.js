import { ApolloServer } from '@apollo/server';
import { UserInputError } from 'apollo-server-core';
import { gql } from 'graphql-tag';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import mongoose from 'mongoose'
import { Book } from './models/book.js';
import { Author } from './models/author.js';
import { User } from './models/user.js';
import jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions'
const pubSub = new PubSub();

mongoose.set("strictQuery", false);
const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MONGO DB CONNECTED!");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

// Esquema de graphQL
const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value:String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Subscription {
    bookAdded: Book!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!],
    me: User,
    allBooksByUserGenre: [Book!]
  }
  type Mutation {
    createUser(
      username:String!,
      password:String!,
      favoriteGenre:String!
    ):User
    login(
      username:String!,
      password:String!
    ):Token
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;
// Como se respondera a las consultas
const resolvers = {
  Book: {
    author: async (root) => {
      return Author.findById(root.author);
    },
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      /** en args estan los parametros que llegan */
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author");
      }

      // Construir filtro dinámicamente
      const filter = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          filter.author = author._id;
        }
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }

      return Book.find(filter).populate("author");
    }, // en args esta lo que llega por el nombre del parametro
    allAuthors: async () => {
      // Solución n+1: obtener todos los libros y agrupar por autor en memoria
      const authors = await Author.find({});
      const books = await Book.find({});
      return authors.map(author => ({
        name: author.name,
        id: author._id,
        born: author.born,
        bookCount: books.filter(b => b.author.toString() === author._id.toString()).length,
      }));
    },

    me: (root,args,context) => {
      // En el apollo server, se definio el currentUser en el context, aca accedemos a el
       return context.currentUser
    },
    allBooksByUserGenre: async(root,args,context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
       const userGenre = context.currentUser.favoriteGenre;
       const books = await Book.find({ genres: { $in: [userGenre] } }).populate("author");
       return books;
    }
  },
  Mutation: {
    createUser: async(root,args) => {
       const user = new User({ username: args.username, favoriteGenre:args.favoriteGenre });
       return user.save()
       .catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      })
    },
    login: async(root,args) => {
       const user = await User.findOne({username:args.username});
       if ( !user || args.password !== 'secret' ) {
        // Supongamos que el pass es secret para todos los usuarios
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return {
        value:jwt.sign(userForToken,process.env.JWT_SECRET)
      }
    },
    // Para agregar datos
    addBook: async (root, args,context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        // Significa que no hay sesion
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      try {
        const bookFind = await Book.findOne({ title: args.title });
        if (bookFind) {
          throw new GraphQLError("El titulo de este libro ya existe", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
            },
          });
        }

        // Buscar o crear el autor primero
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({
            name: args.author,
            born: null,
          });
          await author.save();
        }

        // Crear el libro con el ID del autor
        if(args.title.length < 3) {
          throw new GraphQLError("El titulo del libro es demasiado corto", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
            },
          });
        }
        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id, // Usar el ID del autor, no el nombre
          genres: args.genres,
        });
        const savedBook = await book.save();
        const populatedBook = await Book.findById(savedBook._id).populate("author");
        pubSub.publish('BOOK_ADDED', { bookAdded: populatedBook });
        return populatedBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args,context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        // Significa que no hay sesion
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        // Si el author no se encuentra, retorno null
        return null;
      }
      author.born = args.setBornTo;
      return author.save(); // guardamos el author actualizado
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(['BOOK_ADDED'])
    }
  }
};

const server = new ApolloServer({
  typeDefs, // esquema
  resolvers, // resolutores --> definen como se responde a las consultas de graphQL
});

startStandaloneServer(server,{
   listen:{ port: 4000 },
   context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id);
      return { currentUser }
    }
  },
}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})

