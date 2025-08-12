import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Connect to MongoDB database
 */

let isConnected = 0; // 0 = disconnected, 1 = connected

export async function connectToDatabase() {
  if (isConnected) {
    console.log('✅ MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = 1;
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}
