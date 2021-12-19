<script>
    export let showIdAndHighestBid;
    export let myBids;
    export let bidOnBike;

</script>

<thead>
<tr class="text-center">
    {#if !myBids}
        {#if showIdAndHighestBid}
            <th>ID</th>
        {/if}
        <th>Brand</th>
        <th>Frame Type</th>
        <th>Frame Height</th>
        {#if showIdAndHighestBid}
            <th>Current Highest Bid</th>
        {/if}
        <th>Ending date</th>
        {#if bidOnBike}
            <th>My Bid</th>
            {:else}
                <th></th>
                <th></th>
        {/if}
    {/if}
    {#if myBids}
        <th>Price</th>
        <th>For Bike</th>
        <th></th>
    {/if}
</tr>
</thead>

<style>

</style>