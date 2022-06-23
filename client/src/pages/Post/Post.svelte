<script>
    import { Link, Router, Route } from "svelte-navigator";
    import { onMount } from 'svelte';
    import { baseURL, subid, postid, user } from "../../stores/generalStore.js";

    let comments;

    async function fetchComments() {
        console.log($postid);
        const response = await fetch($baseURL + '/api/commentsByPost/' + $postid);
        const commentsArray = await response.json();
        comments = commentsArray;
        console.log(comments);
    };

    onMount(async () => {
        fetchComments()
    });

    function changeId(newid) {
        id.set(newid)
        console.log(id)
	};
</script>

<div>   
    <h1>Subforum og posts nedenunder</h1>
    {#if comments} 
    {#each comments as comment}
        <li>
            {comment.commentbody}
            <span>{comment._id}</span>
        </li>
    {/each}
    {/if}
</div>
