"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const mercurius_1 = __importDefault(require("mercurius"));
const schema_1 = require("./schema/schema");
const resolvers_1 = require("./schema/resolvers");
const config_1 = __importDefault(require("./config/config"));
const shared_1 = require("./shared");
const port = 3000;
const fastify = (0, fastify_1.default)({ logger: true });
fastify.register(mercurius_1.default, {
    schema: schema_1.typeDef,
    resolvers: resolvers_1.resolvers,
    graphiql: true
});
try {
    fastify.listen({ port }, () => {
        console.log(`Server is running on http://localhost:${port}/googleauth`);
    });
}
catch (err) {
    fastify.log.error(err);
    console.log(err);
    process.exit(1);
}
fastify.get('/googleauth', (request, response) => {
    const authUrl = shared_1.oauth2Client.generateAuthUrl({
        access_type: config_1.default.access_type,
        scope: config_1.default.scope
    });
    response.redirect(authUrl);
});
fastify.get('/callbacktoken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const { tokens } = yield shared_1.oauth2Client.getToken(code);
    shared_1.oauth2Client.setCredentials(tokens);
    res.redirect('http://localhost:3000/graphiql');
}));
