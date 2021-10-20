<script>
    import tokenStore from "../stores/token";
    import router from "page";

    let targetURLBikes = 'http://localhost:3000/bikes';
    let targetURLBids='http://localhost:3000/bids';
    let targetURLUsers='http://localhost:3000/users';

    let items = [];

    //now each item in the items has 6 keys. the one extra key is highestBid
    async function getBikes () {
        items=[];
        try {
            const resp = await fetch(targetURLBikes, {
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
            }

            //remove duplicates
        }catch (e){
            console.error(e);
        }
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


    getBikes();




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
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    //pass the bike id to modal 2
    let bikeIdForPlacingABid=0;
    function setBikeIdForModal2(bikeId){
        bikeIdForPlacingABid=bikeId;
    }

    let bidPriceToPlace;

    async function placingBid(){

        console.log("bid price"+bidPriceToPlace);
        console.log("user id:"+parseJwt($tokenStore.token).id);
        console.log("bike id :"+bikeIdForPlacingABid);
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

<head>
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bad+Script&amp;display=swap">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
</head>
<body id="page-top">
<div id="wrapper">
    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div class="container-fluid d-flex flex-column p-0"><a
                class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="/home"
                style="padding-top: 36px;">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
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
                    <a class="nav-link" href="/add-bicycle">
                        <i class="far fa-user-circle"></i>
                        <span>Add bicycle</span>
                    </a>
                </li>
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
                            <a class="nav-link" data-bs-toggle="tooltip" data-bss-tooltip=""
                               data-bs-placement="bottom" href="#" title="Highest bid placed: 0$">Name
                            here</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <h3 class="text-dark d-table mb-0">Welcome user</h3>
                    </div>
                    <div class="col-12" style="margin-bottom: 5px;">
                        <h4>Here is a list of bikes that are up for
                        auction</h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col text-start text-sm-end">
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle text-capitalize shadow-sm"
                                    aria-expanded="false" data-bs-toggle="dropdown" type="button">Brand
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Gazelle</a><a
                                    class="dropdown-item" href="#">Batavus</a><a class="dropdown-item"
                                                                                 href="#">Sparta</a><a
                                    class="dropdown-item" href="#">Giant</a><a class="dropdown-item"
                                                                               href="#">Other...</a></div>
                        </div>
                    </div>
                    <div class="col text-start text-sm-center type">
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle text-capitalize shadow-sm"
                                    aria-expanded="false" data-bs-toggle="dropdown" type="button">Frame type
                            </button>
                            <div class="dropdown-menu"><a class="dropdown-item" href="#">Diamond</a><a
                                    class="dropdown-item" href="#">Step-through</a><a class="dropdown-item" href="#">Other...</a>
                            </div>
                        </div>
                    </div>
                    <div class="col text-start refresh">
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle text-capitalize shadow-sm"
                                    aria-expanded="false" data-bs-toggle="dropdown" type="button">Frame height
                            </button>
                            <div class="dropdown-menu"><a class="dropdown-item" href="#">53cm</a><a
                                    class="dropdown-item" href="#">50cm</a><a class="dropdown-item" href="#">57cm</a><a
                                    class="dropdown-item" href="#">49cm</a><a class="dropdown-item" href="#">48cm</a><a
                                    class="dropdown-item" href="#">54cm</a><a class="dropdown-item"
                                                                              href="#">Other...</a></div>
                        </div>
                    </div>
                    <div class="col text-start text-sm-center text-md-start refresh1">
                        <button class="btn btn-primary shadow-sm" data-bs-toggle="tooltip" data-bss-tooltip=""
                                data-bs-placement="right" type="button"
                                title="After your finished filtering press this button"><i class="fa fa-refresh"></i>
                        </button>
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
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody class="text-center">

                                {#each items as item}
                                    <tr>
                                        <td>{item.brand}</td>
                                        <td>{item.frameType}</td>
                                        <td>{item.frameHeightInCm}</td>
                                        <td class="justify-content-xl-center align-items-xl-center">{item.highestBid}</td>
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
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/script.min.js"></script>
</body>

<style>

    @media (max-width: 543px) {
        .refresh {
            margin-top: .5rem
        }
    }

    @media (max-width: 607px) {
        .refresh1 {
            margin-top: .5rem
        }
    }

    @media (max-width: 382px) {
        .type {
            margin-top: .5rem
        }
    }
</style>