import mongoose from "mongoose";

const Posts = new mongoose.Schema(
    { 
        postheader: String, 
        date: { type: Date, default: () => Date.now() }, 
        postbody: String, 
        replycount: Number,
        subid: String,
        user: {
            username: String,
            userid: String
        }
    },
    { collection: 'posts' }
);

const posts = mongoose.model('Posts', Posts);

export default posts;