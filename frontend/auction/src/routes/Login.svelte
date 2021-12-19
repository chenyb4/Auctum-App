<script>
    import tokenStore from '../stores/token';
    import { parseJwt } from "../js/parseJwt";
    import router from 'page';
    import Image from "../components/Image.svelte";
    import { toast } from '@zerodevx/svelte-toast'

    let email,password = '';
    let targetURL = 'http://localhost:3000/credentials';
    let user = [];
    let validEmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //validation pattern to check email

    /**
     * To login into the web app using POST request,
     * if successfully it will redirect to either home or add-bicycle page
     * @returns {Promise<void>} token
     */

    async function login () {
        await fetch(targetURL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
            }).then(async (res) => {
            if (res.ok) {
                $tokenStore = await res.json();
                toast.push('Success!', {
                    theme: {
                        '--toastBackground': '#48BB78',
                        '--toastBarBackground': '#2F855A'
                    }
                })
                if ((parseJwt($tokenStore.token).role.includes('admin'))){
                    router.redirect('/add-bicycle');
                } else {
                    router.redirect('/home');
                }
               // document.cookie='token='+$tokenStore.token;
            } else {
                toast.push(await res.text(), {
                    theme: {
                        '--toastBackground': '#F56565',
                        '--toastBarBackground': '#C53030'
                    }
                })
            }
        }).catch(async (err) => {
            toast.push(await err.message, {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
                }
            })
        })
    }
</script>

<body class="bg-gradient-primary login">
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-9 col-lg-12 col-xl-10">
            <div class="card shadow-lg o-hidden border-0 my-5">
                <div class="card-body p-0">
                    <div class="row">
                        <Image pageType='login'/>
                        <div class="col-lg-6">
                            <div class="p-5">
                                <div class="text-center">
                                    <h4 class="text-dark mb-4">Welcome Back!&nbsp;</h4>
                                </div>
                                <form class="user">
                                    <div class="mb-3">
                                        <input bind:value={email} class="form-control form-control-user" type="email"
                                               id="exampleInputEmail" aria-describedby="emailHelp"
                                               placeholder="Enter Email Address" name="email"
                                               autocomplete="on" inputmode="email" required >
                                        {#if (email)}
                                            {#if !email.match(validEmailFormat) && email != 0}
                                                <p class="mt-2" style="color:#FF0000;font-size:medium">You have entered an invalid email address!</p>
                                            {/if}
                                        {/if}
                                    </div>
                                    <div class="mb-3">
                                        <input bind:value={password} class="form-control form-control-user" type="password"
                                               id="exampleInputPassword" placeholder="Password"
                                               name="password" required>
                                    </div>
                                    <button disabled={!email || !password || (!email.match(validEmailFormat))} class="btn btn-primary d-block btn-user w-100" type="submit" on:click|preventDefault={login}>Login</button>
                                </form>
                                <div class="text-center" style="margin-top: 5px;">
                                    <a class="small" href="/register">Create an Account!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
<script defer src="assets/js/script.min.js"></script>

</body>

<style>
    .login {
        overflow: auto;
        height: 100vh;
    }
</style>