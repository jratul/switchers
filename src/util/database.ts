import { MongoClient } from "mongodb";

const mongoURI = process.env.MONGODB_URI || "";

const connectDB = new MongoClient(mongoURI).connect();

export { connectDB };
