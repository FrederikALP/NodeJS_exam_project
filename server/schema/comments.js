import mongoose from "mongoose";

const Comments = new mongoose.Schema(
    { 
        commentbody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 200
        },
        replynumber: Number,
        postid: String,
        userid: String
	},
    { collection: 'comments' }
);

const comments = mongoose.model('Comments', Comments);

export default comments;
