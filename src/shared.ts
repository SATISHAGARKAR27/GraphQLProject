import { google } from "googleapis";
import env  from 'dotenv';
import * as fs from "fs-extra";

env.config();
console.log("process.env.GOOGLE_OAUTH2_CLIENT_ID",process.env.GOOGLE_OAUTH2_CLIENT_ID);

  export const oauth2Client=  new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH2_CLIENT_ID,
    process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
   process.env.GOOGLE_OAUTH2_REDIRECT_URL,
  );

  export async function fetchAccessTokens() {
    
    if (await fs.pathExists(process.env.TOKEN_PATH)) {
      const tokens = await fs.readFileSync(process.env.TOKEN_PATH, "UTF-8");
      console.log("tokens===",tokens);
      // logger.debug(`Found cached tokens ${TOKEN_PATH}`);
      if (tokens) return JSON.parse(tokens);
    }
    console.error("No tokens found - please authorize");
    return "";
  }

  export async function setAccessTokens(code) {
    console.log("setAccessTokens===###",code);
    
    const setCredentialsValue = await oauth2Client.getToken(code);
    console.log("setCredentialsValue===",setCredentialsValue);
    fs.writeJson(process.env.TOKEN_PATH, setCredentialsValue);
    console.error("No tokens found - please authorize");
    return "";
  }