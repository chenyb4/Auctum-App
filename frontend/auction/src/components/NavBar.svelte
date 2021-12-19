<script>
import AccordionSideBar from "./AccordionSideBar.svelte";
import Logo from "./Logo.svelte";

</script>

<nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
    <div class="container-fluid d-flex flex-column p-0">
        <Logo/>
        <AccordionSideBar/>
        <div class="text-center d-none d-md-inline">
            <button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
        </div>
    </div>
</nav>

<style>

</style>