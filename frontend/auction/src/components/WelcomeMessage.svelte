<script>
    import tokenStore from '../stores/token';
    import { parseJwt } from "../js/parseJwt";
    export let homeMessage;
    export let addBicycleMessage;
    export let myBidsMessage;

</script>

{#if homeMessage}
    <div class="row">
        <div class="col-12">
            <h3 class="text-dark d-table mb-0">Welcome
                {#if ($tokenStore.token != '')}
                    {parseJwt($tokenStore.token).name}
                {/if}
            </h3>
        </div>
        <div class="col-12" style="margin-bottom: 5px;">
            <h4>Here is a list of bikes that are up for
                auction</h4>
        </div>
    </div>
{/if}

{#if addBicycleMessage}
    <div>
        <h3 class="text-dark">Welcome
            {#if $tokenStore.token != ''}
                {parseJwt($tokenStore.token).name}
            {/if}
        </h3>
        <h4 class="text-dark" style="margin: -1px -1px 5px;">
            Here you can
            add, remove or modify bikes
        </h4>
        <h4 class="text-dark" style="margin-bottom: 13px;">Add bicycle here&nbsp;
            <button
                    class="btn btn-primary border rounded-circle justify-content-xl-center align-items-xl-center"
                    id="add-button" type="button" style="border-radius: 0;" data-bs-target="#modal-3"
                    data-bs-toggle="modal">
                <i class="fas fa-plus"></i>
            </button>
        </h4>
    </div>
{/if}

{#if myBidsMessage}
    <div>
        <h4 class="text-dark" style="margin: -1px -1px 5px;">Here you can view all the
            bids that were placed by you!
            {#if ($tokenStore.token != '')}
                ({parseJwt($tokenStore.token).name})
            {/if}
            <br>
        </h4>
    </div>
{/if}

<style>

</style>

