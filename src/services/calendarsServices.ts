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

export function getBooks() {
  return [
    {
      id: "9781593279509",
      title: "Eloquent JavaScript, Third Edition",
      subtitle: "A Modern Introduction to Programming",
      author: "Marijn Haverbeke",
      published: "2018-12-04T00:00:00.000Z",
      publisher: "No Starch Press",
      pages: 472,
      description:
        "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
      website: "http://eloquentjavascript.net/",
    },
  ];
}
