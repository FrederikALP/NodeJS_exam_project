import mongoose from "mongoose";

const ForumSchema = new mongoose.Schema(
	{
		theme: String,
		forumlevel: Number,
        threadcount: Number,
        postcount: Number,
        posts: [{ postname: String, date: { type: Date, default: () => Date.now() }, postbody: String, replycount: Number, 
        comments: [{ commentbody: String, replynumber: Number }]
        }]
	},
	{ collection: 'forum' }
)

const model = mongoose.model('ForumSchema', ForumSchema);

export default model;