import { gql } from '@apollo/client';
export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`;
export const UPDATE_BIRTHDAY = gql`
  mutation updateBirthday($name: String!, $setBornTo: Int!) {
     editAuthor(
      name:$name,
      setBornTo:$setBornTo
     ) {
     name,
     born
  }
  }
`
export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    id
    author {
      name
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
      addBook(
        title:$title,
        published:$published,
        author:$author,
        genres:$genres
      ) {
          title
          author {
           name
          }
        }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const USER_FAVORITE_GENRE = gql`
  query {
  me {
    favoriteGenre
  }
}
`

export const BOOKS_BY_USER_GENRE = gql`
 query {
  allBooksByUserGenre {
    title
    author {
      name
    }
    published
  }
}
`