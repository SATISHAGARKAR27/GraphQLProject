"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = void 0;
exports.typeDef = `
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
`;
