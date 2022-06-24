import { Router } from "express";
const router = Router();
import User from "../schema/user.js";
import bcrypt from "bcrypt";


//Get all users
router.get("/api/users", async (req, res) => {
    const users = await User.find({});
	users.map(user => {
		user.password = "";
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
	const _id = req.params.id;
    const users = await User.findOne({ _id });
	users.map(user => {
		user.password = "";
		return user;
	})
    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/api/login', async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).lean();

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


router.post('/api/register', async (req, res) => {
    console.log(res.body); 
	const { username, password: plainTextPassword, email } = req.body;

	const password = await bcrypt.hash(plainTextPassword, 10);

	try {
		const response = await User.create({
			username,
			password,
            email
		});
		console.log('User created successfully: ', response);
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' });
		}
		throw error;
	}
	res.json({ status: 'ok' });
});


router.get("/api/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.loggedIn = false;
        req.session.userID = undefined;
        return res.send({ loggedIn: false});
    }
});

export default router;