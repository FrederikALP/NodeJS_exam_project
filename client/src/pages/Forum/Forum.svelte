<script>
    import { user } from "../../stores/generalStore.js";


    import { onMount } from 'svelte';
    let forumsHeader;

    onMount(async () => {
        const response = await fetch('http://localhost:3000/forums');
        const forumsArray = await response.json();
        forumsHeader = forumsArray;
        console.log(forumsArray);
        console.log(forumsHeader);
    });
</script>

<div>
    <h1>Forum</h1>
    {forumsHeader}
    {#if ($user.loggedIn)}
    <h1>Welcome {$user.currentUser.username}</h1>
    {/if}
    
</div>
