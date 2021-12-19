<script>
    export let pageType;

</script>

{#if pageType == 'login'}
    <div class="col-lg-6 d-none d-lg-flex">              <!-- This is correct dont mind the red line -->
        <div class="flex-grow-1 bg-login-image" style="background: url('images/login.jpg') center / cover no-repeat;"></div>
    </div>
{/if}

{#if pageType == 'register'}
    <div class="col-lg-5 d-none d-lg-flex">                           <!-- Also this is correct -->
        <div class="flex-grow-1 bg-register-image" style="background: url('images/register.jpg') center / cover no-repeat;"></div>
    </div>
{/if}

<style>

</style>