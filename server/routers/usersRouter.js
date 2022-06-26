import { Router } from "express";
import { ObjectId } from "mongodb";
const router = Router();
import Users from "../schema/user.js";
import bcrypt from "bcrypt";
import Posts from "../schema/posts.js";


//Get all users
router.get("/api/users", async (req, res) => {
    const users = await Users.find({});
	const posts = await Posts.find({});
	users.map(user => {
		user.password = "";
		user.postcount = 0;
		return user;
	})
    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get user by id
router.get("/api/users/:id", async (req, res) => {
	const _id = ObjectId(req.params.id);
	let userid = _id;
	let postcounter = 0;
    const users = await Users.findOne({ _id });
	const posts = await Posts.find({ userid });
	users.password = undefined;
	posts.forEach(element => {
		++postcounter
	});
	users.postcount = postcounter;
    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/api/users/:id", async (req, res) => {
	//if (!req.session.loggedIn) {
	//return res.status(500).send('User not logged in');
	//}
	let _id = req.params.id;
	try {
		await Users.findByIdAndUpdate(req.params.id, req.body);
		let updatedUser = await Users.findOne({_id});
		console.log(updatedUser);
		res.send(updatedUser);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post('/auth/login', async (req, res) => {
	const { username, password } = req.body;
	const user = await Users.findOne({ username }).lean();

	if (!user) {
		return res.send({ status: 'error', error: 'Invalid username/password' });
	}

	if (await bcrypt.compare(password, user.password)) {
		// Succesful
        req.session.loggedIn = true;
        req.session.userID = user._id;
		return res.send({ status: 'ok', currentUser: user, loggedIn: true });
	}

	res.send({ status: 'error', error: 'Invalid username/password', loggedIn: false })
})


router.post('/auth/register', async (req, res) => {
    console.log(res.body); 
	const { username, password: plainTextPassword, email } = req.body;

	const password = await bcrypt.hash(plainTextPassword, 10);

	try {
		const response = await Users.create({
			username,
			password,
            email
		});
		console.log('User created successfully: ', response);
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username or Email already in use' });
		}
		throw error;
	}
	res.json({ status: 'ok' });
});


router.get("/auth/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.loggedIn = false;
        req.session.userID = undefined;
        return res.send({ loggedIn: false });
    }
	res.send({ loggedIn:false });
});

export default router;