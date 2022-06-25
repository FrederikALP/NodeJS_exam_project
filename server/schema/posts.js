import mongoose from "mongoose";

const Posts = new mongoose.Schema(
    { 
        postheader: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50
        }, 
        date: { type: Date, default: () => Date.now() }, 
        postbody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 500
        }, 
        replycount: Number,
        subid: Number,
        userid: mongoose.Schema.Types.ObjectId
    },
    { collection: 'posts' }
);

const posts = mongoose.model('Posts', Posts);

export default posts;