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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = exports.getContact = exports.list = void 0;
const googleapis_1 = require("googleapis");
const shared_1 = require("../shared");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        const calendarClient = googleapis_1.google.calendar({
            version: "v3",
            auth: shared_1.oauth2Client,
        });
        try {
            const { data: calendars } = yield calendarClient.calendarList.list();
            const response = calendars.items.map((calendar) => {
                return calendar;
            });
            return response;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.list = list;
function getContact() {
    return __awaiter(this, void 0, void 0, function* () {
        const contectClient = googleapis_1.google.people({
            version: "v1",
            auth: shared_1.oauth2Client,
        });
        try {
            const response = yield contectClient.people.connections.list({
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
                            .map((name) => {
                            return name.displayName;
                        })
                            .toString()
                        : ""
                };
            });
            console.log(showData);
            return showData;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getContact = getContact;
function getBooks() {
    return [
        {
            id: "9781593279509",
            title: "Eloquent JavaScript, Third Edition",
            subtitle: "A Modern Introduction to Programming",
            author: "Marijn Haverbeke",
            published: "2018-12-04T00:00:00.000Z",
            publisher: "No Starch Press",
            pages: 472,
            description: "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            website: "http://eloquentjavascript.net/",
        },
    ];
}
exports.getBooks = getBooks;
