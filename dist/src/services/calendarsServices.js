import { google } from "googleapis";
import { getArgs, makeOAuth2Client } from "../shared.js";
import localConfig from "../config/config.js";
// import envVars from "../config/envVars.js";
// const GOOGLE_OAUTH2_CLIENT_ID = envVars().GOOGLE_OAUTH2_CLIENT_ID;
// const GOOGLE_OAUTH2_CLIENT_SECRET = envVars().GOOGLE_OAUTH2_CLIENT_SECRET;
// const GOOGLE_OAUTH2_REDIRECT_URL = envVars().GOOGLE_OAUTH2_REDIRECT_URL;
// const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// const TOKEN_PATH = envVars().TOKEN_PATH;
// const authClient = new google.auth.OAuth2(
//   GOOGLE_OAUTH2_CLIENT_ID,
//   GOOGLE_OAUTH2_CLIENT_SECRET,
//   GOOGLE_OAUTH2_REDIRECT_URL
// );
const { refreshToken } = await getArgs();
const oauth2Client = makeOAuth2Client();
async function makeCalendarClient() {
    console.log("in makeCalendarClient");
    oauth2Client.setCredentials({
        refresh_token: refreshToken
    });
    return oauth2Client;
}
export async function list() {
    const oauth2Client = await makeCalendarClient();
    const calendarClient = google.calendar({
        version: "v3",
        auth: oauth2Client,
    });
    try {
        const { data: calendars } = await calendarClient.calendarList.list();
        const response = calendars.items.map(calendar => {
            return calendar;
        });
        return response;
    }
    catch (err) {
        console.log(err);
    }
}
;
export async function getAutToken(code) {
    console.log("getAutToken code", code);
    console.log("oauth2Client======", oauth2Client);
    const tokens = await oauth2Client.getToken(code);
    console.log("tokens======", tokens);
    return tokens;
}
;
export const authUrl = async () => {
    const authUrl = await oauth2Client.generateAuthUrl({
        access_type: localConfig.access_type,
        scope: localConfig.scope
    });
    return authUrl;
};
export async function getContact() {
    const oauth2Client = await makeCalendarClient();
    const contectClient = google.people({
        version: "v1",
        auth: oauth2Client,
    });
    try {
        const response = await contectClient.people.connections.list({
            'resourceName': 'people/me',
            'pageSize': 10,
            'personFields': 'names,emailAddresses'
        });
        const connections = response.data.connections;
        console.log(connections);
        return connections;
    }
    catch (err) {
        console.log(err);
    }
}
;
export function getBooks() {
    return [
        {
            "id": "9781593279509",
            "title": "Eloquent JavaScript, Third Edition",
            "subtitle": "A Modern Introduction to Programming",
            "author": "Marijn Haverbeke",
            "published": "2018-12-04T00:00:00.000Z",
            "publisher": "No Starch Press",
            "pages": 472,
            "description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "website": "http://eloquentjavascript.net/"
        }
    ];
}
