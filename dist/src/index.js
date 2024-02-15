import Fastify from "fastify";
import Mercurius from "mercurius";
// import { list, getContact, getAutToken, authUrl } from "./services/calendarsServices.js" ;
import { typeDef } from "./schema/schema.js";
import { resolvers } from "./schema/resolvers.js";
import { makeOAuth2Client } from "./shared.js";
import localConfig from "./config/config.js";
const port = 3000;
const fastify = Fastify({ logger: true });
// fastify.get('/googleauth/', (req,res) => {
//   res.send("it's working fine")
// });
fastify.register(Mercurius, {
    schema: typeDef,
    resolvers: resolvers,
    graphiql: true
});
fastify.get('/googleauth', (request, response) => {
    const oauth2Client = makeOAuth2Client();
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: localConfig.access_type,
        scope: localConfig.scope
    });
    response.redirect(authUrl);
});
fastify.get('/callbacktoken', async (req, res) => {
    // res.send("it's working fine")
    let oauth2Client = makeOAuth2Client();
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.redirect('http://localhost:3000/graphiql');
});
fastify.get('/', async function handler(request, reply) {
    return { hello: 'world Satish' };
});
try {
    await fastify.listen({ port }, () => {
        console.log(`Server is running on ${port}`);
    });
}
catch (err) {
    fastify.log.error(err);
    console.log(err);
    process.exit(1);
}
