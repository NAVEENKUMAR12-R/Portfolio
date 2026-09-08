import { getDatabase } from './lib/mongodb.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!process.env.MONGODB_URI) {
    return res.status(200).json({
      status: 'offline',
      connected: false,
      message: 'MONGODB_URI is not set. Portfolio will use local defaults.'
    });
  }

  try {
    const db = await getDatabase();
    await db.command({ ping: 1 });
    return res.status(200).json({
      status: 'connected',
      connected: true,
      database: db.databaseName,
      message: 'Successfully connected to MongoDB Atlas.'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      connected: false,
      message: 'Failed to connect to MongoDB: ' + error.message
    });
  }
}
