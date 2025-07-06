import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Using existing database connection");
      return;
    }
    await mongoose.disconnect();
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Database connection failed");
  }
}

export { dbConnect };