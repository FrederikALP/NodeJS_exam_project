<script>
    import { Link, Router, Route } from "svelte-navigator";
    import { onMount } from 'svelte';
    import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
    import { toast } from "@zerodevx/svelte-toast";


    let comments;
    let newCommentBody;
    let users;

    async function fetchComments() {
        console.log($postid);
        const response = await fetch($baseURL + '/api/commentsByPost/' + $postid);
        const commentsArray = await response.json();
        comments = commentsArray;
        console.log(comments);
    };

    async function fetchUsers() {
        const response = await fetch($baseURL + '/api/users');
        const usersArray = await response.json();
        users = usersArray;
        console.log(users);
    };

    async function fetchUser(postuserid) {
        const userid = postuserid;
        const response = await fetch($baseURL + '/api/users' + userid);
        const usersArray = await response.json();
        users = usersArray;
        console.log(users);
    };

    async function createNewComment() {
        let newComment = {
            commentbody: newCommentBody,
            postid: $postid,
            userid: $user.currentUser._id
        };
        console.log(newComment)

        const response = await fetch($baseURL + '/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: newComment})
            })
            console.log(response.status)
        
        const result = await response.json()
            if (response.status === 200) {
                toast.push('Comment created succesfully')
                console.log(result);
            } else {
                toast.push(response.error);
            }
    }

    onMount(async () => {
        fetchComments()
        fetchUsers()
    });

    function changeId(newid) {
        id.set(newid)
        console.log(id)
	};
</script>

<div>   
    {#if comments} 
    <table>
        
    {#each comments as comment}
    <tr>
        {#if users} 
        {#each users as user}
           {#if comment.userid === user._id}
           <td>@User: {user.username}</td>
           <td>Comment: {comment.commentbody}</td>
            {/if}
        {/each}
        {/if}
    </tr>
    {/each}
    </table>
    {/if}
    <textarea type="text" name="new-comment-body" autocomplete="off" placeholder="Comment here" id="commenttext" bind:value="{newCommentBody}" required></textarea>
    <button on:click="{createNewComment}">Create comment</button>
</div>

<style>
    table, tr, th {
        border: solid black 1px;
        border-collapse: collapse;
        text-align: left;
    }

    td {
        text-align: left;
        border: solid black 1px;
    }

    table {
        width: 50%;
        margin: auto;
    }
</style>