import mongoose from 'mongoose';

const connectDB = async () => {

    mongoose.connection.on('connected', (err) => {
        console.error(`DB Connected`);
    })

    await mongoose.connect(process.env.MONGODB_URI)
}

export default connectDB;