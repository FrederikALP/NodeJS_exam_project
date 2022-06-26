import { Router } from "express";
const router = Router();
import Comments from "../schema/comments.js";
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
    if (!req.session.loggedIn) {
        return res.status(500).send('User not logged in');
    }
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
    if (!req.session.loggedIn) {
        return res.status(500).send('User not logged in');
    }
    let _id = req.params.id;
    try {
        await Comments.findByIdAndUpdate(req.params.id, req.body);
        let updatedcomment = await Comments.findOne({_id});;
        const io = getIO();
        io.emit('updatecomment', updatedcomment);
        res.send(updatedcomment);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete comment by id
router.delete("/api/comment/:id", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(500).send('User not logged in');
    }
    try {
        const comment = await Comments.findByIdAndDelete(req.params.id);
        const io = getIO();
        io.emit('deletecomment', comment);
        res.status(200).send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;