import mongoose from "mongoose";

const ForumSchema = new mongoose.Schema(
	{
        mainheader: String,
        _id: Number
	},
	{ collection: 'forum' }
);

const forum = mongoose.model('Forum', ForumSchema);

export default forum;