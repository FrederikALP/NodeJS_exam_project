<script>
import { toast } from "@zerodevx/svelte-toast";
import { Link, Router, Route } from "svelte-navigator";
import { prevent_default } from "svelte/internal";
import { baseURL, subid, postid, user } from "../../stores/generalStore.js";

function changeId(newid) {
        postid.set(newid)
        console.log(postid)
	};
    

async function createNewPost(event) {
    event.preventDefault();
  
    console.log(subid);
    console.log(user);
    let thisUser = user;

    const postheader = document.getElementById('postheader').value;
    const postbody = document.getElementById('postheader').value;
    let replycount = 0;

    const result = await fetch($baseURL + '/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postheader,
            postbody,
            replycount,
            subid,
            user: {
                username: "Kristian",
                userid: "62b318932f4dcd817799a245"
            } 
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        toast.push('Post created succesfully')
        changeId();
    } else {
        toast.push(result.error);
    }
}
</script>


<div class="new-post">
    {#if ($user.loggedIn)}
    <h1>Welcome {$user.currentUser.username}</h1>
    <h1>Welcome {$user.currentUser._id}</h1>

    {/if}
    <h1>New post</h1>
    <form on:submit|preventDefault={createNewPost}>
        <input type="text" name="postheader" autocomplete="off" placeholder="Post Title" id="postheader" required>
        <input type="text" name="postbody" autocomplete="off" placeholder="Text" id="postbody" required>  
        <input type="submit" value="Submit form">

    </form>
</div>