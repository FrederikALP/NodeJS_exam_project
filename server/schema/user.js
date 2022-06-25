import mongoose from "mongoose";

const Users = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true},
		password: { type: String, required: true },
        email: { type: String, required: true , unique: true},
        postcount: { type: Number, required: false },
        role: { type: Number, required: false }
	},
	{ collection: 'users' }
)

const users = mongoose.model('Users', Users);

export default users;