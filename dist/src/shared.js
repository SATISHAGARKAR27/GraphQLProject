import { google } from "googleapis";
import localConfig from './config/config.js';
export async function getArgs() {
    if (!localConfig.clientId)
        throw new Error('No clientId ');
    if (!localConfig.clientSecret)
        throw new Error('No clientSecret');
    console.log();
    return { code: localConfig.code, clientId: localConfig.clientId, clientSecret: localConfig.clientSecret, refreshToken: localConfig.refreshToken };
}
export function makeOAuth2Client() {
    const oauth2Client = new google.auth.OAuth2({
        clientId: "800925044011-5ondmlf9qgc5u8f0lbdgetrr201h7f7s.apps.googleusercontent.com",
        clientSecret: "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",
        redirectUri: "http://localhost:3000/callbacktoken"
    });
    return oauth2Client;
}
