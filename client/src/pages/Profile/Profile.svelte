<script>
import { toast } from "@zerodevx/svelte-toast";
import { useParams } from "svelte-navigator";
import { onMount } from "svelte/internal";
import { baseURL, subid, postid, user } from "../../stores/generalStore.js";

const params = useParams();

let profileUser;
let avatar;
let patchedAvatar;
let patchedUserDescription;

async function fetchUser() {
        const response = await fetch($baseURL + '/api/users/' + $params.id);
        const userArray = await response.json();
        profileUser = userArray;
    };

    
    async function updateUser() {
        let updatedUser = {
            description: patchedUserDescription,
            avatar: patchedAvatar
        }

    const res = await fetch($baseURL + '/api/users/' + $params.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
    
    const result = await res.json()
    if (res.status === 200) {
            toast.push('User edited succesfully')
            profileUser = result;
        } else {
            toast.push(res.error);
        }
    };

    onMount(async() => {
        fetchUser();
    });

//<input id="avatarUrl" placeholder="Image url" bind:value={patchedAvatar}>
</script>

{#if profileUser}
<div class="user-profile">
    <div class="userInformation">
        <div class="avatarDiv">
            {#if !profileUser.toggleAvatar}
                <img class="avatar" src="{profileUser.avatar}" alt=""/>
            {:else}
                <p>Upload profile picture</p>
                <input id="avatarUrl" placeholder={profileUser.avatar} bind:value={patchedAvatar}>
                <button on:click="{updateUser}" on:click="{() => profileUser.toggleAvatar = !profileUser.toggleAvatar}">save</button>   
            {/if}
                <button class="edit-btn" on:click={() => profileUser.toggleAvatar = !profileUser.toggleAvatar}>Edit avatar</button>
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
        <h1>User description</h1>
            {#if !profileUser.descriptionToggle}
                <div class="profile-description-div">{profileUser.description}</div>
            {:else}
                <textarea type=text name="profile-description-text" autocomplete="off" placeholder={profileUser.description} id="profile-description" bind:value="{patchedUserDescription}"></textarea>
                <button on:click="{updateUser}" on:click="{() => profileUser.descriptionToggle = !profileUser.descriptionToggle}">save</button>            
            {/if}     
        <button class="edit-btn" on:click={() => profileUser.descriptionToggle = !profileUser.descriptionToggle}>Edit description</button>
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

.edit-btn {
    margin-left: 5px;
    border-radius: 0.35em;
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
    height: 30%;
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

.profile-description-div {
    padding-bottom: 15px;
    padding-left: 10px;
    border: solid black 1px;
    border-radius: 0.25em;
    text-align: left;
    word-wrap: break-word;
    margin: 5px;
}
</style>