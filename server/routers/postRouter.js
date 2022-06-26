import { Router } from "express";
import { ObjectId } from "mongodb";
const router = Router();
import Posts from "../schema/posts.js";
import Comments from "../schema/comments.js";
 
//Get all posts
router.get("/api/posts", async (req, res) => {
    const posts = await Posts.find({});
    try {
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get post by id
router.get("/api/posts/:id", async (req, res) => {
    const _id = ObjectId(req.params.id);
    const postid = ObjectId(req.params.id);
    const posts = await Posts.findOne({ _id });
    const comments = await Comments.find({ postid });
    let replycounter = 0;
    if (comments) {
            comments.forEach(comment => {
		++replycounter
	});
    posts.replycount = replycounter;
    }
    try {
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get post by subForum id
router.get("/api/postsBySubforum/:id", async (req, res) => {
    const subid = Number(req.params.id);
    const postsBySubforum = await Posts.find( {subid} );

    try {
        res.send(postsBySubforum);
    } catch (error) {
        res.status(500).send(error);
    } 
});

//Create post
router.post("/api/post", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(500).send('User not logged in');
    }
    const post = new Posts(req.body.post);
    try {
        await post.save();
        res.send(post);
      } catch (error) {
        res.status(500).send(error);
      }
});

//Update post by id
router.patch("/api/post/:id", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(500).send('User not logged in');
    }
    let _id = req.params.id;
    try {
        await Posts.findByIdAndUpdate(req.params.id, req.body);
        let updatedPost = await Posts.findOne({_id});
        res.send(updatedPost);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete post by id
router.delete("/api/post/:id", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(500).send('User not logged in');
    }
    try {
        const post = await Posts.findByIdAndDelete(req.params.id);
        if (!post) res.status(404).send('No post found');
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;