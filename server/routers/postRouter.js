import { Router } from "express";
const router = Router();
import mongoose from "mongoose";

import Posts from "../schema/posts.js";
import SubForum from "../schema/subForum.js";
 
//Get all posts
router.get("/api/posts", async (req, res) => {
    const posts = await Posts.find({});
    try {
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get post by id with req.body for some reason
router.get("/api/posts/:id", async (req, res) => {
    const postid = req.body;
    const posts = await Posts.find ({ postid }) ;

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
router.post("/api/post", async (request, response) => {
    const post = new Posts(request.body.post);
    try {
        await post.save();
        response.send(post);
      } catch (error) {
        response.status(500).send(error);
      }
});

//Update post by id
router.patch("/api/post/:id", async (req, res) => {
    try {
        await Posts.findByIdAndUpdate(req.params.id, req.body);
        await Posts.bulkSave();
        res.send('Post was updated: ', Posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete post by id
router.delete("/api/post/:id", async (req, res) => {
    try {
        const post = await Posts.findByIdAndDelete(req.params.id);
        if (!post) res.status(404).send('No post found');
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;