<script>
    import { user } from "../../stores/generalStore.js";
    import { onMount } from 'svelte';

    let forums;
    let subforums;

   /* onMount(async () => {
        const response = await fetch('http://localhost:3000/forums');
        const forumsArray = await response.json();
        forums = forumsArray;
        console.log(forums);
    });

    onMount(async () => {
        const response = await fetch('http://localhost:3000/subforums');
        const forumsArray = await response.json();
        subforums = forumsArray;
        console.log(subforums);
    });
*/
    async function fetchForums() {
        const response = await fetch('http://localhost:3000/forums');
        const forumsArray = await response.json();
        forums = forumsArray;
        console.log(forums);
    };

    async function fetchSubForums() {
        const response = await fetch('http://localhost:3000/subforums');
        const forumsArray = await response.json();
        subforums = forumsArray;
        console.log(subforums);
    };

    onMount(async () => {
        fetchForums()
        fetchSubForums()
    });

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
               <li> 
                    <a href>{subforum.subheader}</a>
                </li>
                {/if}
            {/each}
            {/if}
		{/each}
        {/if}
	</ul>
</div>
