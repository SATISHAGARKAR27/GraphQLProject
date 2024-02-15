import Fastify from "fastify";
import Mercurius from "mercurius";
import { list, getContact } from "./services/calendarsServices.js" ;
import { typeDef } from "./schema/schema.js";
import localConfig from "./config/config.js";
const port = 3000;

const fastify = Fastify({logger: true})

function getBooks() {
    return [
              {
                  "id":"9781593279509",
                  "title":"Eloquent JavaScript, Third Edition",
                  "subtitle":"A Modern Introduction to Programming",
                  "author":"Marijn Haverbeke",
                  "published":"2018-12-04T00:00:00.000Z",
                  "publisher":"No Starch Press",
                  "pages":472,
                  "description":"JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
                  "website":"http://eloquentjavascript.net/"
              }
            ]
}

const resolvers = {
    Query: {
      books: async () => {
        return getBooks();
      },
      calendars: async () => {
        return list();
      },
    //  authUrl: async () => {
    //     return authUrl();
    //  },
     contacts: async () => {
        return getContact();
     }
    },
    // Mutation: {
    //     getAutToken: async () => {
    //     return getAutToken(localConfig.code);
    //   }
    // }
  }

  fastify.register(Mercurius,{
    schema: typeDef,
    resolvers: resolvers,
    graphiql: true
  });

  fastify.get('/', async function handler (request, reply) {
    return { hello: 'world Satish' }
  })

  fastify.get('/booka', async function handler (request, reply) {
    reply.send(getBooks())
  })
  
  try {
    await fastify.listen({ port },()=>{
      console.log(`Server is running on ${port}`);
    })
  } catch (err) {
    fastify.log.error(err);
    console.log(err);
    process.exit(1)
  }
