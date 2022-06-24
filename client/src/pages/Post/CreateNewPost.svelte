<script>
import { toast } from "@zerodevx/svelte-toast";
import { Link, Router, Route } from "svelte-navigator";
import { prevent_default } from "svelte/internal";
import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
import { useNavigate, useLocation, navigate } from "svelte-navigator";

const location = useLocation();

let newheader;
let newbody;
let idforredirect;

function changeId(newid) {
        postid.set(newid)
        console.log($postid)
	};
    

async function createNewPost() {
    //event.preventDefault();
  
    console.log($subid);
    console.log($user);

    let replycount = 0;

    let newPost = {
            postheader: newheader,
            postbody: newbody,
            replycount: 0,
            subid: $subid,
            userid: $user.currentUser._id
    };
    console.log(newPost);

    const response = await fetch($baseURL + '/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({post: newPost})
        })
        console.log(response.status)
    
    const result = await response.json()
        if (response.status === 200) {
            toast.push('Post created succesfully')
            changeId(result._id);
            idforredirect = result._id;
            console.log(result);
            console.log(result._id);
            navigate("/post/" + result._id, {replace: true});
            //const from = ($location.state && $location.state.from) || "/post/" + result._id;
            //navigate(from, { replace: true });
        } else {
            toast.push(response.error);
        }
}
</script>


<div class="new-post">
    {#if ($user.loggedIn)}
    <h1>Welcome user {$user.currentUser.username} userid: {$user.currentUser._id}</h1>
    <h1>Welcome {$user.currentUser._id}</h1>

    <h1>New post</h1>
        <input type="text" name="postheader" autocomplete="off" placeholder="Post Title" id="header" bind:value="{newheader}" required>
        <input type="text" name="postbody" autocomplete="off" placeholder="Text" id="posttext" bind:value="{newbody}" required>  
        <button on:click={createNewPost} to="/post/{idforredirect}">submitform</button>
    {/if}
</div>