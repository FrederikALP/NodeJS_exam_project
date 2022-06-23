<script>
    import { Link, Router, Route } from "svelte-navigator";
    import { user } from "../../stores/generalStore.js";
    import { onMount } from 'svelte';
    import { baseURL } from "../../stores/generalStore.js";

    let post

    async function fetchPost() {
        const response = await fetch($baseURL + '/post/' + request.parems.id);
        
    };

    async function fetchComments() {
        const response = await fetch($baseURL + '/commentsByPost' + post.);
        const forumsArray = await response.json();
        forums = forumsArray;
        console.log(forums);
    };

</script>