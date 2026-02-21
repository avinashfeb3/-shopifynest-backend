import mongoose from 'mongoose';

// Cache the database connection
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

// Database connection function
export const connectDB = async () => {
    // If already connected, return the cached connection
    if (cached.conn) {
        console.log("Using cached database connection");
        return cached.conn;
    }

    // If no promise exists, create a new connection
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/shopifynest`, opts)
            .then((mongoose) => {
                console.log("Database connected successfully");
                return mongoose;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        console.error("Database connection failed:", err);
        throw err; // Throw error instead of process.exit for serverless
    }

    return cached.conn;
}