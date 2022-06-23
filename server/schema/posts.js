import mongoose from "mongoose";

const Posts = new mongoose.Schema(
    { 
        postheader: String, 
        date: { type: Date, default: () => Date.now() }, 
        postbody: String, 
        replycount: Number,
        subid: Number,
        user: {
            username: String,
            userid: mongoose.Schema.Types.ObjectId
        }
    },
    { collection: 'posts' }
);

const posts = mongoose.model('Posts', Posts);

export default posts;