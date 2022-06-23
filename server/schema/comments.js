const Comments = new mongoose.Schema(
    { 
        commentbody: String, 
        replynumber: Number, 
        postid: String,
        user: {
            username: String,
            userid: String
        }
	},
    { collection: 'comments' }
);

const comments = mongoose.model('Comments', Comments);

export default comments;
