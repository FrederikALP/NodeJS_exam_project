<script>
    import { user } from "../../stores/generalStore.js";
    import { onMount } from 'svelte';

    let subforums;
    let posts;


    onMount(async () => {
        const response = await fetch('http://localhost:3000/subforums');
        const subForumsArray = await response.json();
        subforums = subForumsArray;
        console.log(subforums);
    });

    onMount(async () => {
        const response = await fetch('http://localhost:3000/posts');
        const postsArray = await response.json();
        posts = postsArray;
        console.log(posts);
    });
</script>

<div>   
    <ul>
        {#if subforums} 
		{#each subforums as subforum}
			<li>
					{subforum.subheader}
			</li>
            {#each posts as post}
               {#if post.subid === subforum._id}
               <li> 
                    <a href>{post.postheader}</a>
                </li>
                {/if}
            {/each}
		{/each}
        {/if}
	</ul>
</div>
