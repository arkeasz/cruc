import mongoose from "mongoose";
import * as config from './index.js';

const connectDB = async () =>   {
    try {
        const conn = await mongoose.connect(config.MONGO_PUBLIC_URL);
        console.log(`✅ MongoDB connect: ${conn.connection.host}`);
    } catch(error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;
