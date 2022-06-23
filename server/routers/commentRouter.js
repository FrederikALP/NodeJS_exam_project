import { request, response, Router } from "express";
const router = Router();
import Comments from "../schema/comments.js";
import Posts from "../schema/posts.js";
 
//Get all Comments
router.get("/comments", async (request, response) => {
    const posts = await Comments.find({});

    try {
        response.send(Comments);
    } catch (error) {
        response.status(500).send(error);
    }
});

//Get comments by post id
router.get("/commentsByPost/:id", async (request, response) => {
    const commentsByPost = await Comments.find(Posts.find({id}));

    try {
        response.send('Comments by post: ', Comments);
    } catch (error) {
        response.status(500).send(error);
    } 
});

//Create comment on post id
router.post("/comment", async (request, response) => {
    const { commentbody, replynumber, postid, user } = req.body;

    try {
        const response = await Comments.create({
            commentbody, 
            replynumber, 
            postid, 
            user
        });
        console.log('Comment created succesfully: ', response);
    } catch (error) {
        response.status(500).send(error);
    }
});

//Update comment by id
router.patch("/comment/:id", async (request, response) => {
    try {
        await Comments.findByIdAndUpdate(request.params.id, requestbody);
        await Comments.bulkSave();
        response.send('Comment was updated: ', Comments);
    } catch (error) {
        response.status(500).send(error);
    }
});

//Delete comment by id
router.delete("/comment/:id", async (request, response) => {
    try {
        const comment = await Comments.findByIdAndDelete(request.params.id);
        if (!comment) response.status(404).send('No comment found');
        response.status(200).send();
    } catch (error) {
        response.status(500).send(error);
    }
});
