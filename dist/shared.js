"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth2Client = void 0;
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("process.env.GOOGLE_OAUTH2_CLIENT_ID", process.env.GOOGLE_OAUTH2_CLIENT_ID);
exports.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_OAUTH2_CLIENT_ID, process.env.GOOGLE_OAUTH2_CLIENT_SECRET, process.env.GOOGLE_OAUTH2_REDIRECT_URL);
// export async function fetchAccessTokens() {
//   if (await fs.pathExists(process.env.TOKEN_PATH)) {
//     const tokens = await fs.readFileSync(process.env.TOKEN_PATH, "UTF-8");
//     console.log("tokens===",tokens);
//     // logger.debug(`Found cached tokens ${TOKEN_PATH}`);
//     if (tokens) return JSON.parse(tokens);
//   }
//   console.error("No tokens found - please authorize");
//   return "";
// }
// export async function setAccessTokens(code) {
//   const setCredentialsValue = await oauth2Client.getToken(code);
//   console.log("setCredentialsValue===",setCredentialsValue);
//   fs.writeJson(process.env.TOKEN_PATH, setCredentialsValue);
//   console.error("No tokens found - please authorize");
//   return "";
// }
