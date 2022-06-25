<script>
    import { Link, Router, Route } from "svelte-navigator";
    import { useNavigate, useLocation } from "svelte-navigator";

    import { onMount } from 'svelte';
    import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
    import Post from "../Post/Post.svelte";
    

    let posts;
    let users;
    let subforums;
    const subforumid = localStorage.getItem("persistentsubid");

    async function fetchPosts() {
        const response = await fetch($baseURL + '/api/postsBySubforum/' + subforumid);
        const postsArray = await response.json();
        posts = postsArray;
        console.log(posts);
    };

    async function fetchUsers() {
        const response = await fetch($baseURL + '/api/users');
        const usersArray = await response.json();
        users = usersArray;
        console.log(users);
    };

    async function fetchSubForums() {
        const response = await fetch($baseURL + '/api/subforums');
        const forumsArray = await response.json();
        subforums = forumsArray;
        console.log(subforums);
    };

    function changeId(newid) {
        postid.set(newid)
        console.log($postid)
	};

    onMount(async () => {
        fetchPosts();
        fetchUsers();
        fetchSubForums();
    });
</script>

<div class="fullpage">
    <Link to="/create-new-post"><button>Create post</button></Link>
    {#if ($user.loggedIn)}
    <h1>Welcome {$user.currentUser.username}</h1>
    {/if}
    <div class="forumcontent">
        {#if posts && users && subforums}
        {#each subforums as subforum}
        {#if subforum._id == subforumid}
        <div class="forumsubheader">
            <h3>Subforumname: {subforum.subheader}</h3>
        </div>
            {/if}
        {/each}
        {#each posts as post}
        <div class="forumpost">
            {#each users as user}
            {#if post.userid === user._id}
            <div class="postuser">
               <h4>Posted by {user.username}</h4>
           </div>
           {/if}
           {/each}
            <div class="postname">
            <Link on:click="{changeId(post._id)}" to="/post/{post._id}">
                <h4>Postname: {post.postheader}</h4>
            </Link>
            </div>
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
        color: rgb(60, 57, 57);
        margin: 0px;
    }

    .fullpage {
        width: 50%;
        margin: auto;
        text-align: left
    }
    
    .forumcontent {
        border-collapse: collapse;
        border-top: 20px;
    }

    .forumsubheader {
        border: solid black 1px;
        border-collapse: collapse;
        margin-top: 40px;
        border-radius: 0.25em;
        background-color: grey;
    }

    .forumpost {
        border: solid black 1px;
        border-radius: 0.25em;
        display: flex;
        flex-direction: column;
        background-color: rgb(163, 163, 163);
    }

    .postuser {        

    }
</style>