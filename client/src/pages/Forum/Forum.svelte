<script>
    import { user } from "../../stores/generalStore.js";
</script>

<div>
    <h1>Forum</h1>
    {#if ($user.loggedIn)}
    <h1>Welcome {$user.currentUser.username}</h1>
    {/if}
    
</div>

<span>Testing igen</span>