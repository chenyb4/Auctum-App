<script>
    import tokenStore from "../stores/token";
    import router from "page";
    import { parseJwt } from "../js/parseJwt";
    import { LightPaginationNav, paginate } from 'svelte-paginate';
    import { fade, fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import NavBar from "../components/NavBar.svelte";
    import TopBar from "../components/TopBar.svelte";
    import Footer from "../components/Footer.svelte";
    import ScrollToTopButton from "../components/ScrollToTopButton.svelte";
    import ModalFooter from "../components/ModalFooter.svelte";
    import ModalHeading from "../components/ModalHeading.svelte";
    import TableHeader from "../components/TableHeader.svelte";
    import WelcomeMessage from "../components/WelcomeMessage.svelte";
    import { toast } from "@zerodevx/svelte-toast";

    //For pagination
    let currentPage = 1;
    let pageSize = 7;
    $: paginatedItems = paginate({ items, pageSize, currentPage });

    //document.cookie='token='+$tokenStore.token;
    let selectedBrand="hh";
    let selectedFrameType="hh";
    let selectedFrameHeight="hh";

    let brand='';
    let frameType='';
    let frameHeight='';

    let distinctBrands=[];
    let distinctFrameTypes=[];
    let distinctFrameHeights=[];


    let targetURLBikes = 'http://localhost:3000/bikes';
    let targetURLBids='http://localhost:3000/bids';
    let targetURLUsers='http://localhost:3000/users';

    let items = [];
    let itemsToDisplay=[];
    let today = new Date().toISOString().split("T")[0];

    let highBid=0;
    let highBid2 = 0;

    let bids=[];
    let bikeIdForPlacingABid=0;

    let tempObject = {};
    let bidPriceToPlace;


    function getDistinctForDropDownItems(){
        for (let item of items) {
            if(!distinctBrands.includes(item.brand)){
                distinctBrands.push(item.brand);
                distinctBrands=distinctBrands;
            }
        }
        for (let item of items) {
            if(!distinctFrameTypes.includes(item.frameType)){
                distinctFrameTypes.push(item.frameType);
                distinctFrameTypes=distinctFrameTypes;
            }
        }
        for (let item of items) {
            if(!distinctFrameHeights.includes(item.frameHeightInCm)){
                distinctFrameHeights.push(item.frameHeightInCm);
                distinctFrameHeights=distinctFrameHeights;
            }
        }
    }

    //now each item in the items has 6 keys. the one extra key is highestBid
    async function getBikes (brand,frameType,frameHeightInCm) {
        items=[];
        let targetURLBikesUseQuery=targetURLBikes;
        if(brand!=''){
            targetURLBikesUseQuery+=('?brand='+brand);
        }
        if(frameType!=''){
            if(brand!=''){
                targetURLBikesUseQuery+=('&frameType='+frameType);
            }else{
                targetURLBikesUseQuery+=('?frameType='+frameType);
            }

        }
        if(frameHeightInCm!=''){
            if((brand!='')||(frameType!='')){
                targetURLBikesUseQuery+=('&frameHeightInCm='+frameHeightInCm);
            }else{
                targetURLBikesUseQuery+=('?frameHeightInCm='+frameHeightInCm);
            }

        }
        try {
            const resp = await fetch(targetURLBikesUseQuery, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': 'Bearer '+$tokenStore.token
                }
            });
            let tempItems = await resp.json();

            //here find out the highest bid of a bike and add the key value pair to the object.
            //then push this object into array items
            for (let tempItem of tempItems) {
                highBid2=0;
                console.log(highBid2);
                highBid2=await getHighestBid(tempItem.id);
                tempItem.highestBid=highBid2;
                items.push(tempItem);
                items=items;
                itemsToDisplay.push(tempItem);
                itemsToDisplay=itemsToDisplay;
            }
        }catch (e){
            toast.push(e.message, {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            })
        }
        getDistinctForDropDownItems();
    }


    //find the highest bid for this bike
    async function getHighestBid(bikeId){
        highBid = 0;
        try {
            const resp = await fetch(targetURLBids, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': 'Bearer '+$tokenStore.token
                }
            });
            let bidsJson = await resp.json();

            //console.log(bidsJson);
            let highestBid=0;
            for (const item of bidsJson) {
                if(item.forBikeId==bikeId){
                    if(item.price>highestBid){
                        highestBid=item.price;
                        highBid = item.price;
                        console.log(highestBid);
                        console.log(highBid)
                    }
                }
            }
            return highestBid;
        }catch (e){
            toast.push(await e.message, {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            })
        }
    }


    /**
     * get all bids for a certain bike on bike id
     * @param bikeId
     * @returns {Promise<void>}
     */
    export async function getAllBidsForOneBike(bikeId){
        bids=[];
        console.log(bikeId + " hello")
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
                if(bid.forBikeId==bikeId){
                    bids.push(bid);
                    bids=bids;
                }
            }
        }catch (e){
            toast.push(await e.message, {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            })
        }
    }

    function temp (bikeId, highestBid) {
        tempObject.bikeId = bikeId;
        tempObject.highestBid = highestBid;
    }

    //pass the bike id to modal 2
    export function setBikeIdForModal2(bikeId,highestBid){
        console.log('Hello 2')
        getAllBidsForOneBike(bikeId);
        temp(bikeId,highestBid);
        bikeIdForPlacingABid=bikeId;
        return bikeId;
    }


    async function placingBid(){
        await fetch(targetURLBids, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'Bearer '+$tokenStore.token
            },
            body: JSON.stringify({
                price:bidPriceToPlace,
                placedByUserId:parseJwt($tokenStore.token).id,
                forBikeId:bikeIdForPlacingABid
            }),
        })
            .then(async (res) => {
                if (res.ok) {
                    router.redirect('/add-bicycle');
                    router.redirect('/home');
                    toast.push('Success!', {
                        theme: {
                            '--toastBackground': '#48BB78',
                            '--toastBarBackground': '#2F855A'
                        }
                    })
                } else {
                    res.json().then( async (body) => {
                        toast.push(await body.message)
                    });
                }
            })
            .catch(async (err) => {
                toast.push(await err.message, {
                    theme: {
                        '--toastBackground': '#F56565',
                        '--toastBarBackground': '#C53030'
                    }
                })
            });
    }

    //no filter used for now
    getBikes('','','');

</script>

<body id="page-top">
<div id="wrapper">
    <NavBar/>
    <div class="d-flex flex-column" id="content-wrapper">
        <div id="content">
            <TopBar/>
            <div class="container-fluid mb-3">
               <WelcomeMessage homeMessage={true}/>
                <div class="row">
                    <div class="col text-center mt-2">
                        Brand:
                        <select class="btn btn-primary text-capitalize shadow-sm "  bind:value={selectedBrand} on:change="{() => {brand = selectedBrand}}" on:change={getBikes(brand,frameType,frameHeight)}>
                            <option value="">
                                (no preference)
                            </option>
                            {#each distinctBrands as item}
                                <option value={item}>
                                    {item}
                                </option>
                            {/each}
                        </select>
                    </div>
                    <div class="col text-center type mt-2">
                        Frame type:
                        <select class="btn btn-primary text-capitalize shadow-sm" bind:value={selectedFrameType}
                                on:change="{() => {frameType = selectedFrameType}}" on:change={getBikes(brand,frameType,frameHeight)}
                        >
                            <option value="">
                                (no preference)
                            </option>
                            {#each distinctFrameTypes as item}
                                <option value={item}>
                                    {item}
                                </option>
                            {/each}
                        </select>
                    </div>
                    <div class="col text-center refresh mt-2">
                        Frame height:
                        <select class="btn btn-primary text-capitalize shadow-sm" bind:value={selectedFrameHeight}
                                on:change="{() => {frameHeight = selectedFrameHeight; console.log(frameHeight)}}"
                                on:change={getBikes(brand,frameType,frameHeight)}>
                            <option value="">
                                (no preference)
                            </option>
                            {#each distinctFrameHeights as item}
                                <option value={item}>
                                    {item}
                                </option>
                            {/each}
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table">
                                <TableHeader showIdAndHighestBid={true}/>
                                <tbody class="text-center">
                                    {#each paginatedItems as item}
                                        <tr class:notAvailable={item.endingDate <= today}>
                                            <td>{item.id}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.frameType}</td>
                                            <td>{item.frameHeightInCm}</td>
                                            <td class="justify-content-xl-center align-items-xl-center">{item.highestBid}€</td>
                                            <td>{item.endingDate}</td>
                                            <td>
                                                <button on:click={getAllBidsForOneBike(item.id)}
                                                        class="btn btn-primary shadow-sm" type="button"
                                                        data-bs-target="#modal-1" data-bs-toggle="modal">Display bids
                                                </button>
                                            </td>
                                            <td>
                                                <button on:click={setBikeIdForModal2(item.id,item.highestBid)}
                                                        class="btn btn-primary shadow-sm" type="button"
                                                        data-bs-target="#modal-2" data-bs-toggle="modal"
                                                        disabled="{item.endingDate <= today}">Place bid
                                                </button>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
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
        <Footer/>
    </div>
    <ScrollToTopButton/>
</div>
<div class="modal fade" role="dialog" tabindex="-1" id="modal-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <ModalHeading modalHeading={"All the placed bids"}/>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Placed By User ID</th>
                            <th>Bid Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each bids as bid}
                            <tr>
                                 <td>{bid.placedByUserId}</td>
                                 <td>{bid.price}€</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalFooter/>
        </div>
    </div>
</div>
<div class="modal fade" role="dialog" tabindex="-1" id="modal-2">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <ModalHeading modalHeading={"Place a bid"}/>
            <div class="modal-body">
                <form>
                    {#if bidPriceToPlace}
                        {#if tempObject}
                            {#if bidPriceToPlace <= tempObject.highestBid}
                                <p class="notAvailable">Number should be higher than {tempObject.highestBid}€</p>
                            {/if}
                        {/if}
                    {/if}
                    <input bind:value={bidPriceToPlace} class="form-control" type="number" name="price" placeholder="Enter the price " required="true">
                </form>
            </div>
            <ModalFooter footerFunction="{placingBid}"/>
        </div>
    </div>
</div>
<script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
<script defer src="assets/js/script.min.js"></script>
</body>

<style>
    .notAvailable {
        color: orangered;
    }
</style>