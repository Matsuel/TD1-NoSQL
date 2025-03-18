import mongoose from "mongoose";

export async function connectToMongoDB() {

    if (!process.env.DB_URL) {
        throw new Error("DB_URL is not defined in .env");
    }

    try {
        await mongoose.connect(process.env.DB_URL, {} as mongoose.ConnectOptions);
        console.log("✅ Connected to MongoDB with Mongoose");
    } catch (error) {
        console.error(error);
        throw new Error("❌ Unable to connect to MongoDB with Mongoose");
    }
}
