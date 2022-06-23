import { request, response, Router } from "express";
const router = Router();
import Posts from "../schema/posts.js";
import SubForum from "../schema/subForum.js";
 
//Get all posts
router.get("/posts", async (request, response) => {
    const posts = await Posts.find({});

    try {
        response.send(Posts);
    } catch (error) {
        response.status(500).send(error);
    }
});

//Get post by subForum id
router.get("/postsBySubforum/:id", async (request, response) => {
    const postsBySubforum = await Posts.find(SubForum.find({id}));

    try {
        response.send(Posts);
    } catch (error) {
        response.status(500).send(error);
    } 
});

//Create post
router.post("/post", async (request, response) => {
    const { postHeader, date, postbody, replycount, subid, user } = req.body;

    try {
        const response = await Posts.create({
            postsHeader,
            date,
            postbody,
            replycount,
            subid,
            user
        });
        console.log('Post created succesfully: ', response);
    } catch (error) {
        response.status(500).send(error);
    }
});

//Update post by id
router.patch("/post/:id", async (request, response) => {
    try {
        await Posts.findByIdAndUpdate(request.params.id, requestbody);
        await Posts.bulkSave();
        response.send('Post was updated: ', Posts);
    } catch (error) {
        response.status(500).send(error);
    }
});

//Delete post by id
router.delete("/post/:id", async (request, response) => {
    try {
        const post = await Posts.findByIdAndDelete(request.params.id);
        if (!post) response.status(404).send('No post found');
        response.status(200).send();
    } catch (error) {
        response.status(500).send(error);
    }
});


