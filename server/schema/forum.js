import mongoose from "mongoose";

const ForumSchema = new mongoose.Schema(
	{
		theme: String,
		forumlevel: Number,
        threadcount: Number,
        postcount: Number,
        threads: [{ threadname: String, date: { type: Date, default: () => Date.now() }, threadbody: String, replycount: Number, 
        posts: [{ postbody: String, replynumber: Number }]
        }]
	},
	{ collection: 'forum' }
)

const model = mongoose.model('ForumSchema', ForumSchema);

export default model;