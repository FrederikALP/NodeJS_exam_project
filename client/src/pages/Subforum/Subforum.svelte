<script>
    import { user } from "../../stores/generalStore.js";
    import { onMount } from 'svelte';
    import { baseURL } from "../../stores/generalStore.js";




    let posts;

    async function fetchPosts(page) {
        console.log(id);
        const response = await fetch($baseURL + '/postsBySubforum/' + id);
        const postsArray = await response.json();
        posts = postsArray;
        console.log(posts);
    };

    onMount(async () => {
        fetchPosts()
    });
</script>

<div>   
<h1>Nu er det rigtig dumt</h1>
</div>
