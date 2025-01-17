import { Client, Databases, Account } from "appwrite";

export const db = "67807181002769121b8d";
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('678070960035ca902a14');

export const account = new Account(client);

export const databases = new Databases(client);