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
		const response = await fetch($baseURL + '/api/logout');
		const result = await response.json();
		console.log(result);
        
        if (result.loggedIn === false) {
            user.set(result.loggedIn = false);
			localStorage.clear();
			console.log(localStorage.getItem("user"));
        }
	}

</script>

<main>
	<SvelteToast options = {options}/>
	<Router>
		<div class="navdiv">
			<nav>
				<img class="navlogo" src="/favicon.png" alt="...">
				<Link to="/"><button class="navbutton">Home</button></Link>
				<Link to="/forum"><button class="navbutton">Forum</button></Link>
				{#if (!$user.loggedIn)}
					<Link to="/login"><button class="navbutton">Login</button></Link>
					<Link to="/register"><button class="navbutton">Register</button></Link>
				{/if}
				{#if ($user.loggedIn)}
					<Link to="/profile"><button class="navbutton">WIP Profile button {$user.currentUser.username}</button></Link>
					<button class="navbutton" on:click="{handleLogout}">Logout</button>
				{/if}
			</nav>
		</div>

		<Route path="/" component={Frontpage} />
		<Route path="/forum" component={Forum} />
		<Route path="/subforum/:id" component={Subforum} />
		<Route path="/post/:id" component={Post} />
		
		{#if (!$user.loggedIn)}
		<PrivateRoute path="/create-new-post" let:location>
			<Login/>
		</PrivateRoute>
		<PrivateRoute path="/profile" let:location>
			<Login/>
		</PrivateRoute>
		{:else}
			<Route path="/create-new-post" component={CreateNewPost}/>
			<Route path="/profile" component={Profile}/>
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

	h1 {
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.navdiv {
		
	}

	.navlogo {
		width: 46px;
		height: 46px;
		overflow: hidden;
	}

	.navbutton {
		height: 46px;
		overflow: hidden;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>