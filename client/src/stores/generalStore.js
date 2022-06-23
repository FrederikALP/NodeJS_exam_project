import { readable, writable } from "svelte/store";

export const baseURL = readable("http://localhost:3000")
export const user = writable( { loggedIn: false } );
export const subid = writable( { } );
export const postid = writable( { } )