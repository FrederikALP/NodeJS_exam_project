import { Router } from "express";
const router = Router();
import SubForum from "../schema/subForum.js";

//Get all
router.get("/subforums", async (req, res) => {
    const subForums = await SubForum.find({});
  
    try {
      res.send(subForums);
    } catch (error) {
      res.status(500).send(error);
    }
  });

export default router;

//Get by mainforum id
router.get("/subforums/:id", async (req, res) => {
    const maindid = Number(req.params.id);
    const subForums = await SubForum.findOne( {mainid} );
  
    try {
      res.send(subForums);
    } catch (error) {
      res.status(500).send(error);
    }
  });