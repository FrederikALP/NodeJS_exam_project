import mongoose from "mongoose";

const SubForum = new mongoose.Schema(
    {
        subheader: String,
        postcount: Number,
        commentcount: Number,
        mainid: Number,
        _id: Number
    },
    { collection: 'subforum' }
);

const subForum = mongoose.model('SubForum', SubForum);

export default subForum;