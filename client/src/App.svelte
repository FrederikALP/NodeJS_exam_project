<script>
	import { Link, Router, Route } from "svelte-navigator";
	import { baseURL } from "./stores/generalStore.js";
	import { SvelteToast } from '@zerodevx/svelte-toast'
	const options = {  }; //Toast options

	import Frontpage from "./pages/Frontpage/Frontpage.svelte";
	import Forum from "./pages/Forum/Forum.svelte";
</script>

<main>
	<Router>
		<nav>
			<Link to="/">Home</Link>
			<Link to="/forum">Forum</Link>
		</nav>

		<Route path="/" component={Frontpage} />
		<Route path="/forum" component={Forum} />
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