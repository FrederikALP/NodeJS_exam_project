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

    function changeId(newid) {
        subid.set(newid)
        console.log($subid)
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
    <table>
          {#if forums} 
            {#each forums as forum}
            <tr>
                <th>  {forum.mainheader} </th>
            </tr>
                {#if subforums} 
                {#each subforums as subforum}
                {#if subforum.mainid === forum._id}
                    <nav>
                    <tr>
                       <th> <Link on:click="{changeId(subforum._id)}" to="/subforum/{subforum._id}">{subforum.subheader}</Link>
                        {subforum._id}
                    </th> 
                    </tr>
                    </nav>
                    {/if}
                {/each}
                {/if}
            {/each}
            {/if}
    </table>
</div>


<style>
    table, tr, th {
        border: solid black 1px;
        border-collapse: collapse;
        text-align: left;
    }

    td {
        text-align: left;
    }

    table {
        width: 50%;
        margin: auto;
    }
</style>