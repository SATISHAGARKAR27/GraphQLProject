"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs-extra"));
const shared_1 = require("./shared");
const port = 3000;
const fastify = (0, fastify_1.default)({ logger: true });
fastify.register(mercurius_1.default, {
    schema: schema_1.typeDef,
    resolvers: resolvers_1.resolvers,
    graphiql: true
});
fastify.get('/googleauth', (request, response) => {
    const authUrl = shared_1.oauth2Client.generateAuthUrl({
        access_type: config_1.default.access_type,
        scope: config_1.default.scope
    });
    response.redirect(authUrl);
});
fastify.get('/callbacktoken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    // await setAccessTokens(code)
    const { tokens } = yield shared_1.oauth2Client.getToken(code);
    fs.writeJson(process.env.TOKEN_PATH, tokens);
    // const { tokens } = tokensValue;
    // console.log("tokens===",tokens);
    shared_1.oauth2Client.setCredentials(tokens);
    res.redirect('http://localhost:3000/graphiql');
}));
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
