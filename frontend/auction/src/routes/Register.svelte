<script>
    import router from 'page';
    import Image from "../components/Image.svelte";
    import { toast } from "@zerodevx/svelte-toast";

    let targetURL = 'http://localhost:3000/users';
    let name,email,password,repeatedPassword = '';
    let validEmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //validation pattern to check email
    let validPasswordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; //validation pattern to check password

    async function register(){
        if (password && repeatedPassword && email && name){
            if(password == repeatedPassword){
                if (email.match(validEmailFormat) && password.match(validPasswordFormat)){
                    let userBody=[];
                    userBody.name=name;
                    userBody.email=email;
                    userBody.password=password;

                    console.log("name:"+name);
                    console.log("email:"+email);
                    console.log("pwd:"+repeatedPassword);
                    const response=await fetch(targetURL,{
                        method:'POST',
                        headers:{
                            'Content-type': 'application/json'
                        },
                        body:JSON.stringify({
                            name:name,
                            email:email,
                            passwordHashValue:password
                        })
                    }).then(async (res)=>{
                        if(res.ok){
                            toast.push('Success! Now you can login', {
                                theme: {
                                    '--toastBackground': '#48BB78',
                                    '--toastBarBackground': '#2F855A'
                                }
                            })
                            router.redirect('/login');
                            return response.json();
                        }else{
                            toast.push(await res.text());
                        }
                    })
                } else {
                    toast.push('Invalid email or password format. Please check...', {
                        theme: {
                            '--toastBackground': '#F56565',
                            '--toastBarBackground': '#C53030'
                        }
                    });
                }
            } else {
                toast.push('The passwords you entered are not the same. Please check...', {
                    theme: {
                        '--toastBackground': '#F56565',
                        '--toastBarBackground': '#C53030'
                    }
                });
            }
        } else {
            toast.push('Some inputs are missing', {
                theme: {
                    '--toastBackground': '#d28c25',
                    '--toastBarBackground': '#f69a06'
                }
            });
        }
    }

</script>

<body class="bg-gradient-primary register">
<div class="container">
    <div class="card shadow-lg o-hidden border-0 my-5">
        <div class="card-body p-0">
            <div class="row">
                <Image pageType="register"/>
                <div class="col-lg-7">
                    <div class="p-5">
                        <div class="text-center">
                            <h4 class="text-dark mb-4">Create an Account!</h4>
                        </div>
                        <form class="user">
                            <div class="row mb-3">
                                <div class="col mb-3 mb-sm-0">
                                    <input bind:value={name} class="form-control form-control-user" type="text"
                                           id="exampleFirstName" placeholder="Enter your name"
                                           name="name" required minlength="3">
                                </div>
                            </div>
                            <div class="mb-3">
                                <input bind:value={email} class="form-control form-control-user" type="email"
                                       id="exampleInputEmail" aria-describedby="emailHelp"
                                       placeholder="Enter your Email Address" name="email" required
                                       inputmode="email">
                                {#if (email)}
                                    {#if !email.match(validEmailFormat) && email != 0}
                                        <p class="mt-2" style="color:#FF0000;font-size:medium">You have entered an invalid email address!</p>
                                    {/if}
                                {/if}
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input bind:value={password} class="form-control form-control-user"
                                           type="password" id="examplePasswordInput"
                                           placeholder="Enter your Password"
                                           name="password" required>
                                    {#if (password)}
                                        {#if !password.match(validPasswordFormat) && password != 0}
                                            <p style="color:#FF0000;font-size:medium">Password must contain at least 6 characters,
                                                one number , one uppercase and lowercase
                                                letter!</p>
                                        {/if}
                                    {/if}
                                </div>
                                <div class="col-sm-6">
                                    <input bind:value={repeatedPassword} class="form-control form-control-user" type="password"
                                           id="exampleRepeatPasswordInput"
                                           placeholder="Repeat your Password" name="password_repeat" required>
                                    {#if (repeatedPassword)}
                                        {#if !password.match(repeatedPassword) && repeatedPassword != 0}
                                            <p style="color:#FF0000;font-size:medium">Passwords don't match!</p>
                                        {/if}
                                    {/if}
                                </div>
                            </div>
                            <button disabled={!email || !password || !repeatedPassword || !name || (!email.match(validEmailFormat) || !password.match(validPasswordFormat))} on:click|preventDefault={register} class="btn btn-primary d-block btn-user w-100" type="submit">Register Account
                            </button>
                        </form>
                        <div class="text-center" style="margin-top: 5px;">
                            <a class="small" href="/login">Already have an account? Login!</a>
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
    .register {
        overflow: auto;
        height: 100vh;
    }
</style>