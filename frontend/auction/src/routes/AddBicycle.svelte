<script>
    import tokenStore from '../stores/token';
    import { LightPaginationNav, paginate } from 'svelte-paginate';
    import router from 'page';
    import { fade, fly } from 'svelte/transition';
    import NavBar from "../components/NavBar.svelte";
    import TopBar from "../components/TopBar.svelte";
    import Footer from "../components/Footer.svelte";
    import ScrollToTopButton from "../components/ScrollToTopButton.svelte";
    import ModalHeading from "../components/ModalHeading.svelte";
    import ModalFooter from "../components/ModalFooter.svelte";
    import TableHeader from "../components/TableHeader.svelte";
    import WelcomeMessage from "../components/WelcomeMessage.svelte";
    import { toast } from "@zerodevx/svelte-toast";

    let targetURL = 'http://localhost:3000/bikes';
    let items = [];
    let postNewBrand,postNewFrameType,postNewFrameHeight,postNewDate = '';
    let bikeId,editBrand,editFrameType,editFrameHeight = '';

    //To convert the date to dd-mm-yyyy form and set date to today's date
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
            toast.push(e.message, {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            })
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
                    router.redirect('/home');
                    router.redirect('/add-bicycle');
                    toast.push('Success!', {
                        theme: {
                            '--toastBackground': '#48BB78',
                            '--toastBarBackground': '#2F855A'
                        }
                    })
                } else {
                    res.json().then((body) => {
                        toast.push(body.message, {
                            theme: {
                                '--toastBackground': '#F56565',
                                '--toastBarBackground': '#C53030'
                            }
                        })
                    });
                }
            })
            .catch(async (err) => {
                toast.push(err.message, {
                    theme: {
                        '--toastBackground': '#F56565',
                        '--toastBarBackground': '#C53030'
                    }
                })
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
                toast.push('Success!', {
                    theme: {
                        '--toastBackground': '#48BB78',
                        '--toastBarBackground': '#2F855A'
                    }
                })
            } else {
                res.json().then((body) => {
                    toast.push(body.message, {
                        theme: {
                            '--toastBackground': '#F56565',
                            '--toastBarBackground': '#C53030'
                        }
                    })
                });
            }
        }).catch(async (err) => {
            toast.push(err.message, {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            })
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
                    toast.push('Success!', {
                        theme: {
                            '--toastBackground': '#48BB78',
                            '--toastBarBackground': '#2F855A'
                        }
                    })
                } else {
                    res.json().then((body) => {
                        alert(body.message || "Internal error");
                    });
                }
            })
            .catch(async (err) => {
                toast.push(err.message, {
                    theme: {
                        '--toastBackground': '#F56565',
                        '--toastBarBackground': '#C53030'
                    }
                })
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

    /**
     * This will collapse the from modify button
     */

    function closeCollapse() {
        this.parentElement.parentElement.parentElement.parentElement.classList.remove('show');
    }

    getBikes();

</script>

<body id="page-top">
<div id="wrapper">
    <NavBar/>
    <div class="d-flex flex-column" id="content-wrapper">
        <div id="content">
            <TopBar/>
            <div class="container-fluid">
                <WelcomeMessage addBicycleMessage={true}/>
                <div class="row">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table">
                                <TableHeader/>
                                <tbody class="text-center">
                                {#each paginatedItems as bike (bike.id)}
                                    <tr in:fade out:fly={{x:100}}>
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
        <Footer/>
    </div>
    <ScrollToTopButton/>
</div>
<div class="modal fade" role="dialog" tabindex="-1" id="modal-3" aria-hidden="true" aria-labelledby="modal-3label">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <ModalHeading modalHeading={"Add Bicycle"}/>
            <div class="modal-body">
                <form>
                    <input bind:value={postNewBrand} class="form-control oneLine" type="text" style="margin-bottom: 8px;" placeholder="Enter the brand" required>
                    <input bind:value={postNewFrameType} class="form-control oneLine" type="text" style="margin-bottom: 8px;" placeholder="Enter the frame type" required>
                    <input bind:value={postNewFrameHeight} class="form-control oneLine" type="number" style="margin-bottom: 8px;" placeholder="Enter the frame height in cm" required>
                    <label class="form-label" for="date">Enter the ending date</label>
                    <input min={today} bind:value={postNewDate} class="form-control oneLine" id="date" type="date" name="date" required>
                </form>
            </div>
            <ModalFooter footerFunction={addBike}/>
        </div>
    </div>
</div>

<script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
<script defer src="assets/js/script.min.js"></script>

</body>

<style>

</style>