import { Router } from "express";
const router = Router();
import Comments from "../schema/comments.js";
import Posts from "../schema/posts.js";
import { getIO } from "../socketIO.js";
 
//Get all Comments
router.get("/api/comments", async (req, res) => {
    const comments = await Comments.find({});

    try {
        res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
});


//Get comments by post id
router.get("/api/commentsByPost/:id", async (req, res) => {
    const postid = req.params.id;
    const commentsByPost = await Comments.find({ postid });

    try {
        res.send(commentsByPost);
    } catch (error) {
        res.status(500).send(error);
    } 
});

//Create comment on post id
router.post("/api/comment", async (req, res) => {
    const comment = new Comments(req.body.comment);
    try {
        await comment.save();
        const io = getIO();
        io.emit('comment', comment);
        res.send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
});


//Update comment by id
router.patch("/api/comment/:id", async (req, res) => {
    let _id = req.params.id;
    try {
        await Comments.findByIdAndUpdate(req.params.id, req.body);
        let updatedcomment = await Comments.findOne({_id});
        console.log(updatedcomment);
        res.send(updatedcomment);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete comment by id
router.delete("/api/comment/:id", async (req, res) => {
    try {
        const comment = await Comments.findByIdAndDelete(req.params.id);
        res.status(200).send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;