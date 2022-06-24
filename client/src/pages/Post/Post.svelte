<script>
    import { Link, Router, Route } from "svelte-navigator";
    import { onMount } from 'svelte';
    import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
    import { toast } from "@zerodevx/svelte-toast";
    import { useNavigate, useLocation } from "svelte-navigator";

    const navigate = useNavigate();
    const location = useLocation();

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

    async function deleteComment(id) {
        const res = await fetch($baseURL + '/api/comment/' + id, {
            method: 'DELETE',
            })
            console.log(res.status);
            
            const result = await res.json()
            if (res.status === 200) {
                toast.push('Comment deleted succesfully')
                console.log(result);
                const from = ($location.state && $location.state.from) || "/post/" + postid;
                navigate(from, { replace: true });
            } else {
                toast.push(res.error);
            }
        
    }

    async function createNewComment() {
        let newComment = {
            commentbody: newCommentBody,
            postid: $postid,
            userid: $user.currentUser._id
        };
        console.log(newComment)

        const res = await fetch($baseURL + '/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: newComment})
            })
            console.log(res.status)
        
        const result = await res.json()
            if (res.status === 200) {
                toast.push('Comment created succesfully')
                console.log(result);
                const from = ($location.state && $location.state.from) || "/post/" + postid;
                navigate(from, { replace: true });
            } else {
                toast.push(res.error);
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
<<<<<<< HEAD
           <span>@User: {user.username}</span>
           <br>
           <span>Comment: {comment.commentbody}</span>
           <span>Comment ID: {comment._id}</span>

           <Link on:click="{deleteComment(comment._id)}" to="/deleteComment/{comment._id}"><button>Delete comment</button></Link>
           <br>
           <br>
=======
           <td>@User: {user.username}</td>
           <td>Comment: {comment.commentbody}</td>
>>>>>>> 4850768a23a696279679ba0e00eb0c4984a4db2b
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