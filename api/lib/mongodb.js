import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000
};


let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  // In development/build without DB configured, clientPromise will be null
  clientPromise = null;
} else {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR.
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode (Vercel Serverless), create a client outside handler to reuse connection
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export async function getDatabase() {
  if (!clientPromise) {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    client = new MongoClient(process.env.MONGODB_URI, options);
    clientPromise = client.connect();
  }
  const clientConn = await clientPromise;
  const dbName = process.env.MONGODB_DB_NAME || 'portfolio_db';
  return clientConn.db(dbName);
}

export default clientPromise;
