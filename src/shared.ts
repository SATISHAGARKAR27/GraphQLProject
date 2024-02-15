import { google } from "googleapis";
import env  from 'dotenv';

env.config();

  export const oauth2Client=  new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH2_CLIENT_ID,
    process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
   process.env.GOOGLE_OAUTH2_REDIRECT_URL,
  );