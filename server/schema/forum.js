import mongoose from "mongoose";

const ForumSchema = new mongoose.Schema(
	{
		header: String,
        postcount: Number,
        commentcount: Number,
        posts: [{ postname: String, date: { type: Date, default: () => Date.now() }, postbody: String, replycount: Number, user: String, 
        comments: [{ commentbody: String, replynumber: Number, user: String }]
        }]
	},
	{ collection: 'forum' }
)

const model = mongoose.model('ForumSchema', ForumSchema);

export default model;