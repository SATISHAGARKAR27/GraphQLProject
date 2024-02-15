
import Fastify from "fastify";
import Mercurius from "mercurius";
import { typeDef } from "./schema/schema";
import {resolvers } from "./schema/resolvers"
import localConfig from "./config/config";
import { oauth2Client } from "./shared";

const port = 3000;

const fastify = Fastify({logger: true})
  fastify.register(Mercurius,{
    schema: typeDef,
    resolvers: resolvers,
    graphiql: true
  });

  try {
    fastify.listen({ port },()=>{
      console.log(`Server is running on http://localhost:${port}/googleauth`);
    })
  } catch (err) {
    fastify.log.error(err);
    console.log(err);
    process.exit(1)
  }

fastify.get('/googleauth', (request, response) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: localConfig.access_type,
    scope: localConfig.scope
  });
  response.redirect(authUrl);
})


fastify.get('/callbacktoken', async (req:any,res) => {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.redirect('http://localhost:3000/graphiql')
  });
