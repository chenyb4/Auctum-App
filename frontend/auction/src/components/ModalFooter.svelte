<script>
    export let footerFunction;
    export let highestBid;
</script>

<div class="modal-footer">
    <button class="btn btn-danger" type="button" data-bs-dismiss="modal">Close</button>
    <button disabled={highestBid} hidden={!footerFunction} on:click={footerFunction} class="btn btn-primary" data-bs-dismiss="modal" type="submit">Save</button>
</div>

<style>

</style>