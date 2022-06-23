<script>
    import { Link, Router, Route } from "svelte-navigator";
    import { onMount } from 'svelte';
    import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
    import Subforum from "../Subforum/Subforum.svelte";

    let forums;
    let subforums;

    async function fetchForums() {
        const response = await fetch($baseURL + '/api/forums');
        const forumsArray = await response.json();
        forums = forumsArray;
        console.log(forums);
    };

    async function fetchSubForums() {
        const response = await fetch($baseURL + '/api/subforums');
        const forumsArray = await response.json();
        subforums = forumsArray;
        console.log(subforums);
    };

    onMount(async () => {
        fetchForums()
        fetchSubForums()
    });

    function changeId(newid) {
        subid.set(newid)
        console.log(subid)
	};
</script>

<div>
    <h1>Forum</h1>
    {#if ($user.loggedIn)}
    <h1>Welcome {$user.currentUser.username}</h1>
    {/if}
    
    <ul>
        {#if forums} 
		{#each forums as forum}
			<li>
				{forum.mainheader}
			</li>
            {#if subforums} 
            {#each subforums as subforum}
               {#if subforum.mainid === forum._id}
                <nav>
                    <Link on:click="{changeId(subforum._id)}" to="/subforum/{subforum._id}">{subforum.subheader}</Link>
                    <span>{subforum._id}</span>
                </nav>
                {/if}
            {/each}
            {/if}
		{/each}
        {/if}
	</ul>
</div>
