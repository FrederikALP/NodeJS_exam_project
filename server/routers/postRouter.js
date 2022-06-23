import { Router } from "express";
const router = Router();
import Posts from "../schema/posts.js";
import SubForum from "../schema/subForum.js";
 
//Get all posts
router.get("/posts", async (req, res) => {
    const posts = await Posts.find({});

    try {
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get post by id with req.body for some reason
router.get("/posts", async (request, response) => {
    const postid = request.body;
    const posts = await Posts.find ({ postid }) ;

    try {
        response.send(posts);
    } catch (error) {
        response.status(500).send(error);
    }
});

//Get post by subForum id
router.get("/postsBySubforum/:id", async (req, res) => {
    const subforumid = Number(req.params.id);
    const postsBySubforum = await Posts.find(SubForum.find({subforumid}));

    try {
        res.send(postsBySubforum);
    } catch (error) {
        res.status(500).send(error);
    } 
});

//Create post
router.post("/post", async (req, res) => {
    const { postheader, date, postbody, replycount, subid, user } = req.body;

    try {
        const res = await Posts.create({
            postheader,
            date,
            postbody,
            replycount,
            subid,
            user
        });
        console.log('Post created succesfully: ', res);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Update post by id
router.patch("/post/:id", async (req, res) => {
    try {
        await Posts.findByIdAndUpdate(req.params.id, req.body);
        await Posts.bulkSave();
        res.send('Post was updated: ', Posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete post by id
router.delete("/post/:id", async (req, res) => {
    try {
        const post = await Posts.findByIdAndDelete(req.params.id);
        if (!post) res.status(404).send('No post found');
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;