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
    let userIsLoggedIN;
    let post;
    

    async function fetchComments() {
        console.log($postid);
        const response = await fetch($baseURL + '/api/commentsByPost/' + $postid);
        const commentsArray = await response.json();
        comments = commentsArray;
        comments.map( comment =>{
            return comment.editToggle = false;
        });
        console.log(comments);
    };

    async function fetchUsers() {
        const response = await fetch($baseURL + '/api/users');
        const usersArray = await response.json();
        users = usersArray;
        console.log(users);
    };

    async function fetchPost() {
        const response = await fetch($baseURL + '/api/posts/' + $postid);
        const postsArray = await response.json();
        post = postsArray;
        console.log(post);
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
    };

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

    async function toggleEditComment(comment) {

        comment.editToggle = !comment.editToggle 
    }

    async function updateComment(id) {
        let updatedComment = {
            commentbody: newCommentBody,
            postid: $postid,
            userid: $user.currentUser._id
        };
        const res = await fetch($baseURL + '/api/comment/' + id, {
            method: 'PATCH',
            })
            console.log(res.status);
            
            const result = await res.json()
            if (res.status === 200) {
                toast.push('Comment edited succesfully')
                console.log(result);
                const from = ($location.state && $location.state.from) || "/post/" + postid;
                navigate(from, { replace: true });
            } else {
                toast.push(res.error);
            }
        
    }

    onMount(async () => {
        fetchComments();
        fetchUsers();
        fetchPost();
    });

    function changeId(newid) {
        id.set(newid)
        console.log(id)
	};
</script>

<div>   
    {#if comments, post}
    <table>
    <tr>
        <td>{#each users as postuser}{#if post.userid === postuser._id}{postuser.username}{/if}{/each}</td>
        <td>Post text: {post.postbody}</td>
        <td>edit post skal være her</td>
    </tr>
    {#each comments as comment}
    <tr>
        {#if users} 
        {#each users as user1}
           {#if comment.userid === user1._id}
           <td>@User: {user1.username}</td>
           <td>
                {#if !comment.editToggle}
                    Comment: {comment.commentbody}
                {:else}
                    <textarea type="text" name="new-comment-body" autocomplete="off" placeholder="{comment.commentbody}" id="commenttext" bind:value="{comment.commentbody}"></textarea>
                    <button on:click="{updateComment(comment._id)}" on:click="{() => comment.editToggle = !comment.editToggle}">save</button>
                {/if}
            </td>
           {#if (comment.userid === $user.currentUser._id)}
           <td><Link on:click="{deleteComment(comment._id)}" to="/deleteComment/{comment._id}"><button>Delete comment</button></Link></td>
           <button on:click={() => comment.editToggle = !comment.editToggle}>Edit comment</button>
           {/if}
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