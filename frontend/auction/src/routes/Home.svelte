<script>
    import tokenStore from "../stores/token";
    import router from "page";

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

    let targetURLBikes = 'http://localhost:3000/bikes';
    let targetURLBids='http://localhost:3000/bids';
    let targetURLUsers='http://localhost:3000/users';

    let items = [];
    let itemsToDisplay=[];
    let today = new Date().toISOString().split("T")[0];

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
                let highestBid=0;
                highestBid=await getHighestBid(tempItem.id);
                tempItem.highestBid=highestBid;
                items.push(tempItem);
                items=items;
                itemsToDisplay.push(tempItem);
                itemsToDisplay=itemsToDisplay;
            }
        }catch (e){
            console.error(e);
        }
        getDistinctForDropDownItems();
    }


    //find the highest bid for this bike
    // let highestBid=0;
    async function getHighestBid(bikeId){
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
                    }
                }
            }
            return highestBid;
        }catch (e){
            console.error(e);
        }
    }


    //no filter used for now
    getBikes('','','');

    let bids=[];
    /**
     * get all bids for a certain bike on bike id
     * @param bikeId
     * @returns {Promise<void>}
     */

    async function getAllBidsforOneBike(bikeId){
        bids=[];
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
            console.error(e);
        }
    }

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

    //pass the bike id to modal 2
    let bikeIdForPlacingABid=0;
    function setBikeIdForModal2(bikeId){
        bikeIdForPlacingABid=bikeId;
    }

    let bidPriceToPlace;

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
                    console.log("Success!");
                } else {
                    res.json().then((body) => {
                        console.error(body.message || "Internal error");
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

</script>

<body id="page-top">
<div id="wrapper">
    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div class="container-fluid d-flex flex-column p-0">
            <a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="/home"
                style="padding-top: 36px;">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="sidebar-brand-text mx-3">
                    <span style="font-size: 25px;">Auctum
                        <br>
                    </span>
                    <span
                        class="text-capitalize" style="font-size: 12px;font-family: 'Bad Script', serif;">Get your dream
                        <br>&nbsp;Bike today!
                    </span>
                </div>
            </a>
            <ul class="navbar-nav text-light" id="accordionSidebar" style="margin-top: 16px;">
                <li class="nav-item">
                    <a class="nav-link active" href="/home">
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
                {#if ($tokenStore.token != '')}
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
                    <button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button">
                        <i class="fas fa-bars"></i>
                    </button>
                    <form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div class="input-group">
                            <input class="bg-light form-control border-0 small" type="text"
                                   placeholder="Search for ..." name="searchbar" autocomplete="on">
                            <button class="btn btn-primary py-0" type="button">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                    <ul class="navbar-nav flex-nowrap ms-auto">
                        <li class="nav-item">
                            <a class="nav-link oneLine" data-bs-toggle="tooltip" data-bss-tooltip=""
                               data-bs-placement="bottom" href="#" title="Highest bid placed: 0$">
                                {#if ($tokenStore.token != '')}
                                    {parseJwt($tokenStore.token).email}
                                {/if}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="container-fluid">
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
                                <thead>
                                <tr class="text-center">
                                    <th>Brand</th>
                                    <th>Frame Type</th>
                                    <th>Frame Height</th>
                                    <th>Highest bid</th>
                                    <th>Ending date</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody class="text-center">

                                {#each items as item}
                                    {#if item.endingDate > today}
                                        <tr>
                                            <td>{item.brand}</td>
                                            <td>{item.frameType}</td>
                                            <td>{item.frameHeightInCm}</td>
                                            <td class="justify-content-xl-center align-items-xl-center">{item.highestBid}€</td>
                                            <td>{item.endingDate}</td>
                                            <td>
                                                <button on:click={getAllBidsforOneBike(item.id)} class="btn btn-primary shadow-sm" type="button"
                                                        data-bs-target="#modal-1" data-bs-toggle="modal">Display bids
                                                </button>
                                            </td>
                                            <td>
                                                <button on:click={setBikeIdForModal2(item.id)} class="btn btn-primary shadow-sm" type="button"
                                                        data-bs-target="#modal-2" data-bs-toggle="modal">Place bid
                                                </button>
                                            </td>
                                        </tr>
                                    {:else }
                                        <tr class="notAvailable">
                                            <td>{item.brand}</td>
                                            <td>{item.frameType}</td>
                                            <td>{item.frameHeightInCm}</td>
                                            <td class="justify-content-xl-center align-items-xl-center">{item.highestBid}€</td>
                                            <td style="color: orangered">{item.endingDate}</td>
                                            <td>
                                                <button on:click={getAllBidsforOneBike(item.id)} class="btn btn-primary shadow-sm" type="button"
                                                        data-bs-target="#modal-1" data-bs-toggle="modal">Display bids
                                                </button>
                                            </td>
                                            <td>
                                                <button on:click={setBikeIdForModal2(item.id)} class="btn btn-primary shadow-sm disabled" type="button"
                                                        data-bs-target="#modal-2" data-bs-toggle="modal">Place bid
                                                </button>
                                            </td>
                                        </tr>
                                    {/if}
                                {/each}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="bg-white d-xl-flex justify-content-xl-center align-items-xl-end sticky-footer">
            <div class="container my-auto">
                <div class="text-center my-auto copyright"><span>Copyright © Auctum 2021</span></div>
            </div>
        </footer>
    </div>
    <a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a></div>
<div class="modal fade" role="dialog" tabindex="-1" id="modal-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header"><h4 class="modal-title">All the bids</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Bid Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each bids as bid}
                            <tr>
                                 <td>{bid.placedByUserId}</td>
                                 <td>{bid.price}</td>
                            </tr>
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
<div class="modal fade" role="dialog" tabindex="-1" id="modal-2">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header"><h4 class="modal-title">Place a bid</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form><input bind:value={bidPriceToPlace} class="form-control" type="number" name="price" placeholder="Enter the price " required="true">
                </form>
            </div>
            <div class="modal-footer">
                <button on:click={placingBid} class="btn btn-primary" type="submit" data-bs-dismiss="modal">Save</button>
            </div>
        </div>
    </div>
</div>
<script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
<script defer src="assets/js/script.min.js"></script>
</body>

<style>
    .notAvailable {
        cursor: not-allowed;
    }
</style>