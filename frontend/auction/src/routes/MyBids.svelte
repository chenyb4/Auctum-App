<script>
    import tokenStore from "../stores/token";
    import { parseJwt } from "../js/parseJwt";
    import router from "page";
    import { LightPaginationNav,paginate } from "svelte-paginate";
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import NavBar from "../components/NavBar.svelte";
    import TopBar from "../components/TopBar.svelte";
    import Footer from "../components/Footer.svelte";
    import ScrollToTopButton from "../components/ScrollToTopButton.svelte";
    import ModalFooter from "../components/ModalFooter.svelte";
    import ModalHeading from "../components/ModalHeading.svelte";
    import WelcomeMessage from "../components/WelcomeMessage.svelte";
    import TableHeader from "../components/TableHeader.svelte";
    import { toast } from "@zerodevx/svelte-toast";

    let targetURLBids='http://localhost:3000/bids';
    let bidsIWon=[];
    let bids=[];

    //For pagination
    let currentPage = 1;
    let pageSize = 5;
    $: paginatedItems = paginate({ items:bids, pageSize, currentPage });

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
            toast.push(e.message, {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            });
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
                toast.push('Success!', {
                    theme: {
                        '--toastBackground': '#48BB78',
                        '--toastBarBackground': '#2F855A'
                    }
                })
                router.redirect('/home');
                router.redirect('/my-bids');
            } else {
                res.json().then(async (body) => {
                    toast.push(await body.message, {
                        theme: {
                            '--toastBackground': '#F56565',
                            '--toastBarBackground': '#C53030'
                        }
                    });
                });
            }
            }).catch(async (err) => {
            toast.push(await err.message, {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            });
            });
    }

    //get bids I won
    async function getBidsIWon() {
        try {
            const resp = await fetch('http://localhost:3000/bikes', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': 'Bearer ' + $tokenStore.token
                }
            });
            let allBikes = await resp.json();
            let bikesEnded=[];
            let today = new Date().toISOString().split("T")[0];
            for (const bike of allBikes) {
                if(bike.endingDate<=today){
                    bikesEnded.push(bike);
                    bikesEnded=bikesEnded;
                }
            }
            //now we have an array of bikes auctions ended.
            // find the user id who placed the highest bid for every bike and place this key into the bike objects
            let bikesEndedWithWinnerId=[];
            for (const bike of bikesEnded) {
                let winnerId=-1;
                let highestBid=0;
                for (let bid of bids) {
                    //if the bid is indeed for this bike, then do stuff to find the winner
                    if(bid.forBikeId==bike.id){
                        if(bid.price>highestBid){
                            //update the current winner id
                            winnerId=bid.placedByUserId;
                            //update the current highest bid price for comparison in the next loop
                            highestBid=bid.price;
                        }
                    }
                }

                bike.winnerId=winnerId;
                bike.highestBid=highestBid;
                bikesEndedWithWinnerId.push(bike);
                bikesEndedWithWinnerId=bikesEndedWithWinnerId;
            }



            //all bikes now has a winner id key
            for (let bike of bikesEndedWithWinnerId) {
                if(bike.winnerId==parseJwt($tokenStore.token).id){
                    bidsIWon.push(bike);
                    bidsIWon=bidsIWon;
                }
            }

        } catch (e) {
            toast.push(e.message, {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            });
        }
    }

    getBidsIWon();

</script>

<body id="page-top">
<div id="wrapper">
    <NavBar/>
    <div class="d-flex flex-column" id="content-wrapper">
        <div id="content">
            <TopBar/>
            <div class="container-fluid">
                <WelcomeMessage myBidsMessage={true}/>
                <div class="row">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table">
                                <TableHeader myBids={true}/>
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
        <Footer/>
    </div>
    <ScrollToTopButton/>
</div>
<div class="modal fade" role="dialog" tabindex="-1" id="modal-4">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <ModalHeading modalHeading={"Won Bids"}/>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table">
                        <TableHeader bidOnBike={true}/>
                        <tbody class="text-center">
                        {#each bidsIWon as bike (bike.id)}
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
            <ModalFooter/>
        </div>
    </div>
</div>

<script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
<script defer src="assets/js/script.min.js"></script>

</body>

<style>

</style>