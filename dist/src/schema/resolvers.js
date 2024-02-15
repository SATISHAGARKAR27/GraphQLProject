import { list, getContact, getAutToken, authUrl, getBooks } from "../services/calendarsServices.js";
import localConfig from "../config/config.js";
export const resolvers = {
    Query: {
        books: async () => {
            return getBooks();
        },
        calendars: async () => {
            return list();
        },
        authUrl: async () => {
            return authUrl();
        },
        contacts: async () => {
            return getContact();
        }
    },
    Mutation: {
        setOAuthCode: async () => {
            return getAutToken(localConfig.code);
        }
    }
};
