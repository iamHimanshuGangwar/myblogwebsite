import express from 'express';
import { getFeatures } from '../controllers/featureController.js';

const router = express.Router();

// GET /api/features
router.get('/', getFeatures);

export default router;
