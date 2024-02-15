export const typeDef = `
type Book {
    id:ID!
    title: String!
    author: String!
    website: String!
  }
  type CalendarEvent {
    summary: String!
    kind: String!
    accessRole: String!
    id: String!
  }

  type Query {
    books: [Book!]!
    calendars: [CalendarEvent!]!
  }
`;
