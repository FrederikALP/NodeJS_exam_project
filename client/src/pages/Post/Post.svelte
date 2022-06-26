<script>
    import { useParams } from "svelte-navigator";
    import { onMount } from 'svelte';
    import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
    import { toast } from "@zerodevx/svelte-toast";
    import { io } from "socket.io-client";

    let comments = [];
    let newCommentBody;
    let patchedCommentBody;
    let patchedPostBody;
    let users;
    let post;
    const params = useParams();

    const socket = io("ws://localhost:3000");
        socket.on("comment", (data) => {
        comments = [...comments, data]
    }),
        socket.on("updatecomment", () => {
        fetchComments();
    }),
    socket.on("deletecomment", () => {
        fetchComments();
    });

    async function fetchPost() {
        const response = await fetch($baseURL + '/api/posts/' + $params.id);
        const postsArray = await response.json();
        post = postsArray;
    };

    async function fetchComments() {
        const response = await fetch($baseURL + '/api/commentsByPost/' + $params.id);
        const commentsArray = await response.json();
        comments = commentsArray;
        comments.map( comment =>{
            return comment.editToggle = false;
        });
    };

    async function fetchUsers() {
        const response = await fetch($baseURL + '/api/users');
        const usersArray = await response.json();
        users = usersArray;;
    };



    async function updatePost(post) {
        let updatedPost = {
            postbody: post.postbody
        };
        const res = await fetch($baseURL + '/api/post/' + post._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
            })
            
            const result = await res.json()
            if (res.status === 200) {
                fetchPost();
                toast.push('Post edited succesfully')
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

        const res = await fetch($baseURL + '/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: newComment})
            })
        
        const result = await res.json()
            if (res.status === 200) {
                toast.push('Comment created succesfully');
            } else {
                toast.push(res.error);
            }
    }

    async function updateComment(id) {
 
        let updatedComment = {
            commentbody: patchedCommentBody
        };
        const res = await fetch($baseURL + '/api/comment/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedComment)
            })
            
            const result = await res.json()
            if (res.status === 200) {
                toast.push('Comment edited succesfully')
            } else {
                toast.push(res.error);
            }
    }

    async function deleteComment(id) {
        const res = await fetch($baseURL + '/api/comment/' + id, {
            method: 'DELETE',
            })
            
            const result = await res.json()
            if (res.status === 200) {
                toast.push('Comment deleted succesfully')
                fetchComments();
            } else {
                toast.push(res.error);
            }
    };
    

    onMount(async () => {
        fetchComments();
        fetchUsers();
        fetchPost();
        socket.connect()
    });
</script>

<div class="fullpage">   
    {#if comments && post && users}
        <div class="postheader">
            <h3>Threadheader: {post.postheader}</h3>
            <div class="replycount">
                <h3>Comments: {post.replycount}</h3>
            </div>
        </div>
        <div class="post-div">
            {#each users as postuser}
            {#if post.userid === postuser._id}
                <div class="postuser">Threadstarter: @{postuser.username}</div>
            {/if}
            {/each}
            <div class="postbody">
                {#if !post.editToggle}
                    {post.postbody}
                {:else}
                    <textarea type="text"  name="new-comment-body" autocomplete="off" placeholder="{post.postbody}" id="postbody" bind:value="{post.postbody}"></textarea>
                    <button on:click="{updatePost(post)}" on:click="{() => post.editToggle = !post.editToggle}">save</button>
                {/if}
            </div>
            {#if ($user.loggedIn)}
            {#if (post.userid === $user.currentUser._id)}
                <button class="edit-post-btn" on:click={() => post.editToggle = !post.editToggle}>Edit Post</button>
            {/if}
            {/if}
        </div>
        {#each comments as comment}
            <div class="comment-div">
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
        <textarea type="text" class="comment-textarea" name="new-comment-body" autocomplete="off" placeholder="Comment here" id="commenttext" bind:value="{newCommentBody}" required></textarea>
        <button on:click="{createNewComment}">Create comment</button>
    {/if}
</div>

<style>

    h3 {
        color: white;
        margin: 0px;
    }
    .edit-post-btn {
        margin: auto;
    }

    .fullpage {
        width: 50%;
        margin: auto;
        text-align: left;
        word-wrap: break-word;
    }

    .comment-textarea {
        margin-left: 20%;
        margin-top: 2px;
        width: 60%;
    }

    .postheader {
        border: solid black 1px;
        border-collapse: collapse;
        margin-top: 40px;
        border-radius: 0.25em;
        background-color: grey;
    }

    .post-div {
        border: solid black 1px;
        border-radius: 0.25em;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        background-color: rgb(190, 190, 190);
        margin-bottom: 20px;
    }

    .comment-div {
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

    #postbody {
        height: -webkit-fill-available;
        width: -webkit-fill-available;
    }

    .deleteeditbutton {
        width: 20%;
    }
</style>