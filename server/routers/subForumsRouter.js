import { Router } from "express";
const router = Router();
import SubForum from "../schema/subForum.js";

//Get all
router.get("/subforums", async (request, response) => {
    const subForums = await SubForum.find({});
  
    try {
      response.send(subForums);
    } catch (error) {
      response.status(500).send(error);
    }
  });

export default router;