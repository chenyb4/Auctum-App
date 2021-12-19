<script>
	import routes from 'page'
	import Home from './routes/Home.svelte';
	import Login from "./routes/Login.svelte";
	import Register from "./routes/Register.svelte";
	import AddBicycle from "./routes/AddBicycle.svelte";
    import store from './stores/token';
    import router from "page";
    import MyBids from "./routes/MyBids.svelte";
    import { SvelteToast } from '@zerodevx/svelte-toast'

	let page;
	let params;

    /**
     * Setting different routes for different pages, as the landing page will be the login page
     */

    router('/', (ctx) => page = (Login))
	routes('/home', (ctx) => page = (Home));
	routes('/login', (ctx) => page = (Login));
	routes('/register', (ctx) => page = (Register));
	routes('/add-bicycle', (ctx) => page = (AddBicycle));
    routes('/my-bids', (ctx) => page = (MyBids))
	routes.start();

    function checkLogin() {
        if ($store.token == ''){
            routes.redirect('/login');
        }
    }
    //This will check if the user is logged in
    checkLogin();

</script>
<svelte:component this={page} params={params}/>

<SvelteToast/>

<main>

</main>

<style>

</style>