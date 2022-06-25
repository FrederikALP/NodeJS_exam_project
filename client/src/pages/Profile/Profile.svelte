<script>
import { toast } from "@zerodevx/svelte-toast";
import { Link, Router, Route, useParams } from "svelte-navigator";
import { onMount, prevent_default } from "svelte/internal";
import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
import { useNavigate, useLocation, navigate } from "svelte-navigator";

const params = useParams();

let profileUser;
let avatar;
let avatarUpdate;
let description;

async function fetchUser() {
        const response = await fetch($baseURL + '/api/users/' + $params.id);
        const userArray = await response.json();
        profileUser = userArray;
        console.log(profileUser);
    };

    
    async function updateUser() {
    let updatedUser = {
        //description: updatedDescription,
        avatar: avatarUpdate
    };
    console.log(updatedUser);
    const res = await fetch($baseURL + '/api/users/' + $params.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
        })
        console.log(res.status);
        
        const result = await res.json()
        if (res.status === 200) {
            //fetchComments();
            toast.push('User edited succesfully')
            console.log(result);

            //const from = ($location.state && $location.state.from) || "/post/" + postid;
            //navigate(from, { replace: true });
        } else {
            toast.push(res.error);
        }
    }

    onMount(async() => {
        fetchUser();
    });


</script>

{#if profileUser}
<div class="userProfile">
    <div class="userInformation">
        <div class="avatarDiv">
        
         
           {#if profileUser.avatar}
           <img class="avatar" src="{profileUser.avatar}" alt=""  />
           {:else}
             <p>Upload profile picture</p>
             <input id="avatarUrl" placeholder="Image url" bind:value={avatarUpdate}>
             <button on:click="{updateUser}"></button>
           {/if}
        
        </div>
        <div class="userName-Email">
            {#if user}
                 <p>@{profileUser.username}</p>
                 <p>{profileUser.email}</p>
            {/if}
        </div>
        <div class="postCount">
            <p>Posts: {profileUser.postcount}</p>
        </div>
    </div>
    <div class="userDescription">
        {#if description}
             <h1>User description</h1>
             {profileUser.description}
        {/if}

    </div>

</div>
{/if}


<style>

.userProfile {
    width: 50%;
    margin: auto;
    text-align: left;
    word-wrap: break-word;
}

.userInformation {
    border: solid black 1px;
    border-radius: 0.25em;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
}
.avatarDiv {
    width: 30%;
}

.avatar {
    padding: 3px;
    width: 100%;
    height: 100%;

}

.userName-Email {
    width: 40%;
}

.userProfile {
        width: 50%;
        margin: auto;
        text-align: left;
        word-wrap: break-word;
    }

</style>