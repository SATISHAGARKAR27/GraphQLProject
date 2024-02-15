import { list, getContact, getBooks } from "../services/calendarsServices" ;

export const resolvers = {
    Query: {
      books: async () => {
        return getBooks();
      },
      calendars: async () => {
        return list();
      },
     contacts: async () => {
        return getContact();
     }
    }
  }