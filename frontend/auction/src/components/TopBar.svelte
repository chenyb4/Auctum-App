<script>
    import tokenStore from '../stores/token';
    import { parseJwt } from "../js/parseJwt";
    import SearchBar from "./SearchBar.svelte";

</script>

<nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
    <div class="container-fluid">
        <button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button">
            <i class="fas fa-bars"></i>
        </button>
        <SearchBar/>
        <ul class="navbar-nav flex-nowrap ms-auto">
            <li class="nav-item">
                <a class="nav-link oneLine" href="#">
                    {#if ($tokenStore.token != '')}
                        {parseJwt($tokenStore.token).email}
                    {/if}
                </a>
            </li>
        </ul>
    </div>
</nav>

<style>

</style>