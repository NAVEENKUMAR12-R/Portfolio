import { getDatabase } from './lib/mongodb.js';

export async function getActiveAdminPassword() {
  const envSecret = process.env.ADMIN_SECRET || 'Naveen1212';
  try {
    if (process.env.MONGODB_URI) {
      const db = await getDatabase();
      const authDoc = await db.collection('admin_auth').findOne({ _id: 'admin_credentials' });
      if (authDoc && authDoc.password) {
        return authDoc.password;
      }
    }
  } catch (e) {
    console.warn('MongoDB auth lookup warning:', e.message);
  }
  return envSecret;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-secret');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const activePassword = await getActiveAdminPassword();

  if (req.method === 'GET') {
    const token = req.headers['x-admin-secret'] || req.query?.token;
    if (token === activePassword || token === (process.env.ADMIN_SECRET || 'Naveen1212')) {
      return res.status(200).json({
        authenticated: true,
        message: 'Session is active and valid.'
      });
    }
    return res.status(401).json({
      authenticated: false,
      message: 'Invalid or expired session.'
    });
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    const { action, password, passcode, currentPassword, newPassword } = body || {};


    // Change Password Action from Admin Panel
    if (action === 'change_password') {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Both current password and new password are required.'
        });
      }

      if (currentPassword !== activePassword && currentPassword !== (process.env.ADMIN_SECRET || 'Naveen1212')) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect.'
        });
      }

      if (newPassword.trim().length < 4) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 4 characters.'
        });
      }

      try {
        if (process.env.MONGODB_URI) {
          const db = await getDatabase();
          await db.collection('admin_auth').updateOne(
            { _id: 'admin_credentials' },
            {
              $set: {
                password: newPassword.trim(),
                updatedAt: new Date().toISOString()
              }
            },
            { upsert: true }
          );
        }

        return res.status(200).json({
          success: true,
          token: newPassword.trim(),
          message: 'Admin password updated successfully in MongoDB database!'
        });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: 'Failed to update password in database: ' + err.message
        });
      }
    }

    // Login Verification Action
    const inputPass = password || passcode;

    if (!inputPass) {
      return res.status(400).json({
        success: false,
        message: 'Passcode is required.'
      });
    }

    if (inputPass === activePassword || inputPass === (process.env.ADMIN_SECRET || 'Naveen1212')) {
      return res.status(200).json({
        success: true,
        authenticated: true,
        token: inputPass,
        message: 'Security Clearance Verified. Welcome to Creator Cockpit.'
      });
    } else {
      return res.status(401).json({
        success: false,
        authenticated: false,
        message: 'Access Denied: Incorrect Admin Passcode.'
      });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
