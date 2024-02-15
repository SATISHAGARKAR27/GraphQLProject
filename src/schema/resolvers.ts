import { list, getContact, getBooks } from "../services/calendarsServices" ;
import localConfig from "../config/config";

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
    // Mutation: {
    //     setOAuthCode: async () => {
    //     return getAutToken(localConfig.code);
    //   }
    // }
  }