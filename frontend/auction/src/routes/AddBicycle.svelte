<script>
    import tokenStore from '../stores/token';
    import { LightPaginationNav, paginate } from 'svelte-paginate';
    import router from 'page';
    import { fade, fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    let targetURL = 'http://localhost:3000/bikes';

    let items = [];
    let postNewBrand,postNewFrameType,postNewFrameHeight,postNewDate = '';
    let bikeId,editBrand,editFrameType,editFrameHeight = '';
    //To convert the date to dd-mm-yyyy form
    let today = new Date().toISOString().split("T")[0];

    //For pagination
    let currentPage = 1;
    let pageSize = 7;
    $: paginatedItems = paginate({ items, pageSize, currentPage });

    /**
     * GET request for getting all the bikes
     * @returns {Promise<void>} that contains all the bikes
     */

    async function getBikes () {
        try {
            const resp = await fetch(targetURL, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': 'Bearer '+$tokenStore.token
                }
            });
            items = await resp.json();
        }catch (e){
            alert(e);
        }
    }

    /**
     * POST request
     * @returns {Promise<void>} that add a new bicycle to the back-end
     */

    async function addBike() {
        await fetch(targetURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'Bearer '+$tokenStore.token
            },
            body: JSON.stringify({
                brand:postNewBrand,
                frameType:postNewFrameType,
                frameHeightInCm:postNewFrameHeight,
                endingDate:postNewDate
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    //location.reload();
                    router.redirect('/home');
                    router.redirect('/add-bicycle');
                    console.log("Success!");
                } else {
                    res.json().then((body) => {
                        alert(body.message || "Internal error");
                    });
                }
            })
            .catch(async (err) => {
                alert(err)
            });
    }

    /**
     * PUT request
     * @returns {Promise<void>} that modify a bike from the available bikes
     */

    async function editBike () {
        await fetch(targetURL, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer '+$tokenStore.token
            },
            body: JSON.stringify({
                id: bikeId,
                brand:editBrand,
                frameType:editFrameType,
                frameHeightInCm:editFrameHeight
            })
        }).then(async (res) => {
            if (res.ok) {
               // location.reload();
                router.redirect('/home');
                router.redirect('/add-bicycle');
                console.log("Success!");
            } else {
                res.json().then((body) => {
                    alert(body.message || "Internal error");
                });
            }
        }).catch(async (err) => {
            alert(err);
        });
    }

    /**
     * DELETE request
     * @param bikeId to be deleted
     * @returns {Promise<void>} that deletes the bike from the back-end with a given id
     */

    async function deleteBike (bikeId) {

        await fetch(targetURL+'/'+bikeId, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer '+$tokenStore.token
            }
        })
            .then(async (res) => {
                if (res.ok) {
                    router.redirect('/home');
                    router.redirect('/add-bicycle');
                    console.log("Success!");
                } else {
                    res.json().then((body) => {
                        alert(body.message || "Internal error");
                    });
                }
            })
            .catch(async (err) => {
                alert(err);
            });
    }

    /**
     * @param id of the bike
     * @returns {id}
     */

    async function getId(id) {
        bikeId = id;
        await fillBikeInfoIntoForm();
        return id;
    }

    /**
     * This will fill the from in the front-end to easily modify the bike
     */

    async function fillBikeInfoIntoForm(){
        //first get bikeinfo to place in the form
        const bikeResp = await fetch(targetURL+'/'+bikeId,{
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer '+$tokenStore.token
            }
        });
        let bikeJson = await bikeResp.json();
        editBrand = bikeJson.brand;
        editFrameHeight = bikeJson.frameHeightInCm;
        editFrameType = bikeJson.frameType;
    }

    getBikes();

    /**
     * decode the token into payload
     * declaration of reference: this function comes directly from: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
     * @param token
     * @returns {any}
     */

    function parseJwt (token) {
        if (token != ''){
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }
    }

   /* //check if the user is admin
    function checkUser() {
        if ($tokenStore.token != ''){
            if (!(parseJwt($tokenStore.token).role.includes('admin'))){
                alert(`${parseJwt($tokenStore.token).name} is not an admin!`);
                router.redirect('/home');
            }
        }
    }
    checkUser();*/

    /**
     * This will collapse the from
     */

    function closeCollapse() {
        this.parentElement.parentElement.parentElement.parentElement.classList.remove('show');
    }

</script>

<body id="page-top">
<div id="wrapper">
    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div class="container-fluid d-flex flex-column p-0"><a
                class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href=""
                style="padding-top: 36px;">
            <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-chart-line"></i></div>
            <div class="sidebar-brand-text mx-3"><span style="font-size: 25px;">Auctum<br></span><span
                    class="text-capitalize" style="font-size: 12px;font-family: 'Bad Script', serif;">Get your dream<br>&nbsp;Bike today!</span>
            </div>
        </a>
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
            <div class="text-center d-none d-md-inline">
                <button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
            </div>
        </div>
    </nav>
    <div class="d-flex flex-column" id="content-wrapper">
        <div id="content">
            <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div class="container-fluid">
                    <button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i
                            class="fas fa-bars"></i></button>
                    <form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div class="input-group"><input class="bg-light form-control border-0 small" type="text"
                                                        placeholder="Search for ...">
                            <button class="btn btn-info py-0" type="button"><i class="fas fa-search" style="color: white"></i></button>
                        </div>
                    </form>
                    <ul class="navbar-nav flex-nowrap ms-auto">
                        <li class="nav-item">
                            <a class="nav-link oneLine" href="#">
                                {#if $tokenStore.token != ''}
                                    {parseJwt($tokenStore.token).email}
                                {/if}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="container-fluid">
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
                <div class="row">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr class="text-center">
                                    <th>Brand</th>
                                    <th>Frame Type</th>
                                    <th>Frame Height in cm</th>
                                    <th>Ending date</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody class="text-center">
                                {#each paginatedItems as bike (bike.id)}
                                    <tr animate:flip in:fade out:fly={{x:100}}>
                                        <td>{bike.brand}</td>
                                        <td>{bike.frameType}</td>
                                        <td>{bike.frameHeightInCm}</td>
                                        <td>{bike.endingDate}</td>
                                        <td>
                                            <button on:click={deleteBike(bike.id)} class="btn btn-danger" type="button">Delete</button>
                                        </td>
                                        <td>
                                            <button on:click={getId(bike.id)} class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#form">Modify
                                            </button>
                                        </td>
                                    </tr>
                                {:else}
                                    {#if items.length > 0}
                                        <span class="spinner-border mt-2" role="status"></span>
                                    {:else }
                                        <p in:fade={{delay:600}}>No bicycles to show!</p>
                                    {/if}
                                {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div  class="row collapse" id="form">
                    <div class="col">
                        <form>
                            <input bind:value={editBrand} class="form-control oneLine" type="text" name="brand"
                                     placeholder="Enter the brand" style="width: 60%;margin-bottom: 10px;"
                                     required>
                            <input bind:value={editFrameType} class="form-control oneLine" type="text"
                                   placeholder="Enter your frame type" name="frame-type"
                                   style="width: 60%;margin-bottom: 10px;" required>
                            <input bind:value={editFrameHeight} class="form-control oneLine" type="number" placeholder="Enter frame height (cm)" name="frame-height"
                                style="width: 60%;margin-bottom: 10px;" required>
                            <div class="mb-4">
                                <button on:click|preventDefault={editBike} class="btn btn-primary" type="submit">Submit</button>
                                <button class="btn btn-warning text-light" type="button" on:click={closeCollapse}><strong>Close</strong></button>
                            </div>
                        </form>
                    </div>
                </div>

                {#if items.length > 0}
                    <LightPaginationNav
                            totalItems="{items.length}"
                            pageSize="{pageSize}"
                            currentPage="{currentPage}"
                            limit="{1}"
                            showStepOptions="{true}"
                            on:setPage="{(e) => currentPage = e.detail.page}"
                    />
                {/if}

            </div>
        </div>

        <footer class="bg-white d-xl-flex justify-content-xl-center align-items-xl-end sticky-footer mt-3">
            <div class="container my-auto">
                <div class="text-center my-auto copyright"><span>Copyright © Auctum 2021</span></div>
            </div>
        </footer>

    </div>
    <a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a></div>
<div class="modal fade" role="dialog" tabindex="-1" id="modal-3" aria-hidden="true" aria-labelledby="modal-3label">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header"><h4 class="modal-title">Add bicycle</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <input bind:value={postNewBrand} class="form-control oneLine" type="text" style="margin-bottom: 8px;" placeholder="Enter the brand" required>
                    <input bind:value={postNewFrameType} class="form-control oneLine" type="text" style="margin-bottom: 8px;" placeholder="Enter the frame type" required>
                    <input bind:value={postNewFrameHeight} class="form-control oneLine" type="number" style="margin-bottom: 8px;" placeholder="Enter the frame height in cm" required>
                    <label class="form-label" for="date">Enter the ending date</label>
                    <input min={today} bind:value={postNewDate} class="form-control oneLine" id="date" type="date" name="date" required>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" data-bs-dismiss="modal">Close</button>
                <button on:click={addBike} class="btn btn-primary" data-bs-dismiss="modal" type="submit">Save</button>
            </div>
        </div>
    </div>
</div>

<script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
<script defer src="assets/js/script.min.js"></script>

</body>

<style>

</style>