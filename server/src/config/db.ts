import mongoose from "mongoose";

import { configureMongooseSecurity } from "../middleware/security.middleware";

const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined");
  }

  if (mongoUri.includes("<db_password>") || mongoUri.includes("YOUR_PASSWORD")) {
    throw new Error("Replace the MongoDB password placeholder in MONGO_URI");
  }

  configureMongooseSecurity();

  const connection = await mongoose.connect(mongoUri, {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
  });

  await mongoose.connection.db?.admin().command({ ping: 1 });
  console.log(`MongoDB connected: ${connection.connection.host}`);
};

export const disconnectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();
  console.log("MongoDB disconnected");
};

export default connectDB;
