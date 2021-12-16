<script>
    import tokenStore from "../stores/token";
    import router from "page";
    import { LightPaginationNav,paginate } from "svelte-paginate";
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    let targetURLBids='http://localhost:3000/bids';
    let bidsIWon=[];
    let bids=[];

    //For pagination
    let currentPage = 1;
    let pageSize = 5;
    $: paginatedItems = paginate({ items:bids, pageSize, currentPage });


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



    /**
     * GET request
     * @returns {Promise<void>}
     * @param userId
     */
    async function getAllBidsForOneUser(userId){
        try {
            const resp = await fetch(targetURLBids, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': 'Bearer '+$tokenStore.token
                }
            });

            let bidsJson = await resp.json();

            for (let bid of bidsJson) {
                if(bid.placedByUserId==userId){
                    bids.push(bid);
                    bids = bids;
                }
            }

        }catch (e){
            alert(e);
        }
    }

    /**
     * First it will check if the token is empty and then execute the method getAllBidsForOneUser
     */
    if ($tokenStore.token != ''){
        getAllBidsForOneUser(parseJwt($tokenStore.token).id);
    }

    /**
     * DELETE request
     * @param bidId to be deleted
     * @returns {Promise<void>} that deletes the bid from the back-end
     */
    async function deleteBid (bidId) {

        await fetch(targetURLBids+'/'+bidId, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer '+$tokenStore.token
            }
        }).then(async (res) => {
            if (res.ok) {
                console.log("Success!");
                router.redirect('/home');
                router.redirect('/my-bids');
            } else {
                res.json().then((body) => {
                    alert(body.message || "Internal error");
                });
            }
            }).catch(async (err) => {
                alert(err);
            });
    }

    //get bids I won
    async function getBidsIWon() {
        try {
            const resp = await fetch('http://localhost:3000/users/' + parseJwt($tokenStore.token).id + '/bikes-i-won', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': 'Bearer ' + $tokenStore.token
                }
            });

            bidsIWon = await resp.json();

        } catch (e) {
            alert(e);
        }
    }

    getBidsIWon();

</script>

<body id="page-top">
<div id="wrapper">
    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div class="container-fluid d-flex flex-column p-0">
            <a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href=""
                style="padding-top: 36px;">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="sidebar-brand-text mx-3">
                    <span style="font-size: 25px;">Auctum<br>
                    </span>
                    <span
                        class="text-capitalize" style="font-size: 12px;font-family: 'Bad Script', serif;">Get your dream<br>&nbsp;Bike today!
                    </span>
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
                                {#if ($tokenStore.token != '')}
                                    {parseJwt($tokenStore.token).email}
                                {/if}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="container-fluid">
                <div>
                    <h4 class="text-dark" style="margin: -1px -1px 5px;">Here you can view all the
                        bids that were placed by you!
                        {#if ($tokenStore.token != '')}
                            ({parseJwt($tokenStore.token).name})
                        {/if}
                        <br>
                    </h4>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr class="text-center">
                                    <th>Price</th>
                                    <th>For Bike</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody class="text-center">
                                    {#each paginatedItems as bid (bid.id)}
                                        <tr animate:flip in:fade>
                                            <td>{bid.price}€</td>
                                            <td>{bid.forBikeId}</td>
                                            <td>
                                                <button on:click={deleteBid(bid.id)} class="btn btn-danger" type="button">Delete</button>
                                            </td>
                                        </tr>
                                    {:else}
                                        {#if bids.length > 0}
                                            <span class="spinner-border mt-2" role="status"></span>
                                        {:else }
                                            <p in:fade={{delay:600}}>No bids to show!</p>
                                        {/if}
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                        {#if bids.length > 0}
                            <LightPaginationNav
                                    totalItems="{bids.length}"
                                    pageSize="{pageSize}"
                                    currentPage="{currentPage}"
                                    limit="{1}"
                                    showStepOptions="{true}"
                                    on:setPage="{(e) => currentPage = e.detail.page}"
                            />
                        {/if}
                    </div>
                </div>
                <h5 class="mt-3">Won bids:&nbsp;
                    <a href="#" data-bs-target="#modal-4" data-bs-toggle="modal">
                        {bidsIWon.length}
                    </a>
                </h5>
            </div>
        </div>
        <footer class="bg-white d-xl-flex justify-content-xl-center align-items-xl-end sticky-footer">
            <div class="container my-auto">
                <div class="text-center my-auto copyright"><span>Copyright © Auctum 2021</span></div>
            </div>
        </footer>
    </div>
    <a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a></div>
<div class="modal fade" role="dialog" tabindex="-1" id="modal-4">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header"><h4 class="modal-title">Won bids</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr class="text-center">
                            <th>Brand</th>
                            <th>Frame Type</th>
                            <th>Frame Height</th>
                            <th>Ending Date</th>
                            <th>My Bid</th>
                        </tr>
                        </thead>
                        <tbody class="text-center">
                        {#each bidsIWon as bike}
                            <tr in:fade>
                                <td>{bike.brand}</td>
                                <td>{bike.frameType}</td>
                                <td>{bike.frameHeightInCm}</td>
                                <td>{bike.endingDate}</td>
                                <td>{bike.highestBid}€</td>
                            </tr>
                            {:else }
                                {#if bidsIWon.length > 0}
                                    <span class="spinner-border mt-2" role="status"></span>
                                {:else }
                                    <p in:fade={{delay:600}}>No bikes to show!</p>
                                {/if}
                        {/each}
                        </tbody>
                    </table>
                </div>

            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
<script defer src="assets/js/script.min.js"></script>

</body>

<style>

</style>