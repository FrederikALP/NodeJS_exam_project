import { request, response, Router } from "express";
const router = Router();
import Comments from "../schema/comments.js";
import Posts from "../schema/posts.js";
 
//Get all Comments
router.get("/comments", async (req, res) => {
    const comments = await Comments.find({});

    try {
        res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get comments by post id
router.get("/commentsByPost/:id", async (req, res) => {
    const postid = req.params.id;
    const commentsByPost = await Comments.find({ postid });

    try {
        res.send(commentsByPost);
    } catch (error) {
        res.status(500).send(error);
    } 
});

//Create comment on post id
router.post("/comment", async (req, res) => {
    const { commentbody, replynumber, postid, user } = req.body;

    try {
        const res = await Comments.create({
            commentbody, 
            replynumber, 
            postid, 
            user
        });
        console.log('Comment created succesfully: ', res);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Update comment by id
router.patch("/comment/:id", async (req, res) => {
    try {
        await Comments.findByIdAndUpdate(req.params.id, request.body);
        await Comments.bulkSave();
        res.send('Comment was updated: ', Comments);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete comment by id
router.delete("/comment/:id", async (req, res) => {
    try {
        const comment = await Comments.findByIdAndDelete(req.params.id);
        if (!comment) res.status(404).send('No comment found');
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
