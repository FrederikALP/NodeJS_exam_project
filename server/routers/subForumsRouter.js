import { Router } from "express";
const router = Router();
import SubForum from "../schema/subForum.js";

//Get all
router.get("/api/subforums", async (req, res) => {
    const subForums = await SubForum.find({});
  
    try {
      res.send(subForums);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//Get by mainforum id
router.get("/api/subforums/:id", async (req, res) => {
    const mainid = Number(req.params.id);
    const subForums = await SubForum.findOne({ mainid });
  
    try {
      res.send(subForums);
    } catch (error) {
      res.status(500).send(error);
    }
  });

export default router;