<script>
    import { Link, Router, Route, useParams } from "svelte-navigator";
    import { onMount } from 'svelte';
    import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
    import { toast } from "@zerodevx/svelte-toast";
    import { useNavigate, useLocation } from "svelte-navigator";
    import { io } from "socket.io-client";

    const navigate = useNavigate();
    const location = useLocation();

    let comments = [];
    let newCommentBody;
    let patchedCommentBody;
    let patchedPostBody;
    let users;
    let post;
    const params = useParams();

    const socket = io("ws://localhost:3000");
        socket.on("comment", (data) => {
        console.log('hsbgfjhdfgdfg')
        comments = [...comments, data]
    }),
        socket.on("updatecomment", (data) => {
        console.log('hsbgfjhdfgdfg')
        fetchComments();
    }),
    socket.on("deletecomment", (data) => {
        console.log('hsbgfjhdfgdfg')
        fetchComments();
    });


    async function fetchComments() {
        console.log($postid);
        const response = await fetch($baseURL + '/api/commentsByPost/' + $params.id);
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
        console.log($postid);
        const response = await fetch($baseURL + '/api/posts/' + $params.id);
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
                fetchComments();
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
                //comments.push(result);
                //comments = comments;
                toast.push('Comment created succesfully')
                console.log(result);
            } else {
                toast.push(res.error);
            }
    }

    async function updateComment(id) {
 
        let updatedComment = {
            commentbody: patchedCommentBody
        };
        console.log(updatedComment);
        const res = await fetch($baseURL + '/api/comment/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedComment)
            })
            console.log(res.status);
            
            const result = await res.json()
            if (res.status === 200) {
                //fetchComments();
                toast.push('Comment edited succesfully')
                console.log(result);

                //const from = ($location.state && $location.state.from) || "/post/" + postid;
                //navigate(from, { replace: true });
            } else {
                toast.push(res.error);
            }
    }

    async function updatePost(id) {
 
    let updatedPost = {
        postbody: patchedPostBody
    };
    console.log(updatedPost);
    const res = await fetch($baseURL + '/api/post/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
        })
        console.log(res.status);
        
        const result = await res.json()
        if (res.status === 200) {
            fetchPost();
            toast.push('Post edited succesfully')
            console.log(result);

            //const from = ($location.state && $location.state.from) || "/post/" + postid;
            //navigate(from, { replace: true });
        } else {
            toast.push(res.error);
        }
    }

    onMount(async () => {
        fetchComments();
        fetchUsers();
        fetchPost();
        socket.connect()
    });

    function changeId(newid) {
        id.set(newid)
        console.log(id)
	};
</script>

<div class="fullpage">   
    {#if comments && post && users}
    <div class="postheader">
        <h3>Threadheader: {post.postheader}</h3>
    </div>
    <div class="postandcomment">
        {#each users as postuser}
        {#if post.userid === postuser._id}
            <div class="postuser">Threadstarter: {postuser.username}</div>
        {/if}
        {/each}
        <div class="postbody">
            {#if !post.editToggle}
                Postbody: {post.postbody}
            {:else}
                <textarea type="text" name="new-comment-body" autocomplete="off" placeholder="{post.postbody}" id="postbody" bind:value="{patchedPostBody}"></textarea>
                <button on:click="{updatePost(post._id)}" on:click="{() => post.editToggle = !post.editToggle}">save</button>
            {/if}
        </div>
        {#if ($user.loggedIn)}
            {#if (post.userid === $user.currentUser._id)}
            <button on:click={() => post.editToggle = !post.editToggle}>Edit postbody</button>
            {/if}
        {/if}
    </div>
    {#each comments as comment}
    <div class="postandcomment">
        {#if users} 
        {#each users as user1}
        {#if comment.userid === user1._id}
        <div class="postuser">
        @User: {user1.username}
        </div>
        <div class="postbody">
            {#if !comment.editToggle}
            Comment: {comment.commentbody}
            {:else}
            <textarea type="text" name="new-comment-body" autocomplete="off" placeholder="{comment.commentbody}" id="commenttext" bind:value="{patchedCommentBody}"></textarea>
            <button on:click="{updateComment(comment._id)}" on:click="{() => comment.editToggle = !comment.editToggle}">save</button>
            {/if}
        </div>
        {#if ($user.loggedIn)}
            {#if (comment.userid === $user.currentUser._id)}
            <div class="deleteeditbutton">
            <button on:click="{deleteComment(comment._id)}">Delete comment</button>
            <button on:click={() => comment.editToggle = !comment.editToggle}>Edit comment</button>
                </div>
            {/if}
           {/if}
        {/if}
        {/each}
        {/if}
    </div>
    {/each}
    {/if}
    {#if ($user.loggedIn)}
    <textarea type="text" name="new-comment-body" autocomplete="off" placeholder="Comment here" id="commenttext" bind:value="{newCommentBody}" required></textarea>
    <button on:click="{createNewComment}">Create comment</button>
    {/if}
</div>

<style>

    h3 {
        color: white;
        margin: 0px;
    }



    .fullpage {
        width: 50%;
        margin: auto;
        text-align: left;
        word-wrap: break-word;
    }

    .postheader {
        border: solid black 1px;
        border-collapse: collapse;
        margin-top: 40px;
        border-radius: 0.25em;
        background-color: grey;
    }

    .postandcomment {
        border: solid black 1px;
        border-radius: 0.25em;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        background-color: rgb(190, 190, 190);
    }

    .postuser {        
        width: 20%;
        background-color: rgb(154, 154, 154);
    }

    .postbody {
        width: 60%;
    }

    .deleteeditbutton {
        width: 20%;
    }
</style>