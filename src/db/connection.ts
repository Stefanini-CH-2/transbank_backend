import mongoose from 'mongoose';
import 'dotenv/config'

const url = process.env.MONGO_URL || "mongodb://localhost:27017/transbank"

export const connectDB = async () => {
    try {
        await mongoose.connect(url.toString());
        console.log('MongoDB connected');
    } catch (err) {
        console.error((err as Error).message);
        process.exit(1);
    }
};