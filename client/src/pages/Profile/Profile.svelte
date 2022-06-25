<script>
import { toast } from "@zerodevx/svelte-toast";
import { Link, Router, Route } from "svelte-navigator";
import { prevent_default } from "svelte/internal";
import { baseURL, subid, postid, user } from "../../stores/generalStore.js";
import { useNavigate, useLocation, navigate } from "svelte-navigator";


async function fetchUser() {
        console.log($postid);
        const response = await fetch($baseURL + '/api/users/' + user.id);
        const postsArray = await response.json();
        post = postsArray;
        console.log(post);
    };
</script>

Hey {user.currentUser.id}
