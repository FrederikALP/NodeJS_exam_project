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
    };

    async function fetchSubForums() {
        const response = await fetch($baseURL + '/api/subforums');
        const forumsArray = await response.json();
        subforums = forumsArray;
    };

    function changeId(newid) {
        subid.set(newid)
        localStorage.setItem("persistentsubid", newid);
	};

    onMount(async () => {
        fetchForums()
        fetchSubForums()
    });
</script>

<div class="fullpage">
    <div class="header">
    <h1>Hørehæmmedes tilflugtssted</h1>
</div>
    <div class="forumcontent">
        {#if forums} 
          {#each forums as forum}
          <div class="headerandsub">
          <div class="forumheader">
              <h3>  {forum.mainheader} </h3>
            </div>
            {#if subforums} 
            {#each subforums as subforum}
            {#if subforum.mainid === forum._id}
            <div class="subforum">
                <nav>
                     <Link on:click="{changeId(subforum._id)}" to="/subforum/{subforum._id}">
                        <h4>{subforum.subheader}</h4>
                    </Link>
                </nav>
            </div>
            {/if}
            {/each}
            {/if}
            </div>
            {/each}
            {/if}
        </div>
    </div>
        
        
<style>
    h1 {
        color: white;
    }

    h2 {

    }

    h3 {
        color: white;
        margin: 0px;
    }

    h4 {
        color: grey;
    }

    .fullpage {
        width: 50%;
        margin: auto;
        text-align: left
    }

    .header {
        border: solid black 1px;
        border-collapse: collapse;
        margin-top: 40px;
        border-radius: 0.25em;
        background-color: grey;
    }

    .forumcontent {
        border-collapse: collapse;
        border-top: 20px;
    }

    .headerandsub {
        border: solid black 1px;
        border-radius: 0.25em;
        margin-top: 10px;
    }

    .forumheader {        
        background-color: grey;
        border-bottom: solid black 1px;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .subforum {
        background-color: lightgrey;
        border-top: solid black 1px;
        border-bottom: solid black 1px;
        border-collapse: collapse;
    }

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