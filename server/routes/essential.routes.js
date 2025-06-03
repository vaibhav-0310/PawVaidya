import express from 'express';
import Essential from '../schema/essentail.schema.js';

const router = express.Router();

router.get('/essentials', async (req, res) => {
  try {
    const essentials = await Essential.find();
    res.status(200).json(essentials);
  } catch (error) {
    console.error('Error fetching essentials:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;