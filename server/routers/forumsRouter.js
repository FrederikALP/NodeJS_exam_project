import { Router } from "express";
const router = Router();
import Forum from "../schema/forum.js";

//Get all
router.get("/forums", async (request, response) => {
    const forums = await Forum.find({});
  
    try {
      response.send(forums);
    } catch (error) {
      response.status(500).send(error);
    }
  });

export default router;