<script>
	import { Link, Router, Route } from "svelte-navigator";
	import { baseURL } from "./stores/generalStore.js";
	import { SvelteToast } from '@zerodevx/svelte-toast'
	const options = {  }; //Toast options
	import PrivateRoute from "./components/PrivateRoute.svelte";
	import RegisterUser from "./pages/Login/RegisterUser.svelte";
	import Login from "./pages/Login/Login.svelte"
	import UserStore from "./pages/Login/UserStore.svelte";


	import Frontpage from "./pages/Frontpage/Frontpage.svelte";
	import Forum from "./pages/Forum/Forum.svelte";
</script>

<main>
	<Router>
		<nav>
			<Link to="/">Home</Link>
			<Link to="/forum">Forum</Link>
			<Link to="/login">Login</Link>
			<Link to="/register">Register User</Link>
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