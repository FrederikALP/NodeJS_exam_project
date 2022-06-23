<script>
    import { Link, Router, Route } from "svelte-navigator";
    import { onMount } from 'svelte';
    import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
    import Post from "../Post/Post.svelte";



    let posts;

    async function fetchPosts() {
        console.log($subid);
        const response = await fetch($baseURL + '/postsBySubforum/' + $subid);
        const postsArray = await response.json();
        posts = postsArray;
        console.log(posts);
    };

    onMount(async () => {
        fetchPosts()
    });

    function changeId(newid) {
        postid.set(newid)
        console.log(postid)
	};
</script>

<div>   
    <h1>Subforum og posts nedenunder</h1>
    {#if posts} 
    {#each posts as post}
    <Router>
        <nav>
            <Link on:click="{changeId(post._id)}" to="/post/{post._id}">{post.postheader}</Link>
            <span>{post._id}</span>
        </nav>
        <Route path="/post/:id" component={Post} />
        </Router>
    {/each}
    {/if}
</div>
