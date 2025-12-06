import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_AUTH_URI; 

const mongoclient = new MongoClient(URI);

export {mongoclient};
