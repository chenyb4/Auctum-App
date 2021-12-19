<script>
    import tokenStore from '../stores/token';
    import { parseJwt } from "../js/parseJwt";

</script>

<ul class="navbar-nav text-light" id="accordionSidebar" style="margin-top: 16px;">
    {#if ($tokenStore.token != '')}
        {#if (parseJwt($tokenStore.token).role.includes('client'))}
            <li class="nav-item">
                <a class="nav-link" href="/home">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Auctions</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/my-bids">
                    <i class="fa fa-money"></i>
                    <span>My bids</span>
                </a>
            </li>
        {/if}
        {#if (parseJwt($tokenStore.token).role.includes('admin'))}
            <li class="nav-item">
                <a class="nav-link" href="/add-bicycle">
                    <i class="fa fa-bicycle"></i>
                    <span>Add bicycle</span>
                </a>
            </li>
        {/if}
    {/if}
    <li class="nav-item">
        <a on:click={$tokenStore.token = ''} class="nav-link" href="/login">
            <i class="far fa-user-circle"></i>
            <span>Log out</span>
        </a>
    </li>
</ul>

<style>

</style>