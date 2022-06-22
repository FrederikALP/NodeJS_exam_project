<script>
	import { Link, Router, Route } from "svelte-navigator";
	import { baseURL } from "./stores/generalStore.js";
	import { user } from "./stores/generalStore";
	import { SvelteToast } from '@zerodevx/svelte-toast';
	const options = {  }; //Toast options
	import PrivateRoute from "./components/PrivateRoute.svelte";
	import RegisterUser from "./pages/Login/RegisterUser.svelte";
	import Login from "./pages/Login/Login.svelte"



	import Frontpage from "./pages/Frontpage/Frontpage.svelte";
	import Forum from "./pages/Forum/Forum.svelte";

	async function handleLogout() {
		const response = await fetch($baseURL + '/api/logout');
		const result = await response.json();
        
        if (result.loggedIn === false) {
            user.set(result.loggedIn = false);
        }
	}
</script>

<main>
	<Router>
		<nav>
			<Link to="/">Home</Link>
			<Link to="/forum">Forum</Link>
			{#if (!$user.loggedIn)}
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			{/if}
			{#if ($user.loggedIn)}
				<Link on:click="{handleLogout}" to="/">Logout</Link>
			{/if}
		</nav>

		<Route path="/" component={Frontpage} />
		<Route path="/forum" component={Forum} />
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
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>