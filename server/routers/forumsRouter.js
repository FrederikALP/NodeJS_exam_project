import { Router } from "express";
const router = Router();
import Forum from "../schema/forum.js";

//Get all
router.get("/forums", async (req, res) => {
    const forums = await Forum.find({});
  
    try {
      res.send(forums);
    } catch (error) {
      res.status(500).send(error);
    }
  });

export default router;