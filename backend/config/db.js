import mongoose from 'mongoose';

export const DBConnect = async (url, cb) => {
    try {
        const connect = await mongoose.connect(url);
        console.log(`MongoDB connected successfully to the host: ${connect.connection.host}`);
        cb(); // callback function to start the server after successful connection
    }
    catch(err) {
        console.log(err.message);
        process.exit(1); // process code 1 means exit with failure, 0 means success
    }
}