import express from "express";
import { isLoggedIn } from "../middleware/middleware.js";
const router= express.Router();

router.get('/auth-status', (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    return res.json({ isAuthenticated: true, user: req.user });
  } else {
    return res.json({ isAuthenticated: false, user: null });
  }
});

export default router;