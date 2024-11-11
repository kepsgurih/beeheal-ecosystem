import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';

const connectMongoDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
  } catch (error) {
    throw error;
  }
};

export default connectMongoDB;


export const connectDB = async () => {
  if(mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGODB_URI || '' , {
      useNewUrlParser: true,
      useUnifiedTopology: true
  } as ConnectOptions);


}