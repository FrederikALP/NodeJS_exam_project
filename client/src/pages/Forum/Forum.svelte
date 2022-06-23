<script>
    import { user } from "../../stores/generalStore.js";
    import { onMount } from 'svelte';

    let forums;
    let subforums;

    onMount(async () => {
        const response = await fetch('http://localhost:3000/forums');
        const forumsArray = await response.json();
<<<<<<< HEAD
        forumsHeader = forumsArray;
        console.log(forumsArray);
        console.log(forumsHeader);
=======
        forums = forumsArray;
        console.log(forums);
    });

    onMount(async () => {
        const response = await fetch('http://localhost:3000/subforums');
        const forumsArray = await response.json();
        subforums = forumsArray;
        console.log(subforums);
>>>>>>> e7c089a4ea31fa686bf6856c8ab40165df0201da
    });
</script>

<div>
    <h1>Forum</h1>
<<<<<<< HEAD
    {forumsHeader}
=======
>>>>>>> e7c089a4ea31fa686bf6856c8ab40165df0201da
    {#if ($user.loggedIn)}
    <h1>Welcome {$user.currentUser.username}</h1>
    {/if}
    
    <ul>
        {#if forums} 
		{#each forums as forum}
			<li>
					{forum.mainheader}
			</li>
            {#each subforums as subforum}
               {#if subforum.mainid === forum._id}
               <li> 
                    <a href>{subforum.subheader}</a>
                </li>
                {/if}
            {/each}
		{/each}
        {/if}
	</ul>
</div>
