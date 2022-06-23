<script>
    import { user } from "../../stores/generalStore.js";
</script>

<div>
    <h1>Forum</h1>
    {#if ($user.loggedIn)}
    <h1>Welcome {$user.currentUser.username}</h1>
<<<<<<< HEAD
    {/if}
    
=======
    Virker default fallback
{/if}
>>>>>>> 86bbc7b4b0a0a7b49c85ecc9e419f904a65e2647
</div>

<span>Testing igen</span>