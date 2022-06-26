<script>
import { toast } from "@zerodevx/svelte-toast";
import { Link, Router, Route, useParams } from "svelte-navigator";
import { onMount, prevent_default } from "svelte/internal";
import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
import { useNavigate, useLocation, navigate } from "svelte-navigator";

const params = useParams();

let profileUser;
let avatar;
let patchedAvatar;
let patchedUserDescription;

async function fetchUser() {
        const response = await fetch($baseURL + '/api/users/' + $params.id);
        const userArray = await response.json();
        profileUser = userArray;
        console.log(profileUser);
    };

    
    async function updateUser() {
    let updatedUser = {
        description: patchedUserDescription,
        avatar: patchedAvatar
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
<div class="user-profile">
    <div class="userInformation">
        <div class="avatarDiv">
        
         
           {#if profileUser.avatar}
           <img class="avatar" src="{profileUser.avatar}" alt=""/>
           {:else}
             <p>Upload profile picture</p>
             <input id="avatarUrl" placeholder="Image url" bind:value={patchedAvatar}>
             <button on:click="{updateUser}"></button>
           {/if}
        
        </div>
        <div class="userName-Email">
            {#if user}
                 <p>Username: @{profileUser.username}</p>
                 <p>Email: {profileUser.email}</p>
            {/if}
        </div>
        <div class="postCount">
            <p>Posts: {profileUser.postcount}</p>
        </div>

        
    </div>
    <div class="userDescription">
        {#if profileUser.description}      
        <h1>User description</h1>
            {#if !profileUser.editToggle}
            <div class="descriptionText">{profileUser.description}</div>
            {:else}
            <input id="avatarUrl" placeholder="Image url" bind:value={patchedAvatar}>
            <textarea type=text name="profile-description-text" autocomplete="off" placeholder={profileUser.description} id="profile-description" bind:value="{patchedUserDescription}"></textarea>
            <button on:click="{updateUser()}" on:click="{() => profileUser.editToggle = !profileUser.editToggle}">save</button>            
            {/if}
        {/if}       
        <button on:click={() => profileUser.editToggle = !profileUser.editToggle}>Edit profile</button>
    </div>
</div>
{/if}

<style>
h1 {
    font-size: 20px;
    padding-bottom: 15px;
    margin: auto;
    padding: 10px;
}

.user-profile {
    width: 50%;
    margin: auto;
    text-align: left;
    word-wrap: break-word;
}

.userInformation {
    background-color: lightgray;
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
    width: 95%;
    height: 95%;
}

.userName-Email {
    width: 40%;
}

.userDescription {
    background-color: lightgrey;
    border: solid black 1px;
    border-radius: 0.25em;
    padding-bottom: auto;
}

.descriptionText {
    padding-bottom: 15px;
    padding-left: 10px;
    border: solid black 1px;
    border-radius: 0.25em;
    text-align: left;
    word-wrap: break-word;
}
</style>