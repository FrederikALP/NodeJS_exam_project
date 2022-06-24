<script>
    import { Link, Router, Route } from "svelte-navigator";
    import { useNavigate, useLocation } from "svelte-navigator";

    import { onMount } from 'svelte';
    import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
    import Post from "../Post/Post.svelte";
    

    let posts;
    let users;

    async function fetchPosts() {
        const response = await fetch($baseURL + '/api/postsBySubforum/' + $subid);
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

    function changeId(newid) {
        postid.set(newid)
        console.log($postid)
	};

    onMount(async () => {
        fetchPosts();
        fetchUsers();
    });


</script>

<div>
    <Link to="/create-new-post"><button>Create new post</button></Link>
    {#if ($user.loggedIn)}
    <h1>Welcome {$user.currentUser.username}</h1>
    {/if}
    <table>
        {#if posts} 
        {#each posts as post}
            <nav>
                <tr>
                    <Link on:click="{changeId(post._id)}" to="/post/{post._id}">
                    <th>
                Postname: {post.postheader}
                </th>
                </Link>
                 {#if users}
                 {#each users as user}
                 {#if post.userid === user._id}
                 <th>
                    Posted by {user.username}
                </th>
                {/if}
                {/each}
                {/if}
            </tr>
            </nav>
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

    tr {
        width: 100%;
    }

    th {
        width: 100%;
    }

    td {
        text-align: left;
    }

    table {
        width: 50%;
        margin: auto;
    }
</style>