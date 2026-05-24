import mongoose from "mongoose";

let connectionPromise = null;

export function useMongoLeads() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectMongo() {
  if (!useMongoLeads()) return null;
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "karyo",
    });
  }
  await connectionPromise;
  return mongoose.connection;
}
