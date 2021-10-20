<script>
	import routes from 'page'
	import Home from './routes/Home.svelte';
	import Login from "./routes/Login.svelte";
	import Register from "./routes/Register.svelte";
	import AddBicycle from "./routes/AddBicycle.svelte";
    import store from './stores/token';

	let page;
	let params;

	routes('/', (ctx) => page = (Login));
	routes('/home', (ctx) => page = (Home));
	routes('/login', (ctx) => page = (Login));
	routes('/register', (ctx) => page = (Register));
	routes('/add-bicycle', (ctx) => page = (AddBicycle));
	routes.start();

    function checkLogin() {
        if ($store.token !== ''){
            routes.redirect('/home')
        }else {
            routes.redirect('/login')
        }
    }

    //This will check if the user is logged in
    checkLogin();

</script>
<svelte:component this={page} params={params}/>

<main>



</main>

<style>

</style>