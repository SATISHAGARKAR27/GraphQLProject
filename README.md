# GraphQL API for Google Calendar and Google People API

This is an explanation of simple Google OAuth2 demonstration app created using Node.js, TypeScript, Fastify, Mercurius, JWT, Google OAuth 2.0. In this application we authenticate user with Google OAuth 2.0 and use the authentication token to call Google API to fetch user data from Google Calendar and Google People APIs

## Getting started

Requirements

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
· Node.js
. TypeScript
. Fastify
. Graphql & Mercurius
. Google OAuth 2.0.
```

## Installation

```
npm install googleapis graphql fastify mercurius typescript nodemon dotenv
```

## Getting Started

## Creating an OAuth 2.0 client ID and secret on the Google Cloud Platform

* First, go to the Google Cloud Platform to create a project.
* Once your project is created, navigate to the “APIs & Services” section of the console.
* Click the “Enable APIs and Services” button.
* Search for and enable the “Google+ API”.
* Click “Create Credentials” and select “OAuth client ID”.
* Select “Web application” as the application type.
* Enter a name for your OAuth client.
* Under “Authorized node origins”, enter the URL of your application’s frontend.
* Under “Authorized redirect URIs”, enter the URL where users should be redirected after logging in.
* Click “Create” to create your OAuth client.
* Your client ID and secret will be displayed on the next screen.

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

### Setup our server
```

import Fastify from "fastify";
import Mercurius from "mercurius";
import { typeDef } from "./schema/schema";
import {resolvers } from "./schema/resolvers"
import localConfig from "./config/config";
import * as fs from "fs-extra";
import { oauth2Client , setAccessTokens} from "./shared";

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
```
### Generate Authentication URL

To access Google APIs behalf on a user, we should get permission and retrieve an access token. For this we should redirect user to a consent page which will state what services the app intend to use.

```
import { google } from "googleapis";
import env  from 'dotenv';

env.config();

  export const oauth2Client=  new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH2_CLIENT_ID,
    process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
   process.env.GOOGLE_OAUTH2_REDIRECT_URL,
  );

fastify.get('/googleauth', (request, response) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/contacts"]
  });
  response.redirect(authUrl);
})


fastify.get('/callbacktoken', async (req:any,res) => {
    const code = req.query.code;
    const { tokens  }= await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.redirect('http://localhost:3000/graphiql')
  });
```
### Setup .env file 

```
GOOGLE_OAUTH2_CLIENT_ID="800925044011-5ondmlf9qgc5u8f0lbdgetrr201h7f7s.apps.googleusercontent.com"
GOOGLE_OAUTH2_CLIENT_SECRET="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"
GOOGLE_OAUTH2_REDIRECT_URL="http://localhost:3000/callbacktoken"
```

Now we’re ready to acquire the refresh token. We’ll run the following command and start the server and redirect URL and if your authenticated then return to your graphQL server.

```
start run dev
```
### Setup GraphQL schema and resolvers
## schema 
```
export const typeDef = `
type Book {
    id:ID!
    title: String!
    author: String!
    website: String!
  }
  type CalendarEvent {
    summary: String!
    kind: String!
    accessRole: String!
    id: String!
  }
  type Contact {
    resourceName: String!
    name: String!
  }
  type ShowName {
    displayName: String!
  }
 
  type Query {
    books: [Book!]!
    calendars: [CalendarEvent!]!
    contacts: [Contact!]!
  }
  type Data {
    access_token: String!
    refresh_token: String!
  }
`;

```

## resolvers
```
import { list, getContact, getBooks } from "../services/calendarsServices" ;

export const resolvers = {
    Query: {
      books: async () => {
        return getBooks();
      },
      calendars: async () => {
        return list();
      },
     contacts: async () => {
        return getContact();
     }
    }
  }
```

### Access Protected Resources

Now our app is authorized to access protected information of the user. To access the protected information we have to call the relevant Google API by passing our authorized oauth2 client.
```
import { google } from "googleapis";
import { oauth2Client } from "../shared";

export async function list() {
  
  const calendarClient = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });
  try {
    const { data: calendars } = await calendarClient.calendarList.list();

    const response = calendars.items.map((calendar) => {
      return calendar;
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getContact() {
  const contectClient = google.people({
    version: "v1",
    auth: oauth2Client,
  });
  try {
    const response = await contectClient.people.connections.list({
      resourceName: "people/me",
      pageSize: 10,
      personFields: "names,emailAddresses",
    });
    let connections = response.data.connections;
    const showData = connections.map((connectionItem) => {
      return {
        resourceName: connectionItem.resourceName || "",
        name: connectionItem.names
          ? connectionItem.names
              .map((name: any) => {
                return name.displayName;
              })
              .toString()
          : ""
      };
    });
    console.log(showData);

    return showData;
  } catch (err) {
    console.log(err);
  }
}
```


