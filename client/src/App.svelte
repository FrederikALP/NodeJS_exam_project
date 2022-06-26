<script>
	import { Link, Router, Route } from "svelte-navigator";
	import { baseURL, user } from "./stores/generalStore.js";
	import { SvelteToast } from '@zerodevx/svelte-toast';
	const options = {  }; //Toast options
	import PrivateRoute from "./components/PrivateRoute.svelte";
	import RegisterUser from "./pages/Login/RegisterUser.svelte";
	import Login from "./pages/Login/Login.svelte";
	import { io } from "socket.io-client";

	//Pageimport
	import Frontpage from "./pages/Frontpage/Frontpage.svelte";
	import Forum from "./pages/Forum/Forum.svelte";
	import Subforum from "./pages/Subforum/Subforum.svelte";
	import Post from "./pages/Post/Post.svelte";
	import CreateNewPost from "./pages/Post/CreateNewPost.svelte";
	import DeleteComment from "./pages/Post/Post.svelte";
	import UpdateComment from "./pages/Post/Post.svelte";
	import Profile from "./pages/Profile/Profile.svelte";


	const socket = io("ws://localhost:3000");
  	socket.on("connect", (x) => {
    console.log("Connected to socket");
  	});

	async function handleLogout() {
		const response = await fetch($baseURL + '/auth/logout');
		const result = await response.json();
        
        if (result.loggedIn === false) {
            user.set(result.loggedIn = false);
			localStorage.clear();
        }
	}

</script>

<main>
	<SvelteToast options = {options}/>
	<Router primary={false}>
			<nav class="navdiv">
				<button class="navlogobutton" disabled><img class="navlogo" src="/favicon.png" alt="Didnt load"></button>
				<Link to="/"><button class="navbutton">Home</button></Link>
				<Link to="/forum"><button class="navbutton">Forum</button></Link>
				{#if (!$user.loggedIn)}
					<Link to="/login"><button class="navbutton">Login</button></Link>
					<Link to="/register"><button class="navbutton">Register</button></Link>
				{/if}
				{#if ($user.loggedIn)}
					<Link to="/profile/{$user.currentUser._id}"><button class="navbutton">Profile {$user.currentUser.username}</button></Link>
					<button class="navbutton" on:click="{handleLogout}">Logout</button>
				{/if}
			</nav>

		<Route path="/" component={Frontpage} />
		<Route path="/forum" component={Forum} />
		<Route path="/subforum/:id" component={Subforum} />
		<Route path="/post/:id" component={Post} />
		
		{#if (!$user.loggedIn)}
		<PrivateRoute path="/create-new-post" let:location>
			<Login/>
		</PrivateRoute>
		<PrivateRoute path="/profile/:id" let:location>
			<Login/>
		</PrivateRoute>
		{:else}
			<Route path="/create-new-post" component={CreateNewPost}/>
			<Route path="/profile/:id" component={Profile}/>
		{/if}

		<Route path="/deleteComment" component={DeleteComment} />
		<Route path="/updateComment" component={UpdateComment} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={RegisterUser} />
	</Router>
</main>
<footer>
	{new Date().getFullYear()} Copyright bla bla
	About
	Contact
</footer>

<style>

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.navdiv {
		display: flex;
    	justify-content: center;
	}

	.navlogo {
		width: 25px;
	}

	.navlogobutton {
		margin: 5px;
	}

	.navbutton {
		height: 46px;
		margin: 5px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>