// server/controllers/featureController.js
import express from 'express';

// Simple in-memory features data. Replace with DB model if needed.
const features = [
  {
    id: 'profile',
    title: 'Cake Profile',
    subtitle: 'Build your personal brand online',
    description: 'Build your professional brand with Cake Profile — a gateway for employers, recruiters, and professionals to discover your talents.',
    icon: 'profile'
  },
  {
    id: 'messenger',
    title: 'Cake Messenger',
    subtitle: 'Real-time message exchange',
    description: 'Fast, reliable messaging to connect with recruiters and peers in real-time.',
    icon: 'chat'
  },
  {
    id: 'analytics',
    title: 'Profile Analytics',
    subtitle: 'Clear reports to your profile performance',
    description: 'Detailed analytics to help you understand profile views, engagement, and growth.',
    icon: 'analytics'
  },
  {
    id: 'ai',
    title: 'Cake AI',
    subtitle: 'Precise job recommendation and new connection matching',
    description: 'AI-backed recommendations to help you find better jobs and network smarter.',
    icon: 'magic'
  }
];

export const getFeatures = async (req, res) => {
  try {
    return res.json({ success: true, data: features });
  } catch (err) {
    console.error('getFeatures error:', err?.message);
    return res.status(500).json({ success: false, message: 'Failed to load features' });
  }
};

export default { getFeatures };
