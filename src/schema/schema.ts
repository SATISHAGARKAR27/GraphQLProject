export const typeDef = `
scalar JSON
scalar JSONObject
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
  type Contact {
    resourceName: String!
    name: String!
  }
  type ShowName {
    displayName: String!
  }
 
  type Query {
    books: [Book!]!
    calendars: [CalendarEvent!]!
    contacts: [Contact!]!
  }
  type Data {
    access_token: String!
    refresh_token: String!
  }
  type Mutation {
    setOAuthCode(code: String!): Data!
  }
`;
