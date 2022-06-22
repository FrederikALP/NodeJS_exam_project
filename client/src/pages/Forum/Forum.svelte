<script>
    import { user } from "../../stores/generalStore.js";
</script>

<div>
    <h1>Forum WIP</h1>
    <h2>Opdaterer den ordentligt</h2>
    {#if ($user.loggedIn)}
    <h1>Welcome {$user.currentUser.username}</h1>
    Virker default fallback
{/if}
</div>

<span>Testing igen</span>