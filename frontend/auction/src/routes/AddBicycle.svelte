<script>


</script>

<head>
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bad+Script&amp;display=swap">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body id="page-top">
<div id="wrapper">
    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div class="container-fluid d-flex flex-column p-0"><a
                class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="/home"
                style="padding-top: 36px;">
            <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-laugh-wink"></i></div>
            <div class="sidebar-brand-text mx-3"><span style="font-size: 25px;">Auctum<br></span><span
                    class="text-capitalize" style="font-size: 12px;font-family: 'Bad Script', serif;">Get your dream<br>&nbsp;Bike today!</span>
            </div>
        </a>
            <ul class="navbar-nav text-light" id="accordionSidebar" style="margin-top: 16px;">
                <li class="nav-item"><a class="nav-link" href="/home"><i class="fas fa-tachometer-alt"></i><span>&nbsp;Auctions</span></a>
                </li>
                <li class="nav-item"><a class="nav-link active" href="/add-bicycle"><i
                        class="far fa-user-circle"></i><span>Add bicycle</span></a></li>
                <li class="nav-item"><a class="nav-link" href="/login"><i class="far fa-user-circle"></i><span>Log out</span></a>
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
                            <button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button>
                        </div>
                    </form>
                    <ul class="navbar-nav flex-nowrap ms-auto">
                        <li class="nav-item"><a class="nav-link" href="#">Email here</a></li>
                    </ul>
                </div>
            </nav>
            <div class="container-fluid">
                <div><h3 class="text-dark">Welcome admin</h3><h4 class="text-dark" style="margin-bottom: 13px;">Here you
                    can add, remove or modify bikes</h4></div>
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
                                <tr>
                                    <td>Gazelle</td>
                                    <td>Diamond</td>
                                    <td>53</td>
                                    <td>300$</td>
                                    <td>
                                        <button class="btn btn-danger" type="button">Delete</button>
                                    </td>
                                    <td>
                                        <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#form">Modify
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row collapse" id="form">
                    <div class="col">
                        <form><input class="form-control oneLine" type="text" name="brand"
                                     placeholder="Enter the modified brand" style="width: 60%;margin-bottom: 10px;"
                                     required=""><input class="form-control oneLine" type="text"
                                                        placeholder="Enter your frame type" name="frame-type"
                                                        style="width: 60%;margin-bottom: 10px;" required=""><input
                                class="form-control oneLine" type="text" placeholder="Enter frame height" name="frame-height"
                                style="width: 60%;margin-bottom: 10px;" required="">
                            <button class="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <footer class="bg-white d-xl-flex justify-content-xl-center align-items-xl-end sticky-footer">
            <div class="container my-auto">
                <div class="text-center my-auto copyright"><span>Copyright © Brand 2021</span></div>
            </div>
        </footer>
    </div>
    <a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a></div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/script.min.js"></script>
</body>

<style>

    .oneLine {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>