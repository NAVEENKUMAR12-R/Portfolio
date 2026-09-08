import { getDatabase } from './lib/mongodb.js';
import { getActiveAdminPassword } from './auth.js';
import {
  personalInfo as initialPersonal,
  skillsData as initialSkills,
  experienceData as initialExperience,
  projectsData as initialProjects,
  competitiveProgrammingData as initialCP,
  achievementsData as initialAchievements,
  leadershipData as initialLeadership
} from '../src/data/portfolioData.js';


const DEFAULT_CONFIG = {
  _id: 'main_portfolio',
  personalInfo: initialPersonal,
  skillsData: initialSkills,
  experienceData: initialExperience,
  projectsData: initialProjects,
  competitiveProgrammingData: initialCP,
  achievementsData: initialAchievements,
  leadershipData: initialLeadership,
  lastUpdated: new Date().toISOString()
};

export default async function handler(req, res) {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-secret');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check if MongoDB URI is available
  if (!process.env.MONGODB_URI) {
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        source: 'local_defaults',
        message: 'MONGODB_URI not configured yet. Serving defaults.',
        data: DEFAULT_CONFIG
      });
    } else {
      return res.status(503).json({
        success: false,
        message: 'MONGODB_URI environment variable is not configured. Unable to persist to database.'
      });
    }
  }

  try {
    const db = await getDatabase();
    const collection = db.collection('portfolio_data');

    if (req.method === 'GET') {
      let doc = await collection.findOne({ _id: 'main_portfolio' });

      if (!doc) {
        // Auto-seed initial default data if collection is empty
        const initialDoc = {
          ...DEFAULT_CONFIG,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
        await collection.insertOne(initialDoc);
        doc = initialDoc;
      }

      return res.status(200).json({
        success: true,
        source: 'mongodb',
        data: {
          personalInfo: doc.personalInfo || initialPersonal,
          skillsData: doc.skillsData || initialSkills,
          experienceData: doc.experienceData || initialExperience,
          projectsData: doc.projectsData || initialProjects,
          competitiveProgrammingData: doc.competitiveProgrammingData || initialCP,
          achievementsData: doc.achievementsData || initialAchievements,
          leadershipData: doc.leadershipData || initialLeadership,
          lastUpdated: doc.lastUpdated || null
        }
      });
    }

    if (req.method === 'POST') {
      // Check Admin Secret against dynamic password in MongoDB or env
      const expectedSecret = await getActiveAdminPassword();
      const clientSecret = req.headers['x-admin-secret'] || (req.body && req.body.adminSecret);

      if (expectedSecret && expectedSecret.trim() !== '') {
        if (clientSecret !== expectedSecret && clientSecret !== (process.env.ADMIN_SECRET || 'Naveen1212')) {
          return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid Admin Secret key.'
          });
        }
      }

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      const { section, data, fullConfig } = body || {};

      let updateQuery = {
        $set: {
          lastUpdated: new Date().toISOString()
        }
      };

      if (section && data !== undefined) {
        // Single section update (e.g. projectsData, personalInfo)
        updateQuery.$set[section] = data;
      } else if (fullConfig) {
        // Full configuration update / restore
        if (fullConfig.personalInfo) updateQuery.$set.personalInfo = fullConfig.personalInfo;
        if (fullConfig.skillsData) updateQuery.$set.skillsData = fullConfig.skillsData;
        if (fullConfig.experienceData) updateQuery.$set.experienceData = fullConfig.experienceData;
        if (fullConfig.projectsData) updateQuery.$set.projectsData = fullConfig.projectsData;
        if (fullConfig.competitiveProgrammingData) updateQuery.$set.competitiveProgrammingData = fullConfig.competitiveProgrammingData;
        if (fullConfig.achievementsData) updateQuery.$set.achievementsData = fullConfig.achievementsData;
        if (fullConfig.leadershipData) updateQuery.$set.leadershipData = fullConfig.leadershipData;
      } else if (body) {
        // Direct object containing sections
        ['personalInfo', 'skillsData', 'experienceData', 'projectsData', 'competitiveProgrammingData', 'achievementsData', 'leadershipData'].forEach((key) => {
          if (body[key] !== undefined) {
            updateQuery.$set[key] = body[key];
          }
        });
      }

      const result = await collection.updateOne(
        { _id: 'main_portfolio' },
        updateQuery,
        { upsert: true }
      );

      return res.status(200).json({
        success: true,
        message: 'Portfolio data synchronized with MongoDB Atlas successfully.',
        lastUpdated: updateQuery.$set.lastUpdated,
        result
      });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('MongoDB API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'MongoDB database operation failed: ' + error.message
    });
  }
}
